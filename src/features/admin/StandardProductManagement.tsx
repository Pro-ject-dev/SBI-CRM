import { Box, Button, Container } from "@mui/material";
import {
  useDeleteStandardMutation,
  useGetStandardByFilterQuery,
  useLazyGetStandardByFilterQuery,
  useLazyGetStandardQuery,
  useUpdateProductCostMutation,
} from "../../app/api/standardProductApi";
import { useEffect, useRef, useState } from "react";
import {
  DeleteSweepOutlined as Delete,
  DriveFileRenameOutline as Edit,
} from "@mui/icons-material";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { addToast } from "../../app/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {
  filterSlice,
  paginationSlice,
} from "../../app/slices/standardProductManagementSlice";
import OptionModal from "../../components/UI/OptionModal";
import { SearchBox } from "../../components/UI/SearchBox";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { useLazyGetProductBySearchQuery } from "../../app/api/combosMappingApi";
import type { OptionProps } from "../../types/selectBox";
import FilterModal from "./common/FilterModal";
import ExportModal from "./common/ExportModal";

const StandardProductManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const standardSelector = useSelector((state: RootState) => state.standard);
  const [selectedRows, setSelectedRows] = useState<Array<number>>([]);
  const headers = {
    sno: "S. No",
    productName: "Product Name",
    ratePerQuantity: "Price",
    grade: "Grade",
    length: "Length",
    width: "Width",
    thickness: "Thickness",
    remark: "Remark",
    minCost: "Minimum Cost",
    maxCost: "Maximum Cost",
  };
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [filterAnchor, setFilterAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  const [productSearchQuery, setProductSearchQuery] = useState<string | null>(
    ""
  );
  const [productOptions, setProductOptions] = useState<Option[]>([]);
  const [filterData, setFilterData] = useState<FilterProductData>({
    startDate: { key: "startDate", label: "From Date", value: "", error: "" },
    endDate: { key: "endDate", label: "To Date", value: "", error: "" },
    grade: { key: "grade", label: "Grade", value: "", error: "" },
    product: { key: "product", label: "Product Name", value: "", error: "" },
  });
  const [filters, setFilters] = useState({
    startDate: { key: "startDate", label: "From Date", value: "", error: "" },
    endDate: { key: "endDate", label: "To Date", value: "", error: "" },
    grade: { key: "grade", label: "Grade", value: "", error: "" },
  });

  const [exportAnchor, setExportAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  const exportDropDownData = [
    { label: "Listed Products", value: "1" },
    { label: "Selected Products", value: "2" },
    { label: "All Products", value: "3" },
  ];
  const [fileData, setFileData] = useState<StandardFileDataDto[] | []>([]);
  const [exportDropDownValue, setExportDropDownValue] = useState<string>("1");
  const [exportDisable, setExportDisable] = useState<boolean>(false);
  const modalInput = {
    price: [{ key: "price", label: "Product Price", type: "number" }],
  };
  const [modalData, setModalData] = useState<UpdateCostModalData>({
    price: { open: false, value: "", error: "", submit: false },
  });

  const [
    getStandardProducts,
    { isLoading },
    // isError,
  ] = useLazyGetStandardByFilterQuery();

  const [getAllStandardProducts] = useLazyGetStandardQuery();

  const {
    data,
    // isError,
  } = useGetStandardByFilterQuery({
    isStandard: "1",
    page: standardSelector.pagination.page,
    size: standardSelector.pagination.pageSize,
    productName: standardSelector.filterData.productName,
    startDate: standardSelector.filterData.startDate,
    endDate: standardSelector.filterData.endDate,
    grade: standardSelector.filterData.grade,
  });

  const [
    deleteStandard,
    // { isLoading: deleteLoading }
  ] = useDeleteStandardMutation();

  const [updateProductCost, { isLoading: productCostLoading }] =
    useUpdateProductCostMutation();

  const [
    getProductBySearch,
    // { isLoading: productBySearchLoading }
  ] = useLazyGetProductBySearchQuery();

  const [productData, setProductData] = useState<
    StandardCustomizedResponse[] | []
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStandardProducts({
          isStandard: "1",
          page: standardSelector.pagination.page,
          size: standardSelector.pagination.pageSize,
          productName: standardSelector.filterData.productName,
          startDate: standardSelector.filterData.startDate,
          endDate: standardSelector.filterData.endDate,
          grade: standardSelector.filterData.grade,
        });
        setProductData(response?.data.data);

        setFileData(
          response?.data.data.map((obj: Record<string, any>, index: number) => {
            const filtered: Record<string, any> = { sno: String(index + 1) };
            Object.keys(headers).forEach((key) => {
              if (key !== "sno") {
                filtered[key] = obj[key];
              }
            });
            return filtered;
          })
        );
      } catch (error) {
        console.error("Error fetching product data");
      }
    };
    fetchData();
  }, [standardSelector, data]);

  const handleDeleteRow = async (ids: number[]) => {
    try {
      if (ids) {
        const deleteData = await deleteStandard({ ids });
        if (deleteData.error) {
          dispatch(
            addToast({ message: "Failed to Deleting Product!", type: "error" })
          );
        } else {
          dispatch(
            addToast({
              message: "Product Deleted Successfully",
              type: "success",
            })
          );
        }
        return deleteData;
      }
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to Deleting Product!",
          type: "error",
        })
      );
    }
  };

  const handleEditRow = (id: string) => {
    navigate(`/admin/master-form?tab=standard&id=${id}`);
  };

  const handlePagination = (params: any) => {
    const { page, pageSize } = params;
    dispatch(paginationSlice({ page, pageSize }));
  };

  const handleModalChange = (key: string, value: string) => {
    if (Number(value) > 100 || Number(value) < -100) {
      return;
    }
    const val = Number(value) === 0 ? "" : value;
    setModalData((prev) => {
      const typedKey = key as keyof typeof prev;

      return {
        ...prev,
        [typedKey]: {
          ...prev[typedKey],
          value: val,
        },
      };
    });

    if (val.trim()) {
      setModalData((prev) => {
        const typedKey = key as keyof typeof prev;

        return {
          ...prev,
          [typedKey]: {
            ...prev[typedKey],
            error: "",
          },
        };
      });
    } else {
      setModalData((prev) => {
        const typedKey = key as keyof typeof prev;

        return {
          ...prev,
          [typedKey]: {
            ...prev[typedKey],
            error: `${key} is required**`,
          },
        };
      });
    }
  };

  useEffect(() => {
    const updateCost = async (
      key: "price",
      value: string,
      updateProductPrice: ({
        ids,
        percentage,
      }: {
        ids: Array<number>;
        percentage: number;
      }) => ReturnType<typeof updateProductCost>
    ) => {
      try {
        const payload = { ids: selectedRows, percentage: Number(value) };
        await updateProductPrice(payload).unwrap();
        setModalData((prev) => ({
          ...prev,
          [key]: { open: false, value: "", error: "", submit: false },
        }));
        dispatch(
          addToast({
            message: `Update ${
              key.charAt(0).toUpperCase() + key.slice(1)
            } Successfully`,
            type: "success",
          })
        );
      } catch (error) {
        setModalData((prev) => ({
          ...prev,
          [key]: { open: true, value: "", error: "", submit: false },
        }));
        dispatch(
          addToast({
            message: `Failed to Update ${
              key.charAt(0).toUpperCase() + key.slice(1)
            }!`,
            type: "error",
          })
        );
      }
    };

    if (modalData.price.submit && !modalData.price.error) {
      updateCost("price", modalData.price.value, updateProductCost);
    } else {
      setModalData((prev) => ({
        ...prev,
        combo: { ...prev.price, submit: false },
      }));
    }
  }, [modalData.price.submit]);

  const handleFilterData = (query: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setProductSearchQuery(query);
    }, 700);
  };

  const handleSelectedSearchProduct = (
    key: string,
    value: string | OptionProps[]
  ) => {
    setFilterData((prev) => {
      const typedKey = key as keyof typeof prev;
      return {
        ...prev,
        [typedKey]: { ...prev[typedKey], value: value },
      };
    });
  };

  useEffect(() => {
    const label = productOptions.find(
      (obj) => obj.value === filterData.product.value
    );
    const productName = label?.label || "";
    const startDate = filterData.startDate.value;
    const endDate = filterData.endDate.value;
    const grade = filterData.grade.value;
    dispatch(filterSlice({ productName, startDate, endDate, grade }));
  }, [
    filterData.endDate.value,
    filterData.startDate.value,
    filterData.grade.value,
    filterData.product.value,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductBySearch({
          searchTerm: productSearchQuery ?? "",
          isStandard: 1,
        }).unwrap();
        const filteredData: Option[] = productData.data
          .filter((obj: any) => obj.id && obj.productName)
          .map((obj: any) => {
            return {
              label: String(obj.productName),
              value: obj.id,
            };
          });
        console.log("Filtered Data: ", filteredData);
        setProductOptions(filteredData);
      } catch (error) {
        dispatch(
          addToast({
            message: "Failed to search the product!",
            type: "error",
          })
        );
      }
    };
    if (productSearchQuery != null) {
      fetchData();
    }
  }, [productSearchQuery]);

  const handleFilterModalOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterModalClose = () => {
    setFilterAnchor(null);
  };

  const handleFilterChange = (label: string, value: string | null) => {
    console.log(label, value);
    setFilters((prev) => {
      const typedKey = label as keyof typeof prev;
      return { ...prev, [typedKey]: { ...prev[typedKey], value: value } };
    });
  };

  const handleApplyFilters = () => {
    const grade = filters.grade;
    const startDate = filters.startDate;
    const endDate = filters.endDate;
    console.log(grade, startDate, endDate);
    setFilterData((prev) => ({
      ...prev,
      grade: grade,
      startDate: startDate,
      endDate: endDate,
    }));
    handleFilterModalClose();
  };

  const handleResetFilters = () => {
    setFilters((prev) => {
      return {
        grade: { ...prev.grade, value: "", error: "" },
        startDate: { ...prev.startDate, value: "", error: "" },
        endDate: { ...prev.endDate, value: "", error: "" },
      };
    });
    setFilterData((prev) => {
      return {
        ...prev,
        grade: { ...prev.grade, value: "", error: "" },
        startDate: { ...prev.startDate, value: "", error: "" },
        endDate: { ...prev.endDate, value: "", error: "" },
      };
    });
    handleFilterModalClose();
  };

  const handleExportModalOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setExportAnchor(event.currentTarget);
  };

  const handleExportModalClose = () => {
    setExportAnchor(null);
    setExportDropDownValue("1");
    setFileData(fileData);
  };

  const handleExportDropDownChange = async (
    _id: string,
    value: string | OptionProps[]
  ) => {
    setExportDisable(true);
    if (typeof value === "string") setExportDropDownValue(value);
    if (value === "1") {
      setFileData(
        productData?.map((obj: Record<string, any>, index: number) => {
          const filtered: Record<string, any> = { sno: String(index + 1) };
          Object.keys(headers).forEach((key) => {
            if (key !== "sno") {
              filtered[key] = obj[key];
            }
          });
          return filtered;
        }) as StandardFileDataDto[]
      );
    } else if (value === "2") {
      const selected = selectedRows
        .map((value) => productData.find((obj) => obj.id === value))
        .filter(
          (item): item is StandardCustomizedResponse => item !== undefined
        );
      setFileData(
        selected?.map((obj: Record<string, any>, index: number) => {
          const filtered: Record<string, any> = { sno: String(index + 1) };
          Object.keys(headers).forEach((key) => {
            if (key !== "sno") {
              filtered[key] = obj[key];
            }
          });
          return filtered;
        }) as StandardFileDataDto[]
      );
    } else {
      try {
        const response = await getAllStandardProducts({
          isStandard: "1",
        });
        setFileData(
          response?.data.data.map((obj: Record<string, any>, index: number) => {
            const filtered: Record<string, any> = { sno: String(index + 1) };
            Object.keys(headers).forEach((key) => {
              if (key !== "sno") {
                filtered[key] = obj[key];
              }
            });
            return filtered;
          }) as StandardFileDataDto[]
        );
      } catch (error) {
        console.error("Error fetching product data");
      }
    }
    setExportDisable(false);
  };

  const columns: GridColDef[] = [
    {
      field: "productName",
      headerName: "Product Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "grade",
      headerName: "Grade",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ratePerQuantity",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "length",
      headerName: "Length",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "width",
      headerName: "Width",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "thickness",
      headerName: "Thickness",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "minCost",
      headerName: "Minimum Cost",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "maxCost",
      headerName: "Maximum Cost",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "remark",
      headerName: "Remark",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Box sx={{ display: "block" }}>
          <Button
            color="error"
            sx={{ minWidth: 0, padding: 0 }}
            onClick={() => handleDeleteRow([Number(params.row.id)])}
          >
            <Delete />
          </Button>
          <Button
            color="primary"
            sx={{ minWidth: 0, padding: 0 }}
            onClick={() => handleEditRow(params.row.id)}
          >
            <Edit />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box
        sx={{
          width: "100%",
          mt: 2,
          height: 60,
          backgroundColor: "#F8F8F8",
          borderRadius: "16px",
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchBox
            id={"product"}
            name={"product"}
            value={filterData.product.value}
            options={productOptions}
            onChange={handleSelectedSearchProduct}
            onSearchValueChange={handleFilterData}
          />
          <Button
            onClick={handleFilterModalOpen}
            color="primary"
            sx={{ minWidth: 0, padding: 0, mx: 1 }}
          >
            <FilterAltOutlinedIcon />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {selectedRows.length > 0 && (
            <Box>
              <Button
                sx={{
                  minWidth: 0,
                  padding: 0.5,
                  mr: 1,
                  borderRadius: "8px",
                  color: "primary",
                  border: `1px solid #1976D2`,
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "#eaf2f8",
                  },
                }}
                onClick={() =>
                  setModalData((prev) => ({
                    ...prev,
                    price: { ...prev.price, open: true },
                  }))
                }
                title="Update Price"
              >
                <ImportExportOutlinedIcon />
              </Button>

              <Button
                sx={{
                  minWidth: 0,
                  padding: 0.5,
                  mr: 1,
                  borderRadius: "8px",
                  color: "#dc2626",
                  border: `1px solid #dc2626`,
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "#f9ebea",
                  },
                }}
                onClick={() => handleDeleteRow(selectedRows)}
                title="Delete"
              >
                <Delete />
              </Button>
            </Box>
          )}
          <Button
            onClick={handleExportModalOpen}
            sx={{
              textTransform: "none",
              minWidth: 0,
              py: 0.5,
              px: 1.5,
              mr: 1,
              borderRadius: "8px",
              color: "primary",
              border: `1px solid #1976D2`,
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#eaf2f8",
              },
            }}
            title="Export"
          >
            Export{" "}
            <ArrowDownwardOutlinedIcon sx={{ width: "20px", height: "20px" }} />
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: "100%", mt: 2 }}>
        <Box sx={{ height: 310, width: "100%" }}>
          <DataTable
            rows={productData}
            columns={columns}
            disableColumnMenu
            checkboxSelection
            rowCount={productData.length}
            pageSizeOptions={[10, 25, 50, 100]}
            paginationMode="server"
            onPaginationModelChange={handlePagination}
            paginationModel={standardSelector.pagination}
            loading={isLoading}
            onRowSelectionModelChange={(params) => {
              const rows: Array<number> = [];
              params.ids.forEach((value) => {
                rows.push(Number(value));
              });
              setSelectedRows(rows);
            }}
          />
        </Box>
      </Box>
      <FilterModal
        anchor={filterAnchor}
        onClose={handleFilterModalClose}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        onApply={handleApplyFilters}
      />
      <ExportModal
        anchor={exportAnchor}
        onClose={handleExportModalClose}
        fileData={{ data: fileData, headers: headers, pageName: "standard" }}
        dropDownData={exportDropDownData}
        selectedValue={exportDropDownValue}
        onDropDownChange={handleExportDropDownChange}
        disable={exportDisable}
      />
      <OptionModal
        modalData={modalData.price}
        detail="Update Product Price"
        fields={modalInput.price}
        handleModalChange={handleModalChange}
        handleClose={() => {
          if (!productCostLoading) {
            setModalData((prev) => ({
              ...prev,
              price: {
                value: "",
                error: "",
                submit: false,
                open: false,
              },
            }));
          }
        }}
        handleModalSubmit={() => {
          if (!productCostLoading) {
            setModalData((prev) => ({
              ...prev,
              price: { ...prev.price, submit: true },
            }));
          }
        }}
        loading={productCostLoading}
      />
    </Container>
  );
};

export default StandardProductManagement;

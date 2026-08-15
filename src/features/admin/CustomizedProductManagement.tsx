import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  DeleteSweepOutlined as Delete,
  DriveFileRenameOutline as Edit,
} from "@mui/icons-material";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef, GridPaginationModel, GridRowSelectionModel } from "@mui/x-data-grid";
import {
  useDeleteCustomizedMutation,
  useGetCustomizedByFilterQuery,
  useLazyGetCustomizedByFilterQuery,
  useLazyGetCustomizedQuery,
  useUpdateProductCostMutation,
} from "../../app/api/customizedProductApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  filterSlice,
  paginationSlice,
} from "../../app/slices/customizedProductManagementSlice";
import OptionModal from "../../components/UI/OptionModal";
import { SearchBox } from "../../components/UI/SearchBox";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ExportModal from "./common/ExportModal";
import FilterModal from "./common/FilterModal";
import type { OptionProps } from "../../types/selectBox";
import { useLazyGetProductBySearchQuery } from "../../app/api/combosMappingApi";

const CustomizedProductManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const customizedSelector = useSelector(
    (state: RootState) => state.customized
  );
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({ type: "include", ids: new Set() });
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; ids: (string | number)[] }>({
    open: false,
    ids: [],
  });

  const headers = {
    sno: "S. No",
    productName: "Product Name",
    ratePerQuantity: "Price",
    weightOfObject: "Weight",
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
  const [fileData, setFileData] = useState<CustomizedFileDataDto[] | []>([]);
  const [exportDropDownValue, setExportDropDownValue] = useState<string>("1");
  const [exportDisable, setExportDisable] = useState<boolean>(false);

  const modalInput = {
    price: [{ key: "price", label: "Product Price", type: "number" }],
  };
  const [modalData, setModalData] = useState<UpdateCostModalData>({
    price: { open: false, value: "", error: "", submit: false },
  });

  const [getAllCustomizedProducts] = useLazyGetCustomizedQuery();

  const {
    data: rawData,
    isLoading: isGetLoading,
  } = useGetCustomizedByFilterQuery({
    isStandard: "0",
    page: customizedSelector.pagination.page,
    size: customizedSelector.pagination.pageSize,
    productName: customizedSelector.filterData.productName,
    startDate: customizedSelector.filterData.startDate,
    endDate: customizedSelector.filterData.endDate,
    grade: customizedSelector.filterData.grade,
  });

  const [
    getProductBySearch,
    // { isLoading: productBySearchLoading }
  ] = useLazyGetProductBySearchQuery();

  const [
    deleteCustomized,
    // { isLoading: deleteLoading }
  ] = useDeleteCustomizedMutation();

  const [updateProductCost, { isLoading: productCostLoading }] =
    useUpdateProductCostMutation();

  const productData = useMemo(() => {
    return rawData?.data || [];
  }, [rawData]);

  useEffect(() => {
    if (productData.length > 0) {
      setFileData(
        productData.map((obj: Record<string, any>, index: number) => {
          const filtered: Record<string, any> = { sno: String(index + 1) };
          Object.keys(headers).forEach((key) => {
            if (key !== "sno") {
              filtered[key] = obj[key];
            }
          });
          return filtered;
        }) as CustomizedFileDataDto[]
      );
    }
  }, [productData]);

  const getSelectedIds = () => {
    if (selectedRows.type === "include") {
      return Array.from(selectedRows.ids);
    }
    return productData
      .map((row: any) => row.id)
      .filter((id: string | number) => !selectedRows.ids.has(id));
  };

  const handleDeleteRow = (ids: Array<string | number>) => {
    setDeleteConfirmation({ open: true, ids });
  };

  const confirmDelete = async () => {
    const ids = deleteConfirmation.ids;
    try {
      if (ids && ids.length > 0) {
        const deleteData = await deleteCustomized({ ids: ids.map(id => Number(id)) }); // Assuming API expects numbers
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
          setSelectedRows({ type: "include", ids: new Set() });
        }
      }
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to Deleting Product!",
          type: "error",
        })
      );
    } finally {
      setDeleteConfirmation({ open: false, ids: [] });
    }
  };

  const handleEditRow = (id: string) => {
    navigate(`/admin/master-form?tab=customized&id=${id}`);
  };

  const handlePagination = (model: GridPaginationModel) => {
    dispatch(paginationSlice({ page: model.page, pageSize: model.pageSize }));
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
        const currentIds = getSelectedIds();
        const payload = { ids: currentIds.map((id: string | number) => Number(id)), percentage: Number(value) };
        await updateProductPrice(payload).unwrap();
        setModalData((prev) => ({
          ...prev,
          [key]: { open: false, value: "", error: "", submit: false },
        }));
        dispatch(
          addToast({
            message: `Update ${key.charAt(0).toUpperCase() + key.slice(1)
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
            message: `Failed to Update ${key.charAt(0).toUpperCase() + key.slice(1)
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
          isStandard: 0,
        }).unwrap();
        const filteredData: Option[] = productData.data
          .filter((obj: any) => obj.id && obj.productName)
          .map((obj: any) => {
            return {
              label: String(obj.productName),
              value: obj.id,
            };
          });
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
        }) as CustomizedFileDataDto[]
      );
    } else if (value === "2") {
      const currentIds = getSelectedIds();
      const selected = currentIds
        .map((value: string | number) => productData.find((obj: any) => obj.id === value))
        .filter(
          (item: any): item is StandardCustomizedResponse => item !== undefined
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
        }) as CustomizedFileDataDto[]
      );
    } else {
      try {
        const response = await getAllCustomizedProducts({
          isStandard: "0",
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
          }) as CustomizedFileDataDto[]
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
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "grade",
      headerName: "Grade",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "ratePerQuantity",
      headerName: "Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "weightOfObject",
      headerName: "Weight",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "length",
      headerName: "Length",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "width",
      headerName: "Width",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "thickness",
      headerName: "Thickness",
      flex: 1,
      headerAlign: "center",
      align: "center",
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
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <Box sx={{ display: "block" }}>
          <Button
            color="error"
            sx={{ minWidth: 0, padding: 0 }}
            onClick={() => handleDeleteRow([params.row.id])}
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
          {(selectedRows.type === "exclude" || selectedRows.ids.size > 0) && (
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
                onClick={() => handleDeleteRow(getSelectedIds())}
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
        <Box sx={{ height: 600, width: "100%" }}>
          <DataTable
            rows={productData}
            columns={columns}
            disableColumnMenu
            checkboxSelection
            rowCount={Number(rawData?.total) || 0}
            pageSizeOptions={[10, 25, 50, 100]}
            paginationMode="server"
            onPaginationModelChange={handlePagination}
            paginationModel={customizedSelector.pagination}
            loading={isGetLoading}
            onRowSelectionModelChange={(newSelection) => {
              setSelectedRows(newSelection);
            }}
            rowSelectionModel={selectedRows}
            initialState={{
              pagination: {
                paginationModel: customizedSelector.pagination,
              },
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
        fileData={{ data: fileData, headers: headers, pageName: "customized" }}
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
        showPriceHelper={true}
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
      <Dialog
        open={deleteConfirmation.open}
        onClose={() => setDeleteConfirmation({ open: false, ids: [] })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected product(s)? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation({ open: false, ids: [] })}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomizedProductManagement;

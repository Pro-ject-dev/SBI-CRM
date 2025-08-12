import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect, useRef, useState } from "react";
import { addToast } from "../../app/slices/toastSlice";
import type { OptionProps } from "../../types/selectBox";
import {
  useDeleteComboByIdMutation,
  useGetComboMapByFilterMutation,
  useGetComboQuery,
  useLazyGetCategoryByComboQuery,
} from "../../app/api/combosMappingApi";
import {
  filterSlice,
  paginationSlice,
} from "../../app/slices/comboProductManagementSlice";
import type { GridColDef } from "@mui/x-data-grid";
import { Box, Button, Container } from "@mui/material";
import { DeleteSweepOutlined as Delete } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import FilterModal from "./common/FilterModal";
import ExportModal from "./common/ExportModal";
import { DataTable } from "../../components/UI/DataTable";
import { SearchTextField } from "../../components/UI/SearchTextField";
import { AutocompleteInput } from "../../components/UI/AutoCompleteInput";

const ComboMappingManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const comboSelector = useSelector((state: RootState) => state.combo);
  const [selectedRows, setSelectedRows] = useState<Array<number>>([]);
  const headers = {
    sno: "S. No",
    productName: "Product Name",
    comboName: "Combo Name",
    categoryName: "Category Name",
    grade: "Grade",
    ratePerQuantity: "Price",
  };

  const [comboOptions, setComboOptions] = useState<Option[]>([
    { label: "All", value: "" },
  ]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([
    { label: "All", value: "" },
  ]);
  const [comboDropDownValue, setComboDropDownValue] = useState<{
    combo: string;
    category: string;
  }>({
    combo: "",
    category: "",
  });

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [filterAnchor, setFilterAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  const [filterData, setFilterData] = useState<FilterComboProductData>({
    startDate: { key: "startDate", label: "From Date", value: "", error: "" },
    endDate: { key: "endDate", label: "To Date", value: "", error: "" },
    grade: { key: "grade", label: "Grade", value: "", error: "" },
    product: { key: "product", label: "Product Name", value: "", error: "" },
    category: { key: "category", label: "Combo Name", value: "", error: "" },
    combo: { key: "combo", label: "Category Name", value: "", error: "" },
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
  const [fileData, setFileData] = useState<ComboFileDataDto[] | []>([]);
  const [exportDropDownValue, setExportDropDownValue] = useState<string>("1");
  const [exportDisable, setExportDisable] = useState<boolean>(false);

  const [
    getComboProducts,
    { isLoading },
    // isError,
  ] = useGetComboMapByFilterMutation();

  const [
    deleteCombo,
    // { isLoading: deleteLoading }
  ] = useDeleteComboByIdMutation();

  const { data: comboOptionData } = useGetComboQuery("");

  const [getCategoryOptions] = useLazyGetCategoryByComboQuery();

  const [productData, setProductData] = useState<ComboResponse[] | []>([]);

  useEffect(() => {
    if (comboOptionData?.data) {
      const filteredData: Option[] = comboOptions.concat(
        comboOptionData.data
          .filter((obj: any) => obj.id && obj.name)
          .map((obj: any) => ({
            label: String(obj.name),
            value: obj.id,
          }))
      );
      setComboOptions(filteredData);
    }
  }, [comboOptionData]);

  useEffect(() => {
    const fetchData = async () => {
      setComboDropDownValue((prev) => ({ ...prev, category: "" }));
      try {
        const category = await getCategoryOptions(comboDropDownValue.combo);
        const filteredData: Option[] = [{ label: "All", value: "" }].concat(
          category?.data.data
            .filter((obj: any) => obj.id && obj.name)
            .map((obj: any) => ({
              label: String(obj.name),
              value: obj.id,
            }))
        );
        setCategoryOptions(filteredData);
      } catch (error) {
        console.error("Failed to fetch category options!");
      }
    };
    if (comboDropDownValue.combo) {
      fetchData();
    } else {
      setCategoryOptions([{ label: "All", value: "" }]);
    }
  }, [comboDropDownValue.combo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getComboProducts({
          page: comboSelector.pagination.page + 1,
          size: comboSelector.pagination.pageSize,
          productStr: comboSelector.filterData.productName,
          startDate: comboSelector.filterData.startDate,
          endDate: comboSelector.filterData.endDate,
          grade: comboSelector.filterData.grade,
          catId: comboSelector.filterData.catId,
          comboId: comboSelector.filterData.comboId,
        });
        const products = response?.data.data.map(
          (obj: Record<string, any>, _index: number) => ({
            id: obj.id,
            date: obj.date,
            comboId: obj.comboId,
            catId: obj.catId,
            productId: obj.productId,
            status: obj.status,
            createdAt: obj.createdAt,
            updatedAt: obj.updatedAt,
            productName: obj.product.productName,
            grade: obj.product.grade,
            ratePerQuantity: obj.product.ratePerQuantity,
            categoryName: obj.category.name,
            comboName: obj.combo.name,
          })
        );
        setFileData(
          products.map((obj: Record<string, any>, index: number) => {
            const filtered: Record<string, any> = { sno: String(index + 1) };
            Object.keys(headers).forEach((key) => {
              if (key !== "sno") {
                filtered[key] = obj[key];
              }
            });
            return filtered;
          })
        );
        setProductData(products);
      } catch (error) {
        console.error("Error fetching product data");
      }
    };
    fetchData();
  }, [
    comboSelector.pagination.page,
    comboSelector.pagination.pageSize,
    comboSelector.filterData.productName,
    comboSelector.filterData.startDate,
    comboSelector.filterData.endDate,
    comboSelector.filterData.grade,
    comboSelector.filterData.catId,
    comboSelector.filterData.comboId,
  ]);

  const handleDeleteRow = async (ids: number[]) => {
    try {
      if (ids) {
        const deleteData = await deleteCombo({ ids });
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
        setSelectedRows([]);
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

  const handlePagination = (params: any) => {
    const { page, pageSize } = params;
    dispatch(paginationSlice({ page, pageSize }));
  };

  const handleFilterData = (key: string, value: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setFilterData((prev) => {
        const typedKey = key as keyof typeof prev;
        return {
          ...prev,
          [typedKey]: { ...prev[typedKey], value: value },
        };
      });
    }, 700);
  };

  useEffect(() => {
    console.log("selector");
    const productName = filterData.product.value;
    const startDate = filterData.startDate.value;
    const endDate = filterData.endDate.value;
    const grade = filterData.grade.value;
    const comboId = filterData.combo.value;
    const catId = filterData.category.value;
    dispatch(
      filterSlice({ productName, startDate, endDate, grade, comboId, catId })
    );
  }, [
    filterData.endDate.value,
    filterData.startDate.value,
    filterData.grade.value,
    filterData.product.value,
    filterData.category.value,
    filterData.combo.value,
  ]);

  const handleFilterModalOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterModalClose = () => {
    setFilterAnchor(null);
  };

  const handleFilterChange = (label: string, value: string | null) => {
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
    handleExportDropDownChange("exportProduct", "1");
  };

  const handleExportDropDownChange = async (
    _id: string,
    value: string | OptionProps[]
  ) => {
    console.log("open");
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
        }) as ComboFileDataDto[]
      );
    } else if (value === "2") {
      const selected = selectedRows
        .map((value) => productData.find((obj) => obj.id === value))
        .filter((item): item is ComboResponse => item !== undefined);
      setFileData(
        selected?.map((obj: Record<string, any>, index: number) => {
          const filtered: Record<string, any> = { sno: String(index + 1) };
          Object.keys(headers).forEach((key) => {
            if (key !== "sno") {
              filtered[key] = obj[key];
            }
          });
          return filtered;
        }) as ComboFileDataDto[]
      );
    } else {
      try {
        const response = await getComboProducts({
          page: "",
          size: "",
          productStr: "",
          startDate: "",
          endDate: "",
          grade: "",
          catId: "",
          comboId: "",
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
          }) as ComboFileDataDto[]
        );
      } catch (error) {
        console.error("Error fetching product data");
      }
    }
    setExportDisable(false);
  };

  const handleCombosChange = (key: string, value: string | OptionProps[]) => {
    setComboDropDownValue((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setFilterData((prev) => {
      return {
        ...prev,
        combo: { ...prev.combo, value: comboDropDownValue.combo, error: "" },
        category: {
          ...prev.category,
          value: comboDropDownValue.category,
          error: "",
        },
      };
    });
  }, [comboDropDownValue.category, comboDropDownValue.combo]);

  const columns: GridColDef[] = [
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "comboName",
      headerName: "Combo Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "categoryName",
      headerName: "Category Name",
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
      field: "grade",
      headerName: "Grade",
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
            onClick={() => handleDeleteRow(params.row.id)}
          >
            <Delete />
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
          <SearchTextField
            id={"product"}
            value={filterData.product.value}
            onChange={handleFilterData}
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
          <AutocompleteInput
            id="combo"
            name="combo"
            label="Combo"
            value={comboDropDownValue.combo}
            options={comboOptions}
            onChange={handleCombosChange}
            placeholder="Select the combo"
          />
          {comboDropDownValue.combo && (
            <Box sx={{ marginLeft: 1 }}>
              <AutocompleteInput
                id="category"
                name="category"
                label="Category"
                value={comboDropDownValue.category}
                options={categoryOptions}
                onChange={handleCombosChange}
                placeholder="Select the category"
              />
            </Box>
          )}
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
            paginationModel={comboSelector.pagination}
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
        fileData={{ data: fileData, headers: headers, pageName: "combo" }}
        dropDownData={exportDropDownData}
        selectedValue={exportDropDownValue}
        onDropDownChange={handleExportDropDownChange}
        disable={exportDisable}
      />
    </Container>
  );
};

export default ComboMappingManagement;

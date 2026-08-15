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
  useDeleteComboMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../app/api/combosMappingApi";
import {
  filterSlice,
  paginationSlice,
} from "../../app/slices/comboProductManagementSlice";
import type { GridColDef, GridPaginationModel, GridRowSelectionModel } from "@mui/x-data-grid";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DeleteSweepOutlined as Delete } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import FilterModal from "./common/FilterModal";
import ExportModal from "./common/ExportModal";
import ManageComboCategoryModal from "./common/ManageComboCategoryModal";
import { DataTable } from "../../components/UI/DataTable";
import { SearchTextField } from "../../components/UI/SearchTextField";
import { AutocompleteInput } from "../../components/UI/AutoCompleteInput";

const ComboMappingManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const comboSelector = useSelector((state: RootState) => state.combo);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({ type: "include", ids: new Set() });
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; ids: (string | number)[] }>({
    open: false,
    ids: [],
  });
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
    deleteComboById,
    // { isLoading: deleteLoading }
  ] = useDeleteComboByIdMutation();

  const [deleteCombo] = useDeleteComboMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [comboDeleted, setComboDeleted] = useState<Boolean>(false);

  const [manageModalOpen, setManageModalOpen] = useState(false);

  const { data: comboOptionData } = useGetComboQuery("");
  const { data: categoryOptionData } = useGetCategoryQuery("");

  const [getCategoryOptions] = useLazyGetCategoryByComboQuery();

  const [productData, setProductData] = useState<ComboResponse[] | []>([]);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    if (comboOptionData?.data) {
      const filteredData: Option[] = [{ label: "All", value: "" }].concat(
        comboOptionData.data
          .filter((obj: any) => obj.id && obj.name)
          .map((obj: any) => ({
            label: String(obj.name),
            value: String(obj.id),
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
              value: String(obj.id),
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
  }, [comboDropDownValue.combo, comboDeleted]);

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
        setTotalRows(response?.data.total || 0);
        setProductData(products);
      } catch (error) {
        console.error("Error fetching product data");
      }
      setComboDeleted(false);
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
    comboDeleted === true,
  ]);

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
        const deleteData = await deleteComboById({ id: ids.map(id => Number(id)) });
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
          setComboDeleted(true);
        }
        setSelectedRows({ type: "include", ids: new Set() });
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

  const handleDeleteCombo = async (id: string) => {
    try {
      const response = await deleteCombo({ id });
      if (response.error) {
        dispatch(addToast({ message: "Failed to Delete Combo!", type: "error" }));
      } else {
        dispatch(addToast({ message: "Combo Deleted Successfully", type: "success" }));
        setComboDropDownValue(prev => ({ ...prev, combo: "" }));
        setComboDeleted(true); // Trigger refresh
      }
    } catch (error) {
      dispatch(addToast({ message: "Failed to Delete Combo!", type: "error" }));
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await deleteCategory({ id });
      if (response.error) {
        dispatch(addToast({ message: "Failed to Delete Category!", type: "error" }));
      } else {
        dispatch(addToast({ message: "Category Deleted Successfully", type: "success" }));
        setComboDropDownValue(prev => ({ ...prev, category: "" }));
        setComboDeleted(true); // Trigger refresh
      }
    } catch (error) {
      dispatch(addToast({ message: "Failed to Delete Category!", type: "error" }));
    }
  };

  const handlePagination = (model: GridPaginationModel) => {
    dispatch(paginationSlice({ page: model.page, pageSize: model.pageSize }));
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
      const currentIds = getSelectedIds();
      const selected = currentIds
        .map((id: string | number) => productData.find((obj: any) => obj.id === id))
        .filter((item: any): item is ComboResponse => item !== undefined);
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
      field: "comboName",
      headerName: "Combo Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "productName",
      headerName: "Product Name",
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
    // {
    //   field: "ratePerQuantity",
    //   headerName: "Price",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "grade",
    //   headerName: "Grade",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    // },
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
          <Box sx={{ marginLeft: 1 }}>
            <AutocompleteInput
              id="combo"
              name="combo"
              label="Combo"
              value={comboDropDownValue.combo}
              options={comboOptions}
              onChange={handleCombosChange}
              placeholder="Select the combo"
            />
          </Box>
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
          {(selectedRows.type === "exclude" || selectedRows.ids.size > 0) && (
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
                onClick={() => handleDeleteRow(getSelectedIds().map((id: string | number) => Number(id)))}
                title="Delete"
              >
                <Delete />
              </Button>
            </Box>
          )}
          <Button
            onClick={() => setManageModalOpen(true)}
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
          >
            ⚙️
          </Button>
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
            rowCount={totalRows}
            pageSizeOptions={[10, 25, 50, 100]}
            paginationMode="server"
            onPaginationModelChange={handlePagination}
            paginationModel={comboSelector.pagination}
            loading={isLoading}
            onRowSelectionModelChange={(newSelection) => {
              setSelectedRows(newSelection);
            }}
            rowSelectionModel={selectedRows}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: comboSelector.pagination,
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
        fileData={{ data: fileData, headers: headers, pageName: "combo" }}
        dropDownData={exportDropDownData}
        selectedValue={exportDropDownValue}
        onDropDownChange={handleExportDropDownChange}
        disable={exportDisable}
      />
      <ManageComboCategoryModal
        open={manageModalOpen}
        onClose={() => setManageModalOpen(false)}
        comboOptions={comboOptions.filter(opt => opt.value !== "")}
        categoryOptions={(categoryOptionData?.data || [])
          .filter((obj: any) => obj.id && obj.name)
          .map((obj: any) => ({ label: String(obj.name), value: String(obj.id) }))
        }
        onDeleteCombo={handleDeleteCombo}
        onDeleteCategory={handleDeleteCategory}
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

export default ComboMappingManagement;

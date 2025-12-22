import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import {
  useDeleteStandardMutation,
  useGetStandardByFilterQuery,
  useLazyGetStandardByFilterQuery,
  useLazyGetStandardQuery,
  useUpdateStandardMutation,
  useDeleteStandardVariantMutation,
  useUpdateProductCostMutation,
} from "../../app/api/standardProductApi";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  DeleteSweepOutlined as Delete,
  DriveFileRenameOutline as Edit,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRowSelectionModel, GridPaginationModel } from "@mui/x-data-grid";
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
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({ type: "include", ids: new Set() });
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
  // ... (omitted unrelated lines)


  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; ids: (string | number)[] }>({
    open: false,
    ids: [],
  });
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

  // Fetch data using the standard hook
  const {
    data: rawData,
    isLoading: isGetLoading,
  } = useGetStandardByFilterQuery({
    isStandard: "1",
    page: standardSelector.pagination.page,
    size: standardSelector.pagination.pageSize,
    productName: standardSelector.filterData.productName,
    startDate: standardSelector.filterData.startDate,
    endDate: standardSelector.filterData.endDate,
    grade: standardSelector.filterData.grade,
  });

  const [getAllStandardProducts] = useLazyGetStandardQuery();
  const [deleteStandard] = useDeleteStandardMutation();
  const [deleteStandardVariant] = useDeleteStandardVariantMutation();
  const [updateProductCost, { isLoading: productCostLoading }] = useUpdateProductCostMutation();
  const [getProductBySearch] = useLazyGetProductBySearchQuery();

  const productData = useMemo(() => {
    if (!rawData?.data) return [];
    const flattenedData: any[] = [];
    rawData.data.forEach((prod: any) => {
      if (!prod.id) return;
      if (prod.variants && prod.variants.length > 0) {
        prod.variants.forEach((v: any) => {
          if (!v.id) return;
          flattenedData.push({
            ...prod,
            ...v,
            id: `${prod.id}_${v.id}`,
            originalProductId: prod.id,
            isVariant: true,
            productName: prod.productName
          });
        });
      } else {
        flattenedData.push({
          ...prod,
          id: String(prod.id),
          originalProductId: prod.id,
          isVariant: false
        });
      }
    });
    return flattenedData;
  }, [rawData]);

  useEffect(() => {
    if (productData.length > 0) {
      setFileData(
        productData.map((obj: any, index: number) => {
          const filtered: any = { sno: String(index + 1) };
          Object.keys(headers).forEach((key) => {
            if (key !== "sno") {
              filtered[key] = obj[key];
            }
          });
          return filtered;
        })
      );
    }
  }, [productData]);



  const getSelectedIds = () => {
    if (selectedRows.type === "include") {
      return Array.from(selectedRows.ids);
    }
    return productData
      .map((row: any) => row.id)
      .filter((id) => !selectedRows.ids.has(id));
  };

  const handleEditRow = (id: string | number) => {
    navigate(`/admin/master-form?tab=standard&id=${id}`);
  };

  const handleDeleteRow = (ids: Array<string | number>) => {
    setDeleteConfirmation({ open: true, ids });
  };

  const confirmDelete = async () => {
    const ids = deleteConfirmation.ids;
    try {
      if (ids && ids.length > 0) {
        const variantsToDelete: number[] = [];
        const productsToDelete: number[] = [];

        // Map product ID to set of its variant IDs being deleted
        const productToDeletedVariants = new Map<number, number[]>();

        ids.forEach((id) => {
          const strId = String(id);
          if (strId.includes("_")) {
            // It's a variant row: "prodId_varId"
            const [pId, vId] = strId.split("_").map(Number);
            if (!productToDeletedVariants.has(pId)) {
              productToDeletedVariants.set(pId, []);
            }
            productToDeletedVariants.get(pId)!.push(vId);
          } else {
            // It's a product row
            productsToDelete.push(Number(strId));
          }
        });

        // For each affected product via variant selection
        productToDeletedVariants.forEach((deletedVariantIds, pId) => {
          const product = rawData?.data.find((p: any) => p.id === pId);
          if (product) {
            const currentVariants = product.variants ? product.variants.filter((v: any) => v.status === "1") : [];
            const totalActiveVariants = currentVariants.length;

            // If we're deleting all active variants or if this product is already marked for deletion anyway
            if (deletedVariantIds.length >= totalActiveVariants && totalActiveVariants > 0) {
              if (!productsToDelete.includes(pId)) {
                productsToDelete.push(pId);
              }
            } else {
              // Only some variants being deleted, or no variants existed (redundant check)
              variantsToDelete.push(...deletedVariantIds);
            }
          }
        });

        // Execute deletions
        // Note: If a product is in productsToDelete, its variants will be soft-deleted by the backend.
        // If we want hard-delete for variants alone, we still call deleteStandardVariant for variants not included in a full product delete.
        if (variantsToDelete.length > 0) {
          await deleteStandardVariant({ ids: variantsToDelete });
        }

        if (productsToDelete.length > 0) {
          await deleteStandard({ ids: productsToDelete });
        }

        dispatch(addToast({ message: "Deleted successfully", type: "success" }));
        setSelectedRows({ type: "include", ids: new Set() }); // Clear selection after delete
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
            error: `${key} is required ** `,
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
        const originalIds = [...new Set(currentIds.map(id => {
          const row = productData.find((p: any) => String(p.id) === String(id));
          return row ? Number(row.originalProductId) : Number(id);
        }))];
        const payload = { ids: originalIds, percentage: Number(value) };
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
              } !`,
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
      const currentIds = getSelectedIds();
      const selected = currentIds
        .map((id: string | number) => productData.find((obj: any) => obj.id === id))
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
            onClick={() => handleDeleteRow([params.row.id])}
          >
            <Delete />
          </Button>
          <Button
            color="primary"
            sx={{ minWidth: 0, padding: 0 }}
            onClick={() => handleEditRow(params.row.originalProductId)}
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
        <Box sx={{ height: 310, width: "100%" }}>
          <DataGrid
            rows={productData}
            columns={columns}
            disableColumnMenu
            checkboxSelection
            rowCount={Number(rawData?.total) || 0}
            pageSizeOptions={[10, 25, 50, 100]}
            paginationMode="server"
            onPaginationModelChange={handlePagination}
            paginationModel={standardSelector.pagination}
            loading={isGetLoading}
            onRowSelectionModelChange={(newSelection) => {
              setSelectedRows(newSelection);
            }}
            rowSelectionModel={selectedRows}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: standardSelector.pagination,
              },
            }}
            sx={{
              borderRadius: "16px",
              border: "1px solid #e0e0e0",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#F8F8F8",
                borderBottom: "1px solid #e0e0e0",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #e0e0e0",
                backgroundColor: "#fafafa",
              }
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

export default StandardProductManagement;

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
        // Flatten data: If a product has variants, create a row for each variant.
        const flattenedData: any[] = [];
        response?.data.data.forEach((prod: any) => {
          // Normalize Keys Helper
          const getVal = (obj: any, keys: string[]) => {
            for (const k of keys) {
              if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "" && obj[k] !== "0" && obj[k] !== 0) return obj[k];
            }
            return ""; // Default to empty string if nothing found
          };

          if (prod.variants && prod.variants.length > 0) {
            prod.variants.forEach((v: any) => {
              flattenedData.push({
                ...prod,
                ...v, // Override product defaults with variant details
                id: `${prod.id}_${v.id}`,
                originalProductId: prod.id,
                isVariant: true,
                productName: prod.productName,
                // Grade is typically a product-level attribute not always present in variant
                grade: getVal(v, ["grade", "Grade"]) || getVal(prod, ["grade", "Grade"]),
                // Falling back to product data as variant data is often null/empty
                minCost: getVal(v, ["minCost", "MinCost", "minimumCost", "MinimumCost"]) || getVal(prod, ["minCost", "MinCost", "minimumCost", "MinimumCost"]),
                maxCost: getVal(v, ["maxCost", "MaxCost", "maximumCost", "MaximumCost"]) || getVal(prod, ["maxCost", "MaxCost", "maximumCost", "MaximumCost"]),
                ratePerQuantity: getVal(v, ["ratePerQuantity", "RatePerQuantity", "price", "Price"]) || getVal(prod, ["ratePerQuantity", "RatePerQuantity", "price", "Price"]),
                length: getVal(v, ["length", "Length"]) || getVal(prod, ["length", "Length"]),
                width: getVal(v, ["width", "Width"]) || getVal(prod, ["width", "Width"]),
                thickness: getVal(v, ["thickness", "Thickness"]) || getVal(prod, ["thickness", "Thickness"]),
              });
            });
          } else {
            flattenedData.push({
              ...prod,
              originalProductId: prod.id,
              isVariant: false,
              grade: getVal(prod, ["grade", "Grade"]),
              minCost: getVal(prod, ["minCost", "MinCost", "minimumCost", "MinimumCost"]),
              maxCost: getVal(prod, ["maxCost", "MaxCost", "maximumCost", "MaximumCost"]),
              ratePerQuantity: getVal(prod, ["ratePerQuantity", "RatePerQuantity", "price", "Price"]),
              length: getVal(prod, ["length", "Length"]),
              width: getVal(prod, ["width", "Width"]),
              thickness: getVal(prod, ["thickness", "Thickness"]),
            });
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
            });
            return filtered;
          }) as StandardFileDataDto[]
        );
      } catch (error) {
        console.error("Error fetching product data");
      }
    };
    fetchData();
  }, [standardSelector, data]);

  const handleDeleteRow = async (ids: Array<string | number>) => {
    try {
      if (ids && ids.length > 0) {
        // Extract originalProductIds if passed directly or via selection
        // If passed from button click (single item), it might be [originalId]
        // If passed from multiselect, it's [compositeId1, compositeId2]

        const originalIds = [...new Set(ids.map(id => {
          const row = productData.find((p: any) => p.id === id);
          return row ? row.originalProductId : Number(id); // Fallback if direct number passed
        }))].filter((id): id is number => id !== undefined);

        const deleteData = await deleteStandard({ ids: originalIds });
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
        const originalIds = [...new Set(selectedRows.map(id => {
          const row = productData.find((p: any) => p.id === id);
          return row ? row.originalProductId : Number(id);
        }))].filter((id): id is number => id !== undefined);
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

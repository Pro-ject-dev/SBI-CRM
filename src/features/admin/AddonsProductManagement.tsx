import { Box, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import {
  useDeleteAddonsMutation,
  useGetAddonsQuery,
} from "../../app/api/addonsProductApi";
import { useNavigate } from "react-router-dom";

const AddonsProductManagement = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetAddonsQuery("");

  const [deleteAddons, { isLoading: deleteLoading }] =
    useDeleteAddonsMutation();

  const [productData, setProductData] = useState<AddonsResponse[] | []>([]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const products = data || [];
    setProductData(products);
  }, [data]);

  const handleDeleteRow = async (id: string) => {
    try {
      if (id) {
        const deleteData = await deleteAddons({ id });
        console.log("Data Deleted: ", deleteData);
      }
    } catch (error) {
      console.log(`Deleting Data: ${error}`);
    }
  };

  const handleEditRow = (id: string) => {
    navigate(`/admin/master-form?tab=addons&id=${id}`);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
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
      field: "ratePerKg",
      headerName: "Rate Per Kg",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "weightOfObject",
      headerName: "weight",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "width",
      headerName: "width",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "length",
      headerName: "length",
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
      field: "minSqIn",
      headerName: "Min Limit / sq.in",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gst",
      headerName: "GST",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      headerAlign: "center",
      align: "center",
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
            sx={{ p: "0px", m: "0px" }}
            onClick={() => handleDeleteRow(params.row.id)}
          >
            <Delete />
          </Button>
          <Button
            color="primary"
            sx={{ p: "0px", m: "0px" }}
            onClick={() => handleEditRow(params.row.id)}
          >
            <Edit />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ width: "100%", marginTop: "8px" }}>
        <Box sx={{ height: 400 }}>
          <DataTable rows={productData} columns={columns} disableColumnMenu />
        </Box>
      </Box>
    </Container>
  );
};

export default AddonsProductManagement;

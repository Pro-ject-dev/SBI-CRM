import { Box, Button, Container } from "@mui/material";
import {
  useDeleteStandardMutation,
  useGetStandardQuery,
} from "../../app/api/standardProductApi";
import { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const StandardProductManagement = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetStandardQuery({
    isStandard: "1",
  });

  const [deleteStandard, { isLoading: deleteLoading }] =
    useDeleteStandardMutation();

  const [productData, setProductData] = useState<
    StandardCustomizedResponse[] | []
  >([]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const products = data?.data || [];
    setProductData(products);
  }, [data]);

  const handleDeleteRow = async (id: string) => {
    try {
      if (id) {
        const deleteData = await deleteStandard({ id });
        console.log("Data Deleted: ", deleteData);
      }
    } catch (error) {
      console.log(`Deleting Data: ${error}`);
    }
  };

  const handleEditRow = (id: string) => {
    navigate(`/admin/master-form?tab=standard&id=${id}`);
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
      headerName: "Rate Per Quantity",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "length",
      headerName: "Size",
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
      field: "maxCost",
      headerName: "Minimum Cost",
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

export default StandardProductManagement;

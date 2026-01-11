import {
    Box,
    Container,
    TextField,
    Chip,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Warning } from "@mui/icons-material";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import {
    useGetConsumableMaterialsQuery,
} from "../../app/api/consumableMaterialsApi";
import type { ConsumableMaterial } from "../../types/warehouse";

const ConsumableMaterialsManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [materialData, setMaterialData] = useState<ConsumableMaterial[]>([]);

    const { data, refetch } = useGetConsumableMaterialsQuery({
        search: searchTerm,
        status: statusFilter,
    });

    useEffect(() => {
        refetch();
    }, [searchTerm, statusFilter, refetch]);

    useEffect(() => {
        const materials = data?.data || [];
        setMaterialData(materials);
    }, [data]);

    const getStockStatus = (current: number | string, minimum: number | string) => {
        const currentNum = Number(current);
        const minNum = Number(minimum);

        if (currentNum === 0) {
            return <Chip label="Out of Stock" color="error" size="small" />;
        } else if (currentNum <= minNum) {
            return <Chip label="Low Stock" color="warning" size="small" />;
        } else {
            return <Chip label="In Stock" color="success" size="small" />;
        }
    };

    const columns: GridColDef[] = [
        {
            field: "materialName",
            headerName: "Material Name",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "currentStock",
            headerName: "Current Stock",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", gap: 1 }}>
                    {Number(params.row.currentStock) <= Number(params.row.minimumStock) && (
                        <Warning color="warning" fontSize="small" />
                    )}
                    {params.row.currentStock} {params.row.unit}
                </Box>
            ),
        },
        {
            field: "minimumStock",
            headerName: "Min Stock",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => `${params.row.minimumStock} ${params.row.unit || ""}`,
        },
        {
            field: "status",
            headerName: "Stock Status",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Box sx={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>
                    {getStockStatus(params.row.currentStock, params.row.minimumStock)}
                </Box>
            ),
        },
        {
            field: "barcode",
            headerName: "Barcode",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => params.row.barcode || "N/A",
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontSize: { xs: "1.5rem", md: "2rem" },
                }}
            >
                Consumable Materials Management
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", md: "center" },
                    mb: 3,
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "stretch", sm: "center" },
                        width: "100%"
                    }}
                >
                    <TextField
                        size="small"
                        placeholder="Search materials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                </Box>
            </Box>

            <Box sx={{ width: "100%", marginTop: "8px" }}>
                <Box sx={{ height: 600, overflowX: "auto" }}>
                    <DataTable rows={materialData} columns={columns} disableColumnMenu getRowId={(row: any) => row.id} />
                </Box>
            </Box>
        </Container>
    );
};

export default ConsumableMaterialsManagement;

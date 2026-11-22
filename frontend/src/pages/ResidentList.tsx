import { useEffect, useState } from "react";
import type { Resident } from "../interfaces/Resident";
import {
    Box,
    Button,
    Container,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Typography,
    Pagination
} from "@mui/material";

import {
    getResidents,
    deleteResident
} from "../services/residentService";

function ResidentList() {

    const [residents, setResidents] =
        useState<Resident[]>([]);

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(1);

    const [totalRecords, setTotalRecords] =
        useState(0);

    const pageSize = 10;

    const loadResidents = async () => {

        try {

            const response =
                await getResidents(
                    search,
                    page,
                    pageSize
                );

            setResidents(
                response.data.data
            );

            setTotalRecords(
                response.data.total_records
            );

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {

        loadResidents();

    }, [page]);

    const handleSearch = () => {

        setPage(1);

        loadResidents();

    };

    const handleDelete =
        async (id: number) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete?"
            );

        if (!confirmed)
            return;

        try {

            await deleteResident(id);

            loadResidents();

        } catch (error) {

            console.error(error);

        }
    };

    const totalPages =
        Math.ceil(
            totalRecords / pageSize
        );

    return (

        <Container maxWidth="lg">

            <Typography
                variant="h4"
                sx={{ mt: 3, mb: 3 }}
            >
                Resident Management
            </Typography>

            <Paper sx={{ p: 2, mb: 3 }}>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2
                    }}
                >

                    <TextField
                        label="Search"
                        fullWidth
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                    <Button
                        variant="contained"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>

                </Box>

            </Paper>

            <Paper>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>
                                Flat No
                            </TableCell>

                            <TableCell>
                                Block
                            </TableCell>

                            <TableCell>
                                Owner Name
                            </TableCell>

                            <TableCell>
                                Mobile
                            </TableCell>

                            <TableCell>
                                Email
                            </TableCell>

                            <TableCell>
                                Status
                            </TableCell>

                            <TableCell>
                                Maintenance
                            </TableCell>

                            <TableCell>
                                Actions
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {residents.map(
                            (resident) => (

                            <TableRow
                                key={
                                    resident.resident_id
                                }
                            >

                                <TableCell>
                                    {resident.flat_no}
                                </TableCell>

                                <TableCell>
                                    {resident.block_name}
                                </TableCell>

                                <TableCell>
                                    {resident.owner_name}
                                </TableCell>

                                <TableCell>
                                    {resident.mobile_no}
                                </TableCell>

                                <TableCell>
                                    {resident.email}
                                </TableCell>

                                <TableCell>
                                    {resident.occupancy_status}
                                </TableCell>

                                <TableCell>
                                    ₹
                                    {resident.maintenance_amount}
                                </TableCell>

                                <TableCell>

                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() =>
                                            handleDelete(
                                                resident.resident_id
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </Paper>

            <Box
                sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "center"
                }}
            >

                <Pagination
                    count={totalPages}
                    page={page}
                    color="primary"
                    onChange={(
                        _,
                        value
                    ) => setPage(value)}
                />

            </Box>

        </Container>
    );
}

export default ResidentList;

import { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Pagination,
    Box,
    Button,
    MenuItem,
    TextField,
    CircularProgress,
    Alert
} from "@mui/material";

import type { Bill } from "../interfaces/Bill";

import { getBills } from "../services/billService";

function BillList() {

    const [bills, setBills] =
        useState<Bill[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [page, setPage] =
        useState(1);

    const [totalRecords, setTotalRecords] =
        useState(0);

    const [status, setStatus] =
        useState("");

    const [billMonth, setBillMonth] =
        useState(0);

    const [billYear, setBillYear] =
        useState(0);

    const pageSize = 10;

    const loadBills = async (
        currentPage: number
    ) => {

        try {

            setLoading(true);

            const response =
                await getBills(
                    currentPage,
                    pageSize,
                    status,
                    billMonth,
                    billYear
                );

            setBills(
                response.data.data
            );

            setTotalRecords(
                response.data.total_records
            );

        } catch (error) {

            console.error(
                "Error loading bills",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadBills(page);

    }, [page]);

    const clearFilters =
        async () => {

        setStatus("");
        setBillMonth(0);
        setBillYear(0);
        setPage(1);

        try {

            setLoading(true);

            const response =
                await getBills(
                    1,
                    pageSize,
                    "",
                    0,
                    0
                );

            setBills(
                response.data.data
            );

            setTotalRecords(
                response.data.total_records
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const currentPageAmount =
        bills.reduce(
            (
                total,
                bill
            ) => total + Number(bill.amount),
            0
        );

    const totalPages =
        Math.ceil(
            totalRecords / pageSize
        );

    return (

        <Container
            maxWidth="lg"
            sx={{ mt: 4 }}
        >

            <Typography
                variant="h4"
                gutterBottom
            >
                Bills List
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 3,
                    flexWrap: "wrap"
                }}
            >

                <TextField
                    select
                    label="Status"
                    value={status}
                    onChange={(e) =>
                        setStatus(
                            e.target.value
                        )
                    }
                    sx={{
                        minWidth: 180
                    }}
                >

                    <MenuItem value="">
                        All
                    </MenuItem>

                    <MenuItem value="PENDING">
                        Pending
                    </MenuItem>

                    <MenuItem value="PAID">
                        Paid
                    </MenuItem>

                    <MenuItem value="PARTIAL">
                        Partial
                    </MenuItem>

                </TextField>

                <TextField
                    label="Month"
                    type="number"
                    value={
                        billMonth || ""
                    }
                    onChange={(e) =>
                        setBillMonth(
                            Number(
                                e.target.value
                            )
                        )
                    }
                    sx={{ width: 120 }}
                />

                <TextField
                    label="Year"
                    type="number"
                    value={
                        billYear || ""
                    }
                    onChange={(e) =>
                        setBillYear(
                            Number(
                                e.target.value
                            )
                        )
                    }
                    sx={{ width: 140 }}
                />

                <Button
                    variant="contained"
                    onClick={() => {

                        setPage(1);

                        loadBills(1);

                    }}
                >
                    Search
                </Button>

                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={clearFilters}
                >
                    Clear Filters
                </Button>

            </Box>

            <Paper
                sx={{
                    p: 2,
                    mb: 2
                }}
            >

                <Typography>
                    Total Bills :
                    {" "}
                    <strong>
                        {totalRecords}
                    </strong>
                </Typography>

                <Typography>
                    Current Page Amount :
                    {" "}
                    <strong>
                        ₹
                        {currentPageAmount.toLocaleString()}
                    </strong>
                </Typography>

            </Paper>

            {loading ? (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 4
                    }}
                >

                    <CircularProgress />

                </Box>

            ) : bills.length === 0 ? (

                <Alert severity="info">

                    No bills found for the selected filters.

                </Alert>

            ) : (

                <TableContainer
                    component={Paper}
                >

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Bill ID
                                </TableCell>

                                <TableCell>
                                    Flat No
                                </TableCell>

                                <TableCell>
                                    Owner Name
                                </TableCell>

                                <TableCell>
                                    Month
                                </TableCell>

                                <TableCell>
                                    Year
                                </TableCell>

                                <TableCell>
                                    Amount
                                </TableCell>

                                <TableCell>
                                    Status
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {bills.map(
                                (
                                    bill
                                ) => (

                                <TableRow
                                    key={
                                        bill.bill_id
                                    }
                                >

                                    <TableCell>
                                        {bill.bill_id}
                                    </TableCell>

                                    <TableCell>
                                        {bill.flat_no}
                                    </TableCell>

                                    <TableCell>
                                        {bill.owner_name}
                                    </TableCell>

                                    <TableCell>
                                        {bill.bill_month}
                                    </TableCell>

                                    <TableCell>
                                        {bill.bill_year}
                                    </TableCell>

                                    <TableCell>
                                        ₹
                                        {Number(
                                            bill.amount
                                        ).toLocaleString()}
                                    </TableCell>

                                    <TableCell>
                                        {bill.status}
                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </TableContainer>

            )}

            {totalPages > 1 && (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 3
                    }}
                >

                    <Pagination
                        count={totalPages}
                        page={page}
                        color="primary"
                        onChange={(
                            _event,
                            value
                        ) =>
                            setPage(value)
                        }
                    />

                </Box>

            )}

        </Container>

    );

}

export default BillList;

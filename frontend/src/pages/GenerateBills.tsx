import { useState } from "react";

import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    Grid
} from "@mui/material";

import {
    generateBills
} from "../services/billService";

function GenerateBills() {

    const currentDate =
        new Date();

    const [billMonth, setBillMonth] =
        useState(
            currentDate.getMonth() + 1
        );

    const [billYear, setBillYear] =
        useState(
            currentDate.getFullYear()
        );

    const [success, setSuccess] =
        useState("");

    const [error, setError] =
        useState("");

    const handleGenerate =
        async () => {

        try {

            const response =
                await generateBills(
                    billMonth,
                    billYear
                );

            setSuccess(
                response.data.message
            );

            setError("");

        } catch (err: any) {

            console.error(err);

            setError(
                err?.response?.data?.detail
                || "Unable to generate bills"
            );

            setSuccess("");

        }
    };

    return (

        <Container
            maxWidth="sm"
            sx={{ mt: 4 }}
        >

            <Paper
                sx={{
                    p: 4
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Generate Monthly Bills
                </Typography>

                {success && (

                    <Alert
                        severity="success"
                        sx={{ mb: 2 }}
                    >
                        {success}
                    </Alert>

                )}

                {error && (

                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>

                )}

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={6}>

                        <TextField
                            label="Month"
                            type="number"
                            fullWidth
                            value={billMonth}
                            onChange={(e) =>
                                setBillMonth(
                                    Number(e.target.value)
                                )
                            }
                            inputProps={{
                                min: 1,
                                max: 12
                            }}
                        />

                    </Grid>

                    <Grid size={6}>

                        <TextField
                            label="Year"
                            type="number"
                            fullWidth
                            value={billYear}
                            onChange={(e) =>
                                setBillYear(
                                    Number(e.target.value)
                                )
                            }
                        />

                    </Grid>

                    <Grid size={12}>

                        <Button
                            variant="contained"
                            fullWidth
                            onClick={
                                handleGenerate
                            }
                        >
                            Generate Bills
                        </Button>

                    </Grid>

                </Grid>

            </Paper>

        </Container>

    );
}

export default GenerateBills;

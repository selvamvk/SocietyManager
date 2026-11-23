import { useEffect, useState } from "react";

import {
    Container,
    Paper,
    Typography,
    TextField,
    Grid,
    Button,
    MenuItem,
    Alert
}
from "@mui/material";

import {
    useNavigate,
    useParams
}
from "react-router-dom";

import type {
    Resident
}
from "../interfaces/Resident";

import {
    getResidentById,
    updateResident
}
from "../services/residentService";

function EditResident() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [success, setSuccess] =
        useState("");

    const [error, setError] =
        useState("");

    const [resident, setResident] =
        useState<Resident>({
            society_id: 1,
            flat_no: "",
            block_name: "",
            owner_name: "",
            mobile_no: "",
            email: "",
            occupancy_status: "OWNER",
            maintenance_amount: 2500
        });

    useEffect(() => {

        loadResident();

    }, []);

    const loadResident = async () => {

        try {

            const response =
                await getResidentById(
                    Number(id)
                );

            setResident(
                response.data
            );

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load resident"
            );
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setResident({
            ...resident,
            [e.target.name]:
                e.target.value
        });

    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            await updateResident(
                Number(id),
                resident
            );

            setSuccess(
                "Resident updated successfully"
            );

            setTimeout(() => {

                navigate("/");

            }, 1000);

        } catch (err: any) {

                console.error("Update Error:", err);

                console.log(
                    "Response:",
                    err?.response?.data
                );

                setError(
                    JSON.stringify(
                        err?.response?.data
                    )
                );
            }

    };

    return (

        <Container maxWidth="md">

            <Paper
                sx={{
                    p: 4,
                    mt: 4
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Edit Resident
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

                <form
                    onSubmit={handleSubmit}
                >

                    <Grid
                        container
                        spacing={2}
                    >

                        <Grid size={6}>
                            <TextField
                                fullWidth
                                label="Flat No"
                                value={resident.flat_no}
                                disabled
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                fullWidth
                                label="Block"
                                value={resident.block_name}
                                disabled
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                name="owner_name"
                                label="Owner Name"
                                value={resident.owner_name}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                fullWidth
                                name="mobile_no"
                                label="Mobile Number"
                                value={resident.mobile_no}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                value={resident.email}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                select
                                fullWidth
                                name="occupancy_status"
                                label="Occupancy Status"
                                value={resident.occupancy_status}
                                onChange={handleChange}
                            >
                                <MenuItem value="OWNER">
                                    OWNER
                                </MenuItem>

                                <MenuItem value="TENANT">
                                    TENANT
                                </MenuItem>

                                <MenuItem value="VACANT">
                                    VACANT
                                </MenuItem>

                            </TextField>
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                fullWidth
                                type="number"
                                name="maintenance_amount"
                                label="Maintenance Amount"
                                value={resident.maintenance_amount}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={12}>

                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Update
                            </Button>

                            <Button
                                variant="outlined"
                                sx={{ ml: 2 }}
                                onClick={() =>
                                    navigate("/")
                                }
                            >
                                Cancel
                            </Button>

                        </Grid>

                    </Grid>

                </form>

            </Paper>

        </Container>
    );
}

export default EditResident;

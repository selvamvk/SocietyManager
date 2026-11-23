import { useState } from "react";

import {
    Container,
    Paper,
    Typography,
    TextField,
    Grid,
    Button,
    MenuItem,
    Alert
} from "@mui/material";

import type {
    Resident
} from "../interfaces/Resident";

import {
    createResident
} from "../services/residentService";

import {
    useNavigate
} from "react-router-dom";

function AddResident() {

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

        setSuccess("");
        setError("");

        try {

            await createResident(
                resident
            );

            setSuccess(
                "Resident added successfully"
            );

            setTimeout(() => {
                navigate("/");
            }, 1000);

            setResident({
                society_id: 1,
                flat_no: "",
                block_name: "",
                owner_name: "",
                mobile_no: "",
                email: "",
                occupancy_status: "OWNER",
                maintenance_amount: 2500
            });

        } catch (err) {

            setError(
                "Unable to save resident"
            );

            console.error(err);

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
                    Add Resident
                </Typography>

                {success &&

                    <Alert
                        severity="success"
                        sx={{ mb: 2 }}
                    >
                        {success}
                    </Alert>
                }

                {error &&

                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                }

                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    <Grid
                        container
                        spacing={2}
                    >

                        <Grid size={6}>

                            <TextField
                                fullWidth
                                label="Flat No"
                                name="flat_no"
                                value={
                                    resident.flat_no
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </Grid>

                        <Grid size={6}>

                            <TextField
                                fullWidth
                                label="Block"
                                name="block_name"
                                value={
                                    resident.block_name
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </Grid>

                        <Grid size={12}>

                            <TextField
                                fullWidth
                                label="Owner Name"
                                name="owner_name"
                                value={
                                    resident.owner_name
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </Grid>

                        <Grid size={6}>

                            <TextField
                                fullWidth
                                label="Mobile Number"
                                name="mobile_no"
                                value={
                                    resident.mobile_no
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </Grid>

                        <Grid size={6}>

                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={
                                    resident.email
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </Grid>

                        <Grid size={6}>

                            <TextField
                                select
                                fullWidth
                                label="Occupancy Status"
                                name="occupancy_status"
                                value={
                                    resident.occupancy_status
                                }
                                onChange={
                                    handleChange
                                }
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
                                label="Maintenance Amount"
                                name="maintenance_amount"
                                value={
                                    resident.maintenance_amount
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </Grid>

                        <Grid size={12}>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                            >
                                Save Resident
                            </Button>

                            <Button
                                variant="outlined"
                                sx={{ ml: 2 }}
                                onClick={() => navigate("/")}
                            >
                                Back
                            </Button>

                        </Grid>

                    </Grid>

                </form>

            </Paper>

        </Container>

    );

}

export default AddResident;

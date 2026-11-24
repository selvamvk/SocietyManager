import {
    Container,
    Grid,
    Paper,
    Typography
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import {
    getDashboardSummary
} from "../services/dashboardService";

function Dashboard() {

    const [summary, setSummary] =
        useState({
            total_residents: 0,
            active_residents: 0,
            owner_count: 0,
            tenant_count: 0,
            vacant_count: 0,
            total_bills: 0,
            outstanding_amount: 0
        });

    useEffect(() => {

        loadSummary();

    }, []);

    const loadSummary = async () => {

        try {

            const response =
                await getDashboardSummary();

            console.log(
                "Dashboard Summary",
                response.data
            );

            setSummary(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <Container
            maxWidth="lg"
            sx={{ mt: 4 }}
        >

            <Typography
                variant="h4"
                gutterBottom
            >
                Dashboard
            </Typography>

            <Grid
                container
                spacing={3}
            >

                <Grid size={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">
                            Total Residents
                        </Typography>

                        <Typography variant="h4">
                            {summary.total_residents}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">
                            Active Residents
                        </Typography>

                        <Typography variant="h4">
                            {summary.active_residents}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">
                            Owner Occupied
                        </Typography>

                        <Typography variant="h4">
                            {summary.owner_count}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">
                            Tenant Occupied
                        </Typography>

                        <Typography variant="h4">
                            {summary.tenant_count}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">
                            Vacant Flats
                        </Typography>

                        <Typography variant="h4">
                            {summary.vacant_count}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">
                            Outstanding
                        </Typography>

                        <Typography variant="h4">
                            ₹{summary.outstanding_amount}
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

        </Container>

    );
}

export default Dashboard;

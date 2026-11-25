import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box
} from "@mui/material";

import {
    useNavigate,
    useLocation
} from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    const location = useLocation();

    const isActive = (path: string) =>
        location.pathname === path;

    return (

        <AppBar position="static">

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        fontWeight: "bold"
                    }}
                >
                    SocietyManager Lite
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1
                    }}
                >

                    <Button
                        color="inherit"
                        variant={
                            isActive("/")
                                ? "outlined"
                                : "text"
                        }
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Residents
                    </Button>

                    <Button
                        color="inherit"
                        onClick={() =>
                            navigate("/add-resident")
                        }
                    >
                        Add Resident
                    </Button>

                    <Button
                        color="inherit"
                        variant={
                            isActive("/dashboard")
                                ? "outlined"
                                : "text"
                        }
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        Dashboard
                    </Button>

                    <Button
                        color="inherit"
                        onClick={() => navigate("/bills")}
                    >
                        Bills
                    </Button>

                    <Button
                        color="inherit"
                        onClick={() =>
                            navigate("/generate-bills")
                        }
                    >
                        Generate Bills
                    </Button>

                    <Button
                        color="inherit"
                    >
                        Payments
                    </Button>

                    <Button
                        color="inherit"
                    >
                        Reports
                    </Button>

                </Box>

            </Toolbar>

        </AppBar>

    );
}

export default Header;

import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Header from "./components/Header";

import ResidentList from "./pages/ResidentList";
import AddResident from "./pages/AddResident";
import EditResident from "./pages/EditResident";
import Dashboard from "./pages/Dashboard";

function App() {

    return (
        <>

            <Header />
        
            <Routes>

                <Route
                    path="/"
                    element={<ResidentList />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/add-resident"
                    element={<AddResident />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

                <Route
                    path="/edit-resident/:id"
                    element={<EditResident />}
                />

            </Routes>
        </>

    );

}

export default App;

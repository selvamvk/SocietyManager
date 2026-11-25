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
import BillList from "./pages/BillList";
import GenerateBills from "./pages/GenerateBills";

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

                <Route
                    path="/bills"
                    element={<BillList />}
                />

                <Route
                    path="/generate-bills"
                    element={<GenerateBills />}
                />

            </Routes>
        </>

    );

}

export default App;

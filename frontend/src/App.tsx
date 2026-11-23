import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import ResidentList from "./pages/ResidentList";
import AddResident from "./pages/AddResident";
import EditResident from "./pages/EditResident";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<ResidentList />}
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

    );

}

export default App;

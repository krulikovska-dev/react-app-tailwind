import { Routes, Route } from "react-router-dom";
import ListDetail from "../components/ListDetail";
import Overview from "../components/Overview";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/detail/:listId" element={<ListDetail />} />
            <Route path="/" element={<Overview />} />
        </Routes>
    );
}

export default AppRoutes;
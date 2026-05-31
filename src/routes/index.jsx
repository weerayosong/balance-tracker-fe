import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
        ],
    },
]);

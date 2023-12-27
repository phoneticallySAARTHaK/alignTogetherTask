import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Page } from "./pages/Root/page";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Page,
    errorElement: "Error...",
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

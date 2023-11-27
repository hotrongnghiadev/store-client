import MainLayout from "../../layouts/admin/MainLayout";
import Dashboard from "../../pages/admin/Dashboard";
import Product from "../../pages/admin/Product";
import Brand from "../../pages/admin/Brand";
import Category from "../../pages/admin/Category";
import CreateProduct from "../../pages/admin/CreateProduct";
import HandleRole from "./HandleRole";

const privateRouter = [
  {
    element: <HandleRole />,
    children: [
      {
        path: "admin",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "product/list",
            element: <Product />,
          },
          {
            path: "product/create",
            element: <CreateProduct />,
          },
          {
            path: "brand",
            element: <Brand />,
          },
          {
            path: "category",
            element: <Category />,
          },
        ],
      },
    ],
  },
];

export default privateRouter;

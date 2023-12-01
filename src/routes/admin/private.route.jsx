import MainLayout from "../../layouts/admin/MainLayout";
import Dashboard from "../../pages/admin/Dashboard";
import ProductList from "../../pages/admin/ProductList";
import Brand from "../../pages/admin/Brand";
import Category from "../../pages/admin/Category";
import CreateProduct from "../../pages/admin/CreateProduct";
import UpdateProduct from "../../components/admin/UpdateProduct";
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
            element: <ProductList />,
          },
          {
            path: "product/create",
            element: <CreateProduct />,
          },
          {
            path: "product/update/:id",
            element: <UpdateProduct />,
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

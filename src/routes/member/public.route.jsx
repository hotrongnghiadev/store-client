import MainLayout from "../../layouts/member/MainLayout";
import Product from "../../pages/member/Product";
import Home from "../../pages/member/Home";
import News from "../../pages/member/News";
import About from "../../pages/member/About";
import Signin from "../../pages/member/Signin";
import Signup from "../../pages/member/Signup";
import ProductDetail from "../../components/ProductDetail";
import { Navigate } from "react-router-dom";

const publicRouter = [
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/product/:category/:slug",
        element: <ProductDetail />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/",
        element: <Navigate to="/product" />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
];

export default publicRouter;

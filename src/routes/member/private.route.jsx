import HandleRole from "./HandleRole";
import Cart from "../../pages/member/Cart";
import MainLayout from "../../layouts/member/MainLayout";

const privateRoute = [
  {
    element: <HandleRole />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
    ],
  },
];

export default privateRoute;

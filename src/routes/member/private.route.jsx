import HandleRole from "./HandleRole";
import Cart from "../../pages/member/Cart";
import MainLayout from "../../layouts/member/MainLayout";
import Checkout from "../../pages/member/Checkout";
import Order from "../../pages/member/Order";
import DetailOrder from "../../pages/member/DetailOrder";

const privateRoute = [
  {
    element: <HandleRole />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/checkout",
            element: <Checkout />,
          },
          {
            path: "/order",
            element: <Order />,
          },
          {
            path: "/detail-order/:id",
            element: <DetailOrder />,
          },
        ],
      },
    ],
  },
];

export default privateRoute;

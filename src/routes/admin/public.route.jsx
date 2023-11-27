import Signin from "../../pages/admin/Signin";

const publicRouter = [
  {
    path: "admin",
    children: [
      {
        path: "signin",
        element: <Signin />,
        children: [
          {
            path: ":invalid",
            element: <Signin />,
          },
        ],
      },
    ],
  },
];

export default publicRouter;

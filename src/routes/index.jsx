import { useRoutes } from "react-router-dom";
import adminRoutes from "./admin";
import memberRoutes from "./member";
import NotFound from "../components/NotFound";

const Routes = () => {
  let routes = [...adminRoutes, ...memberRoutes];
  routes = [
    ...routes,
    {
      path: "*",
      element: <NotFound />,
    },
  ];
  return useRoutes(routes);
};

export default Routes;

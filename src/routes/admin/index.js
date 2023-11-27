import privateRoute from "./private.route";
import publicRoute from "./public.route";

const routes = [...privateRoute, ...publicRoute];

export default routes;

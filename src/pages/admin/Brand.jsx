import Breadcrumbs from "../../components/Breadcrumbs";
import BrandList from "../../components/admin/BrandList";
import CreateBrand from "../../components/admin/CreateBrand";

const routes = [
  {
    path: "/admin",
    breadcrumb: "home",
  },
  {
    path: "/admin/brand",
    breadcrumb: "brand",
  },
];

const Brand = () => {
  return (
    <>
      <div className="w-full">
        <div className="mb-10">
          <h3 className="mb-2 text-2xl font-bold capitalize">brand</h3>
          <Breadcrumbs routes={routes} />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-5">
            <CreateBrand />
          </div>

          <div className="col-span-12 xl:col-span-7">
            <BrandList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Brand;

import React from "react";
import Icons from "./Icons";
import clsx from "clsx";
import CheckbokField from "./CheckboxField";
import { useForm } from "react-hook-form";
import Button from "./Button";
import brandApi from "../api/brand.api";
import categoryApi from "../api/category.api";
import { useDispatch, useSelector } from "react-redux";
import * as brandReducer from "../redux/brand.slice";
import * as categoryReducer from "../redux/category.slice";

const FilterProduct = (props) => {
  const { setQueries } = props;
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories);
  const { open, setOpen } = props;

  // function start
  const onSubmit = (data) => {
    for (const key in data) {
      data[key] = data[key].filter((el) => {
        if (el !== undefined && el !== "") return el;
      });
    }
    setQueries((prev) => ({ ...prev, ...data }));
    setOpen(false);
  };
  // function end

  const { control, handleSubmit } = useForm({
    defaultValues: {},
    mode: "onSubmit",
    shouldFocusError: false,
  });

  // effect start
  React.useEffect(() => {
    (async () => {
      await brandApi
        .getAll()
        .then((res) => {
          dispatch(brandReducer.set(res.data));
        })
        .catch((err) => console.log(err));
      await categoryApi
        .getAll()
        .then((res) => {
          dispatch(categoryReducer.set(res.data));
        })
        .catch((err) => console.log(err));
    })();
  }, []);
  // effect end

  return (
    <>
      <div
        className={clsx(
          "fixed left-0 right-0 top-0 z-99 h-screen w-full border-r bg-white p-8 shadow-md  lg:static lg:block lg:w-fit",
          { hidden: !open },
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-2 top-2 rounded-md p-2 text-red-500 hover:bg-slate-200 lg:hidden"
        >
          <Icons.IconClose className="text-2xl" />
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-12">
            {/* brand start */}
            <div className="flex  flex-col gap-4">
              <h3 className="text-xl font-bold">Brands</h3>
              {brands.map((el, index) => {
                return (
                  <CheckbokField
                    key={index}
                    control={control}
                    label={el.name}
                    value={el.id}
                    fieldId={`brandId[${index}]`}
                  />
                );
              })}
            </div>
            {/* brand end */}

            {/* category start */}
            <h3 className="text-xl font-bold">Category</h3>
            <div className="flex  flex-col gap-4">
              {categories.map((el, index) => {
                return (
                  <CheckbokField
                    key={el.id}
                    control={control}
                    label={el.name}
                    value={el.id}
                    fieldId={`categoryId[${index}]`}
                  />
                );
              })}
            </div>
            {/* category end */}

            <div>
              <Button type="submit" className="whitespace-nowrap">
                Proceed Filter
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FilterProduct;

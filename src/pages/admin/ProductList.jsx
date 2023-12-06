import React from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { formatNumber } from "../../utils/helpers";
import * as productReducer from "../../redux/product.slice";
import productApi from "../../api/product.api";
import Breadcrumbs from "../../components/Breadcrumbs";
import Button from "../../components/Button";
import Icons from "../../components/Icons";

const routes = [
  {
    path: "/admin",
    breadcrumb: "home",
  },
  {
    path: "/admin/product",
    breadcrumb: "product",
  },
  {
    path: "/admin/product/list",
    breadcrumb: "product list",
  },
];

const Product = () => {
  // hook start
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const [isCheckAll, setIsCheckAll] = React.useState(false);
  const [check, setCheck] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const formRef = React.useRef();
  // hook end

  // function start

  const handleCheckAll = (e) => {
    setIsCheckAll(e.target.checked);
    setCheck(products.map((el) => el.id));
    setValue(
      "ids",
      products.map((el) => el.id),
    );
    if (isCheckAll) {
      setCheck([]);
      setValue("ids", []);
    }
  };
  const handleCheck = (e) => {
    const { value, checked } = e.target;
    setCheck((prev) => [...prev, value]);
    if (!checked) setCheck(check.filter((el) => el !== value));
  };

  const handleDelMany = async (data) => {
    await productApi
      .delMany(data)
      .then((res) => {
        toast.success(
          `You have successfully deleted the ${res.data.deletedCount} checked items`,
        );
        dispatch(productReducer.delMany(check));
        // reset check after delete``
        setIsCheckAll(false);
        setCheck([]);
      })
      .catch((err) => console.log(err));
  };

  const handleDelOne = async (id) => {
    console.log(id);
    await productApi
      .delMany({ ids: id })
      .then((res) => {
        toast.success(
          `You have successfully deleted the ${res.data.deletedCount} checked items`,
        );
        dispatch(productReducer.delMany(id));
      })
      .catch((err) => console.log(err));
  };
  const onSubmit = (data) => {
    if (
      window.confirm(
        `Are you sure you want to delete the ${check.length} checked brands?`,
      )
    ) {
      handleDelMany(data);
    }
  };
  // function end

  // react-hook-form start
  const { handleSubmit, register, setValue } = useForm({
    shouldFocusError: false,
    defaultValues: {
      ids: [],
    },
  });

  // react-hook-form end

  // effect start
  React.useEffect(() => {
    setLoading(true);
    (async () => {
      await productApi
        .getAll()
        .then((res) => {
          dispatch(productReducer.set(res.data.products));
          setLoading(false);
        })
        .catch((err) => console.log(err));
    })();
  }, []);
  React.useEffect(() => {
    if (products.length > 0) {
      if (products.length === check.length) setIsCheckAll(true);
      else setIsCheckAll(false);
    } else setIsCheckAll(false);
  }, [check]);
  // effect end

  return (
    <>
      <div className="w-full">
        <div className="mb-10">
          <Breadcrumbs routes={routes} />
        </div>
        <div>
          <div className="h-full  gap-4 rounded-md bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold capitalize">product list</h3>
              <Button
                type="submit"
                className={clsx("bg-red-500 transition-opacity", {
                  "pointer-events-none opacity-0":
                    check.length < 1 || products.length < 1,
                })}
                onClick={() => formRef.current.requestSubmit()}
              >
                <Icons.IconDeleteAlertOutline className="text-2xl" />
              </Button>
            </div>
            {/* product list start */}
            <div className="overflow-x-auto">
              <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                <table className="w-full">
                  <thead>
                    <tr
                      role="row"
                      className="border-b border-t border-slate-100"
                    >
                      <th className="p-2 text-start">
                        <div className="">
                          <input
                            type="checkbox"
                            className=" accent-pink-500"
                            name="selectAll"
                            checked={isCheckAll}
                            onChange={(e) => handleCheckAll(e)}
                          />
                        </div>
                      </th>
                      <th className="whitespace-nowrap p-2 text-start">
                        product
                      </th>
                      <th className="whitespace-nowrap p-2 text-start">
                        price
                      </th>
                      <th className="whitespace-nowrap p-2 text-start">sold</th>
                      <th className="whitespace-nowrap p-2 text-start">
                        inventory
                      </th>
                      <th className="whitespace-nowrap p-2 text-start">
                        status
                      </th>
                      <th className="whitespace-nowrap p-2 text-start">
                        action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((el, index) => (
                      <tr role="row" key={index} className="border-b">
                        <td className="p-2">
                          <div>
                            <input
                              {...register("ids")}
                              type="checkbox"
                              value={el.id}
                              className=" accent-blue-500"
                              onChange={(e) => {
                                handleCheck(e);
                              }}
                              checked={check.includes(el.id)}
                            />
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center">
                            <div className="mr-1 h-12 w-12 rounded-md bg-slate-100 p-2">
                              <img src={el.thumb[0].path} />
                            </div>
                            <span className="whitespace-nowrap">{el.name}</span>
                          </div>
                        </td>
                        <td className="p-2">{formatNumber(el.price)}₫</td>
                        <td className="p-2">0</td>
                        <td className="p-2">{el.inventory}</td>
                        <td className="p-2">
                          <span
                            className={clsx(
                              "whitespace-nowrap rounded-md bg-red-100/50  px-3 py-1 text-end text-xs font-medium leading-none text-red-500",
                              {
                                hidden: el.status,
                              },
                            )}
                          >
                            in active
                          </span>
                          <span
                            className={clsx(
                              "whitespace-nowrap rounded-md bg-green-100/50  px-3 py-1 text-end text-xs font-medium leading-none text-green-500",
                              {
                                hidden: !el.status,
                              },
                            )}
                          >
                            active
                          </span>
                        </td>
                        <td className="p-2">
                          <div className="whitespace-nowrap text-gray-400">
                            <button
                              onClick={() => {
                                navigate(`../../admin/product/update/${el.id}`);
                              }}
                              className="mr-2"
                              type="button"
                            >
                              <Icons.IconEdit className="text-xl text-blue-500" />
                            </button>
                            <button className="mr-2" type="button">
                              <Icons.IconDelete
                                className="text-xl text-red-500"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `Are you sure you want to delete ${el.name} ?`,
                                    )
                                  ) {
                                    handleDelOne(el.id);
                                  }
                                }}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </form>
              {products.length < 1 && loading && (
                <div className="mt-4 flex items-center justify-center gap-4 font-bold text-orange-500">
                  <Icons.IconLoading className="animate-spin text-3xl " />
                  <span className="uppercase">processing...</span>
                </div>
              )}
              {!loading && products.length < 1 && (
                <div className="mt-4 flex items-center justify-center gap-4 font-bold text-orange-500">
                  <span className="uppercase">empty product list</span>
                </div>
              )}
            </div>
            {/* product list end */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

import {
  useSearchParams,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";

import * as productReducer from "../../redux/product.slice";
import * as memberReducer from "../../redux/member.slice";
import productApi from "../../api/product.api";
import Icons from "../../components/Icons";
import React from "react";
import { formatNumber, paginationArr, showStar } from "../../utils/helpers";
import clsx from "clsx";
import userApi from "../../api/user.api";
import { getCurrent } from "../../redux/thunk/member.thunk";
import { toast } from "react-toastify";
import FilterProduct from "../../components/FilterProduct";
import SelectField from "../../components/SelectField";
import { useForm } from "react-hook-form";

const sortOptions = [
  { label: "Prices  increase ", value: "price" },
  { label: "Prices decrease", value: "-price" },
  { label: "Names  a-z", value: "name" },
  { label: "Names  z-a", value: "-name" },
  { label: "Latest", value: "createAt" },
  { label: "Oldest", value: "-createAt" },
];

const Product = () => {
  // hook start
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const member = useSelector((state) => state.member);
  const [loading, setLoading] = React.useState(true);
  const [count, setCount] = React.useState(0);
  const [arr, setArr] = React.useState([]);
  const [isFilter, setIsFilter] = React.useState(false);
  const [queries, setQueries] = React.useState({ page: 1, sort: "createAt" });
  // hook end

  // function start
  const handleAddCart = async (product) => {
    if (member.data) {
      userApi
        .updateCart({ productId: product.id })
        .then((res) => {
          toast.success("The product has been added to cart");
          dispatch(memberReducer.addCart(product));
        })
        .catch((err) => console.log(err));
    } else toast.info("Required signin");
  };

  const handleResultInfo = () => {
    const page = queries.page;
    const limit = import.meta.env.VITE_BASE_PAGINATION_SIZE;
    const start = count ? (page - 1) * limit + 1 : 0;
    let end = (page - 1) * limit + Number(limit);
    const floor = Math.floor(count / limit);
    if (!floor) end = count;
    if (page === floor - 1 && count % limit !== 0) end = count;

    return `Showing ${start} - ${end} of ${count} results`;
  };
  const onSubmit = (data) => {
    setQueries((prev) => ({ ...prev, ...data }));
  };
  // function end

  // react-hook-form start
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      sort: "createAt",
    },
  });

  // react-hook-form end

  // effect start
  React.useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const arr = [];
    for (let i of param) arr.push(i.join("="));
    const paramQueries = queryString.parse(arr.join("&"), {
      arrayFormat: "bracket",
    });
    (async () => {
      const res = await productApi
        .filter(paramQueries)
        .catch((err) => console.log(err));
      dispatch(productReducer.set(res.data.data));
      setArr(paginationArr(res.data.count, 1));
      setCount(res.data.count);
      setLoading(false);
    })();
  }, [params]);

  React.useEffect(() => {
    navigate({
      pathname: `/product/`,
      search: queryString.stringify(queries, { arrayFormat: "bracket" }),
    });
  }, [queries]);

  React.useEffect(() => {
    if (!member.data) {
      dispatch(getCurrent());
    }
  }, []);

  React.useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, [watch, handleSubmit]);

  // effect end
  return (
    <>
      <div className="">
        {/* filter start */}

        <div className="flex items-center justify-between bg-white p-4 text-sm">
          <button
            onClick={() => setIsFilter(!isFilter)}
            className="rounded-md bg-primary p-2 text-white lg:hidden"
          >
            <Icons.IconFilter className="text-2xl" />
          </button>
          <div className="flex items-center gap-4">
            <div>
              <span>{handleResultInfo()}</span>
            </div>
          </div>
        </div>

        {/* filter end */}

        <div className="mt-4 bg-white lg:flex">
          <FilterProduct
            open={isFilter}
            setQueries={setQueries}
            setOpen={setIsFilter}
          />
          <div>
            <div className="px-8 pt-2">
              <form onChange={handleSubmit(onSubmit)}>
                <SelectField
                  control={control}
                  label="Sort by"
                  fieldId="sort"
                  options={sortOptions}
                  className="mt-0"
                />
              </form>
            </div>
            <ul className="mx-[-20px] flex flex-wrap p-8">
              {products.map((el, index) => {
                return (
                  <li key={index} className="mb-6 px-[20px] sm:w-1/2 md:w-1/4">
                    <div className="flex h-full flex-col justify-between rounded-md border bg-white p-[20px_10px_20px] drop-shadow">
                      <Link
                        to={`/product/${el.categoryId.name.toLowerCase()}/${
                          el.slug
                        }`}
                        className="group cursor-pointer"
                      >
                        <div className="mb-4 ">
                          <img
                            src={el.thumb[0].path}
                            className="relative transition-transform group-hover:translate-y-[-8px]"
                            alt="Image error!"
                          />
                        </div>
                      </Link>
                      <div>
                        {/* price */}
                        <div>
                          <h3 className="capitalize">{el.name}</h3>
                          <span className="text-red-600">
                            {formatNumber(el.price)} VNĐ
                          </span>
                        </div>
                        {/* desc */}
                        <div>
                          {el.desc?.map((el, index) => (
                            <div key={index}>
                              <span className="capitalize">{el.name}: </span>
                              <span className="capitalize">{el.content}</span>
                            </div>
                          ))}
                        </div>
                        {/* show star */}
                        {el.starAvg > 0 && (
                          <div className="mt-4 flex justify-center">
                            {showStar(el.starAvg).map((el, index) => (
                              <el.icon
                                key={index}
                                className="text-xl text-orange-600"
                              />
                            ))}
                          </div>
                        )}

                        {/*  */}
                        {/* action */}
                        <div className="mt-2 flex h-[40px] justify-around">
                          {(() => {
                            if (member.data) {
                              return member.data.cart.some((cartEl) => {
                                return cartEl.product.id === el.id.toString();
                              }) ? (
                                <button
                                  className={clsx(
                                    "hover:bg-whiten cursor-not-allowed rounded-md px-4 py-2",
                                  )}
                                  type="button"
                                >
                                  <Icons.IconBagCheckFill className="text-2xl text-orange-500" />
                                </button>
                              ) : (
                                <button
                                  className={clsx(
                                    "rounded-md px-4 py-2 hover:text-orange-500",
                                  )}
                                  type="button"
                                  onClick={() => handleAddCart(el)}
                                >
                                  <Icons.IconBagPlusFill className="text-2xl" />
                                </button>
                              );
                            } else {
                              return (
                                <button
                                  className={clsx(
                                    "hover:bg-whiten rounded-md px-4 py-2",
                                  )}
                                  type="button"
                                  onClick={() => handleAddCart(el)}
                                >
                                  <Icons.IconBxsCartAdd className="text-4xl" />
                                </button>
                              );
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
              {products.length < 1 && loading && (
                <div className="mt-4 flex h-12  w-full items-center justify-center gap-4 font-bold text-orange-500">
                  <Icons.IconLoading className="animate-spin text-3xl " />
                  <span className="uppercase">processing...</span>
                  <span className="uppercase">
                    Vui lòng chờ lâu một tý do sài đồ free, cám ơn ạ!
                  </span>
                </div>
              )}
              {!count && !loading && (
                <div className="w-full text-center text-2xl font-bold text-orange-500">
                  Không tìm sản phẩm phù hợp
                </div>
              )}
            </ul>
            {/* pagination start */}

            <div className="flex justify-center pb-8 ">
              <ul className="list-style-none flex gap-4">
                {arr.map((el, index) => {
                  if (el === "DOTS") el = "...";
                  return (
                    <li key={index}>
                      <Link
                        onClick={() => {
                          if (Number(el))
                            setQueries((prev) => ({ ...prev, page: el }));
                        }}
                        className={clsx(
                          "relative block rounded border border-slate-400 bg-transparent px-3 py-1.5 text-base text-neutral-600 transition-all duration-100 hover:bg-slate-300",
                          {
                            "cursor-default hover:!bg-transparent":
                              el === "...",
                            "pointer-events-none border !text-red-600 hover:!bg-white":
                              el === queries.page,
                          },
                        )}
                        href="#"
                      >
                        {el}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* pagination end */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

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

const Product = () => {
  // hook start
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const member = useSelector((state) => state.member);
  const [arr, setArr] = React.useState([]);
  const [isFilter, setIsFilter] = React.useState(false);
  // console.log(member);
  const [queries, setQueries] = React.useState({ page: 1 });
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
    }
  };
  // function end

  // effect start
  React.useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const arr = [];
    for (let i of param) arr.push(i.join("="));
    const paramQueries = queryString.parse(arr.join("&"), {
      arrayFormat: "bracket",
    });
    (async function () {
      await productApi
        .filter(paramQueries)
        .then((res) => {
          dispatch(productReducer.set(res.data.data));
          setArr(paginationArr(res.data.count, 1));
        })
        .catch((err) => console.log(err));
    })();
  }, [params]);

  React.useEffect(() => {
    navigate({
      pathname: `/product/`,
      search: queryString.stringify(queries, { arrayFormat: "bracket" }),
    });
  }, [queries]);

  React.useEffect(() => {
    dispatch(getCurrent());
  }, []);

  // effect end
  return (
    <>
      <div className="">
        {/* filter start */}
        <FilterProduct open={isFilter} setOpen={setIsFilter} />
        <div className="flex items-center justify-between bg-white p-4 text-sm">
          <button
            onClick={() => setIsFilter(!isFilter)}
            className="rounded-md bg-primary p-2 text-white"
          >
            <Icons.IconFilter className="text-2xl" />
          </button>
          <div className="flex items-center gap-4">
            <div>
              <span>Showing 1 - 5 of 66 results</span>
              <div className="flex space-x-2">
                <span>Sort by:</span>
                <span className="text-slate-500 underline">Default</span>
                <Icons.IconDown className="text-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* filter end */}

        <div className="mt-4 bg-white">
          <ul className="mx-[-20px] mt-8 flex flex-wrap p-8">
            {products.map((el, index) => (
              <li
                key={index}
                className="mb-6 w-1/2 px-[20px] md:w-1/3 lg:w-1/4"
              >
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
                        {showStar(el.startAvg).map((el, index) => (
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
                              <Icons.IconCartCheckFill className="text-lg text-orange-600" />
                            </button>
                          ) : (
                            <button
                              className={clsx(
                                "hover:bg-whiten rounded-md px-4 py-2",
                              )}
                              type="button"
                              onClick={() => handleAddCart(el)}
                            >
                              <Icons.IconBxsCartAdd className="text-2xl" />
                            </button>
                          );
                        } else {
                          return (
                            <button
                              className={clsx(
                                "hover:bg-whiten rounded-md px-4 py-2",
                              )}
                              type="button"
                              onClick={() => handleAddCart(el.id)}
                            >
                              <Icons.IconBxsCartAdd className="text-2xl" />
                            </button>
                          );
                        }
                      })()}
                    </div>
                  </div>
                </div>
              </li>
            ))}
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
                          "cursor-default hover:!bg-transparent": el === "...",
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
    </>
  );
};

export default Product;

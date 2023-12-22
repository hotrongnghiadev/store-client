import React from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { formatNumber } from "../../utils/helpers";
import Button from "../../components/Button";
import Icons from "../../components/Icons";
import userApi from "../../api/user.api";
import { getCurrent } from "../../redux/thunk/member.thunk";
import * as memberReducer from "../../redux/member.slice";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = useSelector((state) => state.member);
  // function start
  const updateQuantity = async (id, inventory, quantity) => {
    if (quantity > inventory) {
      toast.info(`Currently the store only has ${inventory} products left`);
      return;
    }
    if (quantity < 1) return;
    dispatch(memberReducer.updateQuantity({ id, quantity }));
  };

  const delElCart = (id) => {
    dispatch(memberReducer.delElCart(id));
  };

  const saveCart = async () => {
    const cart = member.data.cart.map((el) => ({
      product: el.product.id,
      quantity: el.quantity,
    }));
    await userApi
      .updateCart({ cart })
      .then((res) => toast.success("Save cart successfully"));
  };

  // function end

  React.useEffect(() => {
    dispatch(getCurrent());
  }, []);

  return (
    <>
      <div className=" flex flex-wrap  whitespace-nowrap bg-white">
        <div className="w-full overflow-x-auto">
          <table
            className={clsx("w-full table-auto  text-sm", {
              hidden: member.data.cart.length === 0,
            })}
          >
            <thead>
              <tr role="row" className="border border-gray-100">
                <th className="p-4 text-start">Product</th>
                <th className="p-4 text-start">Price</th>
                <th className="p-4 text-start">Quantity</th>
                <th className="p-4 text-start">Total</th>
                <th className="p-4 text-start">Delete</th>
              </tr>
            </thead>
            <tbody>
              {member.data.cart.map((el, index) => {
                return (
                  <tr role="row" key={index} className="">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12">
                          {typeof el.product === "object" && (
                            <img src={el.product.thumb[0].path} />
                          )}
                        </div>
                        <span>{el.product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-red-600">
                      {formatNumber(el.product.price)} VNĐ
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(
                              el.id,
                              el.product.inventory,
                              el.quantity - 1,
                            )
                          }
                        >
                          <Icons.IconMinus className="text-xl text-red-600" />
                        </button>
                        <span className="px-3">{el.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              el.id,
                              el.product.inventory,
                              el.quantity + 1,
                            )
                          }
                        >
                          <Icons.IconPlus className="text-xl text-green-600" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-red-600">
                      {formatNumber(+el.product.price * +el.quantity)} VNĐ
                    </td>
                    <td className="p-4">
                      <div className="whitespace-nowrap text-gray-400">
                        <button
                          className="mr-2"
                          type="button"
                          onClick={() => delElCart(el.id)}
                        >
                          <Icons.IconDelete className="text-2xl text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* cart empty start */}
        <div
          className={clsx("w-full p-8 text-center", {
            hidden: member.data.cart.length > 0,
          })}
        >
          <h3 className="text-4xl font-bold">
            Yourt Cart Is <span className="text-red-500 ">Empty</span>
          </h3>
        </div>
        {/* cart empty end */}

        {/* action cart start */}
        <div className="mt-2 flex w-full justify-between gap-8 p-4 ">
          <div></div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-8">
              <Button className="" onClick={() => navigate("/product")}>
                Continue Shopping
              </Button>
              <Button className=" " onClick={() => saveCart()}>
                Save Cart
              </Button>
            </div>

            {/*  */}
            <div className="mt-8 w-full border border-slate-200 bg-white">
              <div className="  p-4">
                <div> </div>
                <div className="text-base">
                  <span className="">Total cart: </span>
                  <span className=" font-bold text-red-600">
                    {formatNumber(
                      member.data.cart.reduce((total, el) => {
                        return total + +el.product.price * +el.quantity;
                      }, 0),
                    )}{" "}
                    VNĐ
                  </span>
                  <Button className="mt-4 w-full ">
                    <div className="w-full text-center">
                      <Link to="/checkout">Proceed Checkout</Link>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* action cart end */}
      </div>
    </>
  );
};

export default Cart;

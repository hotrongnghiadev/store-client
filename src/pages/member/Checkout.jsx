import React from "react";
import { Tilt } from "react-tilt";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import bgPayment from "../../assets/images/online-payment.svg";
import Paypal from "../../components/member/Paypal";
import { getCurrent } from "../../redux/thunk/member.thunk";
import { formatNumber } from "../../utils/helpers";
import clsx from "clsx";

const reactTiltOptions = {
  reverse: false, // reverse the tilt direction
  max: 30, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.2, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [total, setTotal] = React.useState(0);
  const member = useSelector((state) => state.member);

  React.useEffect(() => {
    dispatch(getCurrent());
    setTotal(
      member.data.cart.reduce((total, el) => {
        return total + +el.product.price * +el.quantity;
      }, 0),
    );
  }, []);
  return (
    <>
      <div className="flex w-full">
        <div className="w-full">
          <div className="flex flex-col">
            <div className="w-full overflow-x-auto whitespace-nowrap border border-slate-200 bg-white">
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
                            <span className="px-3">{el.quantity}</span>
                          </div>
                        </td>
                        <td className="p-4 font-bold text-red-600">
                          {formatNumber(+el.product.price * +el.quantity)} VNĐ
                        </td>
                        <td className="p-4">
                          <div className="whitespace-nowrap text-gray-400"></div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <div className="hidden w-2/5 lg:block">
                <Tilt options={reactTiltOptions}>
                  <img src={bgPayment} alt="bgLogin" />
                </Tilt>
              </div>
              <div className="mt-8 flex w-3/5 flex-col justify-end whitespace-nowrap">
                <div className="mb-8 flex justify-center text-base">
                  <span className="mr-4 font-bold">Total cart: </span>
                  <span className=" font-bold text-red-600">
                    {formatNumber(total)} VNĐ
                  </span>
                </div>
                <div className="flex justify-center">
                  <div className="w-96">
                    <Paypal
                      payload={{
                        total,
                        cart: member.data.cart,
                      }}
                      amount={Math.round(total / 24000)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

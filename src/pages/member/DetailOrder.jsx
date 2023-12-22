import React, { useState } from "react";
import orderApi from "../../api/order.api";
import { formatNumber } from "../../utils/helpers";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";

const DetailOrder = () => {
  // hook start
  const { id } = useParams();
  // hook end
  const [orders, setOrders] = React.useState([]);
  const [detail, setDetail] = React.useState([]);
  console.log(detail);
  // effect start
  React.useEffect(() => {
    orderApi.getAll().then((res) => {
      setOrders(res.data);
      setDetail(res.data.filter((el) => el.id === id)[0]);
    });
  }, []);
  // effect end

  return (
    <>
      <div>
        <div>
          <div className="w-full overflow-x-auto whitespace-nowrap border border-slate-200 bg-white">
            <table
              className={clsx("w-full table-auto  text-sm", {
                hidden: orders.length === 0,
              })}
            >
              <thead>
                <tr role="row" className="border border-gray-100">
                  <th className="p-4 text-start">Order</th>
                  <th className="p-4 text-start">Product</th>
                  <th className="p-4 text-start">Price</th>
                  <th className="p-4 text-start">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {detail.products?.map((el, index) => {
                  return (
                    <tr role="row" key={index} className="">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12">
                            {typeof el.productId === "object" && (
                              <img src={el.productId.thumb[0].path} />
                            )}
                          </div>
                          <span>{el.productId.name}</span>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-red-600">
                        {formatNumber(el.productId.price)} VNĐ
                      </td>
                      <td className="p-4 font-bold text-red-600">
                        {formatNumber(el.quantity)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-8 w-full border border-slate-200 bg-white">
            <div className=" p-4">
              <div> </div>
              <div className="text-base">
                <div>
                  <span className="">Total cart: </span>
                  <span className=" font-bold text-red-600">
                    {formatNumber(detail.total)} VNĐ
                  </span>
                </div>
                <Button className="mt-4 w-full ">
                  <Link to="../order" className="w-full text-center">
                    Back List order
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailOrder;

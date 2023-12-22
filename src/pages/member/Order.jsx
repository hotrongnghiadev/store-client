import { useEffect, useState } from "react";
import orderApi from "../../api/order.api";
import clsx from "clsx";
import { formatNumber } from "../../utils/helpers";
import { Link } from "react-router-dom";
import Icons from "../../components/Icons";

const Order = () => {
  // hook start
  const [orders, setOrderes] = useState([]);
  // hook end

  useEffect(() => {
    orderApi.getByUser().then((res) => {
      setOrderes(res.data);
    });
  }, []);
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
                  <th className="p-4 text-start">Total</th>
                  <th className="p-4 text-start">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((el, index) => {
                  return (
                    <tr role="row" key={index} className="">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4 font-bold text-red-600">
                        {formatNumber(el.total)} VNĐ
                      </td>
                      <td className="flex gap-4 p-4">
                        <Link
                          to={`../detail-order/${el.id}`}
                          className="text-blue-500 underline"
                        >
                          Detail
                        </Link>
                        <button
                          to={`../detail-order/${el.id}`}
                          className="text-red-500 underline"
                        >
                          <Icons.IconDelete className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import orderApi from "../../api/order.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// This value is from the props in the UI
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, currency, amount, payload }) => {
  const navigate = useNavigate();
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

  // function start
  const handleCreateOrder = () => {
    orderApi.create(payload).then(() => {
      toast.success("The order has been paid successfully");
      navigate("/order");
    });
  };
  // function end

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [
              { amount: { currency_code: currency, value: amount } },
            ],
          })
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            if (response.status === "COMPLETED") handleCreateOrder();
          })
        }
      />
    </>
  );
};

export default function Paypal({ amount, payload }) {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          payload={payload}
          showSpinner={false}
          currency={"USD"}
          amount={amount}
        />
      </PayPalScriptProvider>
    </div>
  );
}

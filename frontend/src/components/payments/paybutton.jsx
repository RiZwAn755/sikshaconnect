import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const key = import.meta.env.VITE_RAZORPAY_KEY_ID;

function PayButton({ amountvalue = 25 }) {
  const amountNumeric = Number(amountvalue);

  const payNow = async () => {
    const { data: order } = await axios.post(
      `${baseUrl}/api/payment/create-order`,
      { amount: amountNumeric }
    );

    const options = {
      key,
      amount: order.amount,
      currency: order.currency,
      name: "SikshaConnect",
      order_id: order.id,

      handler: async function (response) {
        const verifyRes = await axios.post(
          `${baseUrl}/api/payment/verify`,
          response
        );

        if (verifyRes.data.success) {
          alert("Payment Successful!");
        } else {
          alert("Payment Failed!");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="w-full flex justify-center px-4 mt-10">
      <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-2xl p-8 max-w-md w-full border border-gray-100">


        <h2 className="text-2xl font-semibold text-gray-900 text-center tracking-tight">
          Amount to Pay
        </h2>

        <p className="text-center text-3xl font-bold mt-3 mb-8 text-red-600 tracking-wide">
          ₹{amountvalue}
          <span className="text-xl font-medium text-gray-600"> /-</span>
        </p>


        <button
          onClick={payNow}
          className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl text-lg 
                     transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
        >
          Pay Now
        </button>

        <p className="text-center mt-4 text-xs text-gray-500 tracking-wide">
          Secured by Razorpay 🔒
        </p>
      </div>
    </div>
  );
}

export default PayButton;

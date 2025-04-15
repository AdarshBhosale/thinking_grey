import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orderes = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState(null); // State to hold error messages

  const loadOrderData = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });

      if (response.data.success) {
        const allOrdersItem = response.data.orders.flatMap(order => 
          order.items.map(item => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date
          }))
        );
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      setError("Failed to load orders. Please try again later."); // Set error message
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      <div>
        {orderData.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-1">
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">
                PLACE ORDER
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orderes;

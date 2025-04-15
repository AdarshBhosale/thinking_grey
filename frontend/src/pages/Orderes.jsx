import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { jsPDF } from "jspdf";
import { assets } from "../assets/assets";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    setLoading(true);
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              _id: order._id,
              items: order.items,
              amount: order.amount,
              paymentMethod: order.paymentMethod,
              date: order.date,
              status: order.status,
              address: order.address,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const generateInvoicePDF = (order) => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = assets.logo;

    logo.onload = () => {
      doc.addImage(logo, "PNG", 15, 10, 35, 20);
      doc.setFontSize(10);
      const officeX = 195;
      const officeYStart = 15;
      const alignRight = { align: "right" };

      doc.text("Our Office", officeX, officeYStart, alignRight);
      doc.text(
        "1st Floor, Evershine Mall, Link Rd,",
        officeX,
        officeYStart + 5,
        alignRight
      );
      doc.text(
        "Opp. Mindspace, Malad West,",
        officeX,
        officeYStart + 10,
        alignRight
      );
      doc.text("Mumbai, MH - 400064", officeX, officeYStart + 15, alignRight);
      doc.text("Tel: 9324670321", officeX, officeYStart + 20, alignRight);
      doc.text(
        "Email: mugdha@thinkinggrey.com",
        officeX,
        officeYStart + 25,
        alignRight
      );

      doc.setLineWidth(0.5);
      doc.line(15, 47, 195, 47);

      doc.setFontSize(12);
      doc.text(`Invoice ID: #${order._id?.slice(-8)}`, 15, 55);
      doc.text(
        `Date: ${new Date(order.date).toLocaleDateString()}`,
        195,
        55,
        alignRight
      );

      let y = 70;
      if (order.address) {
        const addr = order.address;
        doc.setFont("helvetica", "bold");
        doc.text("Billed To:", 15, y);
        doc.setFont("helvetica", "normal");
        y += 7;
        doc.text(`${addr.firstName} ${addr.lastName}`, 15, y);
        y += 6;
        doc.text(addr.street, 15, y);
        y += 6;
        doc.text(`${addr.city}, ${addr.state}`, 15, y);
        y += 6;
        doc.text(`${addr.country} - ${addr.zipcode}`, 15, y);
        y += 6;
        doc.text(`Email: ${addr.email}`, 15, y);
        y += 6;
        doc.text(`Phone: ${addr.phone}`, 15, y);
        y += 10;
      }

      doc.setFont("helvetica", "bold");
      doc.text("Order Items:", 15, y);
      doc.setFont("helvetica", "normal");
      y += 7;

      order.items.forEach((item, i) => {
        doc.text(
          `${i + 1}. ${item.name} (Support Packs: ${item.size}) x ${
            item.quantity
          }`,
          20,
          y
        );
        y += 6;
      });

      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text("Order Summary", 15, y);
      doc.setFont("helvetica", "normal");
      y += 7;

      doc.text(`Items: ${order.items.length}`, 20, y);
      y += 6;
      doc.text(`Total Amount: ${order.amount}`, 20, y);
      y += 6;
      doc.text(`Payment Method: ${order.paymentMethod}`, 20, y);
      y += 6;
      doc.text(`Status: ${order.status}`, 20, y);

      y += 15;
      doc.line(15, y, 195, y);
      y += 10;
      doc.text("Thank you for shopping with Thinking Grey!", 15, y);

      doc.save(`Invoice_${order._id?.slice(-8)}.pdf`);
    };
  };

  return (
    <div className="border-t pt-16 px-4">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {loading ? (
        <p className="text-center py-10">Loading your orders...</p>
      ) : orderData.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No orders found.</p>
      ) : (
        orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Left Side */}
            <div className="flex items-start gap-6 text-sm w-full md:w-[70%]">
              <img
                className="w-16 sm:w-20 h-20 object-cover rounded"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="sm:text-base font-medium">
                  Product Name : {item.name}
                </p>
                <div className="flex flex-wrap gap-3 mt-1 text-base text-gray-700">
                  {/* <p>
                    {currency}
                    {item.price}
                  </p> */}
                  <p>Quantity: {item.quantity}</p>
                  <p>Support Packs: {item.size}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Date: {new Date(item.date).toDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  {/* Payment: {item.paymentMethod.toUpperCase()} */}
                  Payment: {item.price}
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 w-full md:w-[30%] text-sm">
              <div className="flex justify-center md:justify-center w-full">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-green-700 font-medium capitalize">
                    {item.status || "Order Placed"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 justify-center md:justify-end">
                <button
                  onClick={loadOrderData}
                  className="whitespace-nowrap border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-100"
                >
                  Track Order
                </button>
                <button
                  onClick={() => generateInvoicePDF(item)}
                  className="border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-100"
                  title="Download Invoice"
                >
                  📥
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;

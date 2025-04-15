/* eslint-disable no-unreachable */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { jsPDF } from "jspdf";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const generatePDF = (order) => {
    const doc = new jsPDF();

    const logo = new Image();
    logo.src = assets.logo;

    logo.onload = () => {
      doc.addImage(logo, "PNG", 15, 10, 30, 15);

      // Invoice title
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text("INVOICE", 150, 20);

      // Line
      doc.setLineWidth(0.5);
      doc.line(15, 28, 195, 28);

      // Order ID & Date
      doc.setFontSize(12);
      doc.text(`Invoice ID: #${order._id.slice(-8)}`, 15, 38);
      doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 150, 38);

      // Customer Info
      let y = 50;
      doc.setFont("helvetica", "bold");
      doc.text("Billed To:", 15, y);
      doc.setFont("helvetica", "normal");
      y += 7;
      doc.text(`${order.address.firstName} ${order.address.lastName}`, 15, y);
      y += 6;
      doc.text(order.address.street, 15, y);
      y += 6;
      doc.text(`${order.address.city}, ${order.address.state}`, 15, y);
      y += 6;
      doc.text(`${order.address.country} - ${order.address.zipcode}`, 15, y);
      y += 6;
      doc.text(`Phone: ${order.address.phone}`, 15, y);

      // Order Items
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text("Order Items:", 15, y);
      doc.setFont("helvetica", "normal");
      y += 7;

      order.items.forEach((item, index) => {
        doc.text(
          `${index + 1}. ${item.name} (Size: ${item.size}) x ${item.quantity}`,
          20,
          y
        );
        y += 6;
      });

      // Summary
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text("Order Summary", 15, y);
      doc.setFont("helvetica", "normal");
      y += 7;

      doc.text(`Items: ${order.items.length}`, 20, y);
      y += 6;
      doc.text(`Total Amount: $ ${order.amount}`, 20, y);
      y += 6;
      doc.text(`Payment Method: ${order.paymentMethod}`, 20, y);
      y += 6;

      // Add payment method logo based on payment method
      if (order.paymentMethod.toLowerCase().includes("card")) {
        const cardLogo = new Image();
        cardLogo.src = assets.card_icon;
        doc.addImage(cardLogo, "PNG", 60, y - 4, 15, 10);
      } else if (order.paymentMethod.toLowerCase().includes("cash")) {
        const cashLogo = new Image();
        cashLogo.src = assets.cash_icon;
        doc.addImage(cashLogo, "PNG", 60, y - 4, 15, 10);
      }

      // Payment status (simplified check)
      const paymentStatus =
        order.payment === true || order.payment === "Paid" ? "Paid" : "Pending";
      doc.text(`Payment Status: ${paymentStatus}`, 20, y);
      y += 6;
      doc.text(`Current Status: ${order.status}`, 20, y);

      // Footer
      y += 15;
      doc.setFontSize(10);
      // Draw a horizontal line instead of <hr />
      doc.line(15, y, 195, y); // x1, y1, x2, y2 - draw from left to right across the page
      y += 10; // move the y-position down a bit after the line

      // Add the thank you text
      doc.text("Thank you for shopping with Thinking Grey!", 15, y);

      // Save PDF
      doc.save(`ThinkingGrey_Invoice_${order._id.slice(-8)}.pdf`);
    };

    logo.onerror = () => {
      console.error("Logo failed to load. Check the path or import.");
      alert("Failed to load company logo. PDF not generated.");
    };
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 relative"
            key={index}
          >
            <button
              onClick={() => generatePDF(order)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
              title="Download Invoice"
            >
              <img
                src={assets.download_icon}
                alt="Download"
                className="w-6 h-6 mt-6 sm:w-8 sm:h-8 sm:mt-1 md:w-10 md:h-10 md:mt-0 lg:w-12 lg:h-8 lg:w-8 lg:mt-40 sm:mt-8"
              />
            </button>

            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        Product Name: {item.name} x {item.quantity} <br />
                        Support Packs: <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return;
                    <p className="py-0.5" key={index}>
                      {item.name} x {item.quantity},"",
                      <span>{item.size}</span> ,
                    </p>;
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ""}</p>
                <p>
                  {order.address.city +
                    "," +
                    order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.zipcode}
                </p>
                <p>{order.address.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.items.length}
              </p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

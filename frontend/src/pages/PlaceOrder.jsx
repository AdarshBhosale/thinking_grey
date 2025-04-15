/* eslint-disable no-case-declarations */
import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { jsPDF } from "jspdf";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const generateInvoicePDF = (order) => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = assets.logo;

    logo.onload = () => {
      // Add logo (left corner)
      doc.addImage(logo, "PNG", 15, 10, 35, 20);

      // Office info (right corner)
      doc.setFontSize(10);
      const officeYStart = 15;
      const officeX = 195;
      const alignRight = { align: "right" };

      doc.text("Our Office", officeX, officeYStart, alignRight);
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

      // Draw line after header
      doc.setLineWidth(0.5);
      doc.line(15, 47, 195, 47);

      // Invoice Details
      doc.setFontSize(12);
      doc.text(`Invoice ID: #${order._id?.slice(-8) || "TEMP123"}`, 15, 55);
      doc.text(
        `Date: ${new Date(order.date).toLocaleDateString()}`,
        195,
        55,
        alignRight
      );

      // Billing Info
      let y = 65;
      doc.setFont("helvetica", "bold");
      doc.text("Billed To:", 15, y);
      doc.setFont("helvetica", "normal");
      y += 7;
      doc.text(`${formData.firstName} ${formData.lastName}`, 15, y);
      y += 6;
      doc.text(formData.street, 15, y);
      y += 6;
      doc.text(`${formData.city}, ${formData.state}`, 15, y);
      y += 6;
      doc.text(`${formData.country} - ${formData.zipcode}`, 15, y);
      y += 6;
      doc.text(`Email: ${formData.email}`, 15, y);
      y += 6;
      doc.text(`Phone: ${formData.phone}`, 15, y);

      // Order Items
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text("Order Items:", 15, y);
      doc.setFont("helvetica", "normal");
      y += 7;

      order.items.forEach((item, index) => {
        doc.text(
          `${index + 1}. ${item.name} (Support Packs: ${item.size}) x ${
            item.quantity
          }`,
          20,
          y
        );
        y += 6;
      });

      // Order Summary
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text("Order Summary", 15, y);
      doc.setFont("helvetica", "normal");
      y += 7;

      doc.text(`Items: ${order.items.length}`, 20, y);
      y += 6;
      doc.text(`Total Amount: ${order.amount}`, 20, y);

      y += 6;
      doc.text(`Payment Method: ${order.paymentMethod.toUpperCase()}`, 20, y);
      y += 6;
      doc.text(`Payment Status: Pending`, 20, y);
      y += 6;
      doc.text(`Current Status: Order Placed`, 20, y);

      // Footer
      y += 15;
      doc.line(15, y, 195, y);
      y += 10;
      doc.setFontSize(12);
      doc.text("Thank you for shopping with Thinking Grey!", 15, y);

      // Save the PDF
      doc.save(`ThinkingGrey_Invoice_${order._id?.slice(-8) || "TEMP"}.pdf`);
    };

    logo.onerror = () => {
      console.error("Logo failed to load.");
      alert("Failed to load logo. PDF not generated.");
    };
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[items][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
        date: new Date().toISOString(),
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            orderData._id = response.data.orderId || "TEMP123";
            generateInvoicePDF(orderData);
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          required
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          type="text"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="number"
            placeholder="ZipCode"
          />
          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          required
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center justify-center gap-3 border p-3 cursor-pointer w-full"
            >
              <p
                className={`w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium text-center">
                CONNECT FOR PAYMENT
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

import React from "react";
import i1 from "../assets/clients/i1.png";
import i2 from "../assets/clients/i2.png";
import i3 from "../assets/clients/i3.png";
import i4 from "../assets/clients/i4.png";
import i5 from "../assets/clients/i5.png";
import i6 from "../assets/clients/i6.png";
import i7 from "../assets/clients/i7.png";
import i8 from "../assets/clients/i8.png";
import i9 from "../assets/clients/i9.png";
import i10 from "../assets/clients/i10.png";
import i11 from "../assets/clients/i11.png";
import i12 from "../assets/clients/i12.png";
import i13 from "../assets/clients/i13.png";
import i14 from "../assets/clients/i14.png";
import i15 from "../assets/clients/i15.jpg";
import i16 from "../assets/clients/i16.png";
import i17 from "../assets/clients/i17.png";
import i18 from "../assets/clients/i18.png";
import i19 from "../assets/clients/i19.png";
import i20 from "../assets/clients/i20.png";

import Title from "../components/Title";

const clients = [
  i1,
  i2,
  i3,
  i4,
  i5,
  i6,
  i7,
  i8,
  i9,
  i10,
  i11,
  i12,
  i13,
  i14,
  i15,
  i16,
  i17,
  i18,
  i19,
  i20,
];

const OurClients = () => {
  return (
    <div className="min-h-screen bg-white py-10 px-5 pt-0">
      <div className="text-center mb-10">
        <div className="mb-10 text-xl text-center pt-8 border-t">
          <Title text1={"OUR"} text2={"CLIENTS"} />
          <p>We have worked with industry giants</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {clients.map((client, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={client}
              alt={`Client ${index + 1}`}
              className="w-24 h-auto sm:w-28 md:w-35 lg:w-36 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurClients;

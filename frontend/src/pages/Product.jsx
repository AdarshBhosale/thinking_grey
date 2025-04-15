/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState();
  const navigate = useNavigate();

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);

        // ✅ Log all image URLs
        if (Array.isArray(item.image)) {
          console.log("Image URLs:");
          item.image.forEach((img, idx) =>
            console.log(`Image ${idx + 1}: ${img}`)
          );
        }

        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const handleTryDemo = () => {
    if (!productData) return;

    // Create a mapping of product names to their demo links
    const demoLinks = {
      "KBC Game": "",
      "Product 2": "",
      "Product 3": "",
      // Add other products if needed
    };

    // Find the link for the current product
    const demoLink = demoLinks[productData.name];

    if (demoLink) {
      window.open(demoLink, "_blank");
    } else {
      alert(`Demo not available for ${productData.name}`);
    }
  };

  useEffect(() => {
    if (productData && productData.name) {
      const tempProductName = productData.name;
      const tempDemoUrl = productData.demo_url;
      console.log("Product Name : " + tempProductName); // Logs the temporary variable
      console.log("Product Demo URL : " + tempDemoUrl);
    }
  }, [productData]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex justify-center text-base sm:text-2xl mb-4">
        <Title text1={""} text2={"PRODUCT"} />
      </div>
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={
                  "w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                }
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Our Support Packs</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : "border-transparent"
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="text-md text-gray-700 mt-5 flex flex-col gap-1">
            <b>You can customise your question set data.</b>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() =>
                navigate(`/customise/${productData._id}`, {
                  state: {
                    productName: productData.name,
                    demoUrl: productData.demo_url,
                    imageUrls: productData.image, // ✅ pass the image URLs here
                  },
                })
              }
              className="flex-1 bg-black text-white px-3 py-3 text-sm font-semibold rounded hover:bg-gray-800 transition"
            >
              CUSTOMISE
            </button>

            <button
              onClick={() =>
                productData.demo_url
                  ? window.open(productData.demo_url, "_blank")
                  : alert("Demo not available")
              }
              className="flex-1 bg-black text-white px-3 py-3 text-sm font-semibold rounded hover:bg-gray-800 transition"
            >
              TRY THE DEMO
            </button>

            {size && (
              <button
                onClick={() => addToCart(productData._id, size)}
                className="flex-1 bg-black text-white px-6 py-3 text-sm font-semibold rounded hover:bg-gray-800 transition"
              >
                ADD TO CART
              </button>
            )}
          </div>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Transforming Learning with Gamified Excellence</p>
            <p>Data-Driven Learning Experiences</p>
            <p>Built for Results. Designed for Learners.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Thinking Grey is your go-to partner for creative, customized
            training content that truly connects.With over a decade of
            expertise, we design technical, soft skills, and behavioral learning
            solutions tailored to your workforce and influencers.
          </p>
          <p>
            From digital to blended formats, our content drives engagement,
            skill development, and real business growth.
          </p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className=" opacity-0 "></div>
  );
};

export default Product;

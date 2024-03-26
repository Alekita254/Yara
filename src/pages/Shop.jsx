// Shop component
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from 'axios';

import {
  Filters,
  Pagination,
  ProductElement,
  SectionTitle,
} from "../components";
import "../styles/Shop.css";

const userDataString = localStorage.getItem("YaraUser");
const userData = userDataString ? JSON.parse(userDataString) : {};

export const shopLoader = async ({ paramsReceived }) => {
  // const params = new URL(request.url).searchParams;
  console.log("The data is received on the shop is: ", paramsReceived);


  try {
    let response;
    if (paramsReceived) {
      const formData = new FormData();
      // If paramsReceived is not empty, use it to create formData
      if (paramsReceived) {
        console.log("The data is received on the shop is: ", paramsReceived);

        formData.append("image", paramsReceived);

        // for (const image in paramsReceived) {
        //   console.log("The data is received on the shop is: ", paramsReceived);
        //   formData.append("image", paramsReceived);
        //   // formData.append(key, paramsReceived[key]);
        // }
      } 
      const url = "http://127.0.0.1:5000/api/search/";
      response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      });
    } else {
      response = await axios.get("http://127.0.0.1:5000/api/products/", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
    }

    if (response.data.success) {
      return { productsData: response.data.data };
    } else {
      console.error("API call unsuccessful:", response.data.message);
      return { productsData: [] }; // Return empty array if API call failed
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return { productsData: [] }; // Return empty array if error occurs
  }
};

const Shop = () => {
  const productLoaderData = useLoaderData();
  const [paramsReceived, setParamsReceived] = useState({});

  const handleReceivedParams = (paramsData) => {
    setParamsReceived(paramsData);
  };

  console.log("The data is received on the shop is: ", paramsReceived);


  useEffect(() => {
    shopLoader({ paramsReceived: paramsReceived });
  }, [paramsReceived]);

  if (
    !productLoaderData ||
    !productLoaderData.productsData ||
    productLoaderData.productsData.length === 0
  ) {
    return (
      <>
        <SectionTitle title="Shop" path="Home | Shop" />
        <div className="max-w-7xl mx-auto mt-5">
          <Filters onParamsSent={handleReceivedParams} />
          <h2 className="text-accent-content text-center text-4xl my-10">
            No products found
          </h2>
        </div>
        <Pagination />
      </>
    );
  }

  return (
    <>
      <SectionTitle title="Shop" path="Home | Shop" />
      <div className="max-w-7xl mx-auto mt-5">
        <Filters onParamsSent={handleReceivedParams} />
        <div className="grid grid-cols-4 px-2 gap-y-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 shop-products-grid">
          {productLoaderData.productsData.map((product) => (
            <ProductElement
              key={product.id}
              id={product.id}
              title={product.name}
              image={product.imageUrl}
              rating={product.rating}
              price={product.price}
            />
          ))}
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default Shop;

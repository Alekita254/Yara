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
  console.log("The data received on the shop is:", paramsReceived);

  try {
    if (paramsReceived) {
      const formData = new FormData();
      formData.append("image", paramsReceived);
      const url = "http://127.0.0.1:5000/api/search/";
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      });

      if (response.data && response.data.similar_images_urls) {
        return { productSimilarData: response.data.similar_images_urls, productsData: [] }; // Empty productsData
      }
    } else {
      const response = await axios.get("http://127.0.0.1:5000/api/products/", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });

      if (response.data.success) {
        return { productsData: response.data.data };
      } else {
        throw new Error("API call unsuccessful:", response.data.message);
      }
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return { productsData: [] }; // Return empty array if error occurs
  }
};


const Shop = () => {
  const productLoaderData = useLoaderData();
  const [paramsReceived, setParamsReceived] = useState({});

  const handleReceivedParams = async (paramsData) => {
    setParamsReceived(paramsData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await shopLoader({ paramsReceived });
      setProductLoaderData(data);
    };

    fetchData();
  }, [paramsReceived]);

  if (!productLoaderData || (!productLoaderData.productsData && !productLoaderData.productSimilarData)) {
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
          {productLoaderData.productsData && productLoaderData.productsData.map((product) => (
            <ProductElement
              key={product.id}
              id={product.id}
              title={product.name}
              image={product.imageUrl}
              rating={product.rating}
              price={product.price}
            />
          ))}
          {productLoaderData.productSimilarData && productLoaderData.productSimilarData.map((item, index) => (
            <ProductElement key={index} image={item.image_url} alt={`Similar image ${index + 1}`} title="" rating="" price="" />
          ))}
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default Shop;

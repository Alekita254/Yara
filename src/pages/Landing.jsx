import React, { useEffect } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

const userDataString = localStorage.getItem("YaraUser");
const userData = userDataString ? JSON.parse(userDataString) : {};


export const landingLoader = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/products/`, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });

    if (response.data.success) {
      return { products: response.data.data };
    } else {
      // Handle the case where the API call was not successful
      toast.error(response.data.message);
    }
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error fetching products:", error);
    // throw error;
  }
};


const Landing = () => {
  const { products } = useLoaderData();
  const navigate = useNavigate();
  
  if (!products) {
    // Handle the case where products are not yet available
    return <div>Loading...</div>;
  }
  


  return (
    <main>
      <Hero />
      <div className="selected-products">
        <h4 className="text-6xl text-center my-12 max-md:text-4xl text-accent-content">
          Trending Products and Designs
        </h4>
        <div className="selected-products-grid max-w-7xl mx-auto">
          {products.map((product) => (
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
    </main>
  );
};

export default Landing;

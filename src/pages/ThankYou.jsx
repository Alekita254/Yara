import React, { useEffect } from "react";
import { SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store";
import { calculateTotals, clearCart } from "../features/cart/cartSlice";
import { yaraRequestPost } from "../features/apis/apiresponse";

const ThankYou = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDataString = localStorage.getItem("YaraUser");
  const userData = userDataString ? JSON.parse(userDataString) : {};


  console.log("The Cart Items for orders: ", cartItems);

  const saveToOrderHistory = async () => {
    const url = "http://127.0.0.1:5000/api/orders/";
  
    // Map over cartItems to create a new array of objects for the request
    const requestData = cartItems.map(item => ({
      user: userData.userInformation.id,
      product_Quantity: item.amount,
      product: item.id,
      created_by: userData.userInformation.id,
    }));
  
    console.log("The products received are: ", requestData);
  
    // Now requestData is an array of objects, each representing a product in the cart
    // Loop over requestData and send each item individually
    for (let item of requestData) {
      yaraRequestPost(url, item)
        .then((data) => {
          toast.success(data.message);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  

  

  if (cartItems.length > 0) {
    saveToOrderHistory();
    store.dispatch(clearCart());
    store.dispatch(calculateTotals());
    toast.success("Order completed");
  }

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);


  return (
    <>
      <SectionTitle title="Thank You" path="Home | Cart | Thank you" />
      <div className="thankyou-content text-center text-accent-content px-10 max-w-7xl mx-auto">
        <h2 className="text-6xl max-sm:text-4xl">
          Thank you for your purchase!
        </h2>

        <h3 className="text-2xl mt-10 max-sm:text-xl">
          Your order has been received...
        </h3>
        <h3 className="text-2xl mt-5 max-sm:text-xl">
          Here are some things you can do next:
        </h3>
        <ul className="text-xl mt-5 text-blue-500 max-sm:text-lg">
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/order-history">&rarr; See order history &larr;</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/">&rarr; Browse more product and buy more &larr;</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            &rarr; Follow us on social media &larr;
          </li>
        </ul>

        <h4 className="text-xl mt-5 max-sm:text-lg">
          Thank you again for your purchase!
        </h4>
        <h4 className="text-xl max-sm:text-lg">
          Sincerely,Yara
        </h4>
      </div>
    </>
  );
};

export default ThankYou;

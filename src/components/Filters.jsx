import React, { useState } from "react";
import axios from "axios";
// import { Form } from "react-router-dom";
// import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormDatePicker from "./FormDatePicker";
import FormCheckbox from "./FormCheckbox";


const userDataString = localStorage.getItem("YaraUser");
const userData = userDataString ? JSON.parse(userDataString) : {};

const Filters = ({onParamsSent}) => {
  const [inputs, setInputs] = useState({
    image: null,
  });

  const [selectCategoryList, setSelectCategoryList] = useState([
    "all",
    "shoes",
    "slippers",
    "heels",
    "t-shirts",
    "jackets",
    "caps",
    "shorts",
    "sweaters",
    "sneakers",
    "shirts",
    "boots",
    "overshirts",
    "pants",
    "jeans",
    "socks",
    "belts",
    "trainers",
  ]);
  const [selectBrandList, setSelectBrandList] = useState([
    "all",
    "WALK LONDON",
    "Reebok",
    "Nike",
    "Jack & Jones",
    "Crocs",
    "Vans",
    "Puma",
    "New Balance",
    "Tommy Jeans",
    "Tommy Hilfiger",
    "Bershka",
    "New Look",
    "AllSaints",
    "Columbia",
    "The North Face",
    "Collusion",
    "ASOS DESIGN",
    "Topman",
    "Dr Denim",
    "Polo Ralph Lauren",
    "ASOS Dark Future",
    "Levi's",
    "Threadbare",
    "Calvin Klein",
    "AAPE BY A BATHING APE®",
    "Good For Nothing",
    "Timberland",
    "Pull and Bear",
    "Koi Footwear",
    "adidas performance",
    "Nike Running",
    "Dr Martens",
    "River Island",
  ]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: type === "file" ? e.target.files[0] : value,
    }));

  };

  // const setParams = (inputs.image) => {
    // onParamsSent(inputs.image);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onParamsSent(inputs.image); // Pass the current state of inputs to the parent component
  };

  // const handleSubmit = async (e) => {
  //   setParams();
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("image", inputs.image);

  //   // formData.append("image", imageFile, imageFile.name);
  //   console.log("FormData:", formData);


  //   try {
  //     const response = await axios.post("http://127.0.0.1:5000/api/search/", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${userData.token}`,
  //       },
  //     });

  //     console.log("Response:", response.data);

  //     // Handle the response as needed, e.g., update state with search results
  //   } catch (error) {
  //     console.error("Error searching images:", error);
  //   }

  // }

  console.log("The image is: ", inputs.image);

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
    onSubmit={handleSubmit}
    >
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue=""
      />
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        list={selectCategoryList}
        size="select-sm"
        defaultValue="all"
      />
      {/* COMPANIES */}
      <FormSelect
        label="select brand"
        name="brand"
        list={selectBrandList}
        size="select-sm"
        defaultValue="all"
      />
      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={["asc", "desc", "price high", "price low"]}
        size="select-sm"
        defaultValue="a-z"
      />
      {/* Producer */}
      <FormSelect
        label="Select gender"
        name="gender"
        list={["all", "male", "female"]}
        size="select-sm"
        defaultValue="all"
      />
      {/* PRICE */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={300}
      />
      {/* Date Picker */}
      <FormDatePicker label="select minimum production date" name="date" />

      {/* In stock */}
      <FormCheckbox
        label="Only products in stock"
        name="stock"
        defaultValue="false"
      />

      {/* Add more filters as needed */}
      
      {/* IMAGE UPLOAD */}
      <div className="flex flex-col">
        <label htmlFor="image" className="form-label">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* BUTTONS */}
      <div className="col-span-full flex justify-end">
        <button
          type="submit"
          className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm"
        >
          Search
        </button>
        <Link to="/shop?page=1" className="btn btn-primary btn-sm ml-2">
          Reset
        </Link>
      </div>
    </Form>
  );
};

export default Filters;

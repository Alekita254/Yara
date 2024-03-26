import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-router-dom";
import { Link } from "react-router-dom";

const userDataString = localStorage.getItem("YaraUser");
const userData = userDataString ? JSON.parse(userDataString) : {};

const Filters = ({onParamsSent}) => {
  const [inputs, setInputs] = useState({
    image: null,
  });

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

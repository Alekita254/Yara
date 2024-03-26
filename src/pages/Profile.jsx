import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [id, setId] = useState(localStorage.getItem("id"));
  // const [userData, setUserData] = useState({});
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const wishItems = useSelector((state) => state.wishlist.wishItems);
  const userDataString = localStorage.getItem("YaraUser");
  const userData = userDataString ? JSON.parse(userDataString) : {};
  const [userFormData, setUserFormData] = useState({
    id: userData.userInformation.id,
    name: userData.userInformation.username,
    profile: userData.userProfile.profile,
    email:  userData.userInformation.email,
    id_number: userData.userProfile.id_number,
    country: userData.userProfile.country,
  });
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/user-profiles/${userData.userInformation.id}/`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
  
      const data = response.data;
    
    } catch (error) {
      toast.error("Error: " + error.response.data); // Corrected error handling
    }
  };

  useEffect(() => {
    if (loginState) {
      getUserData();
    } else {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try{

      const getResponse = await axios(`http://127.0.0.1:5000/api/user_profile/${userData.userInformation.id}`);
      const userObj = getResponse.data;

      // saljemo get(default) request
      const putResponse = await axios.put(`http://127.0.0.1:5000/api/user_profile/${userData.userInformation.id}`, {
        id: id,
        name: userFormData.name,
        lastname: userFormData.lastname,
        email: userFormData.email,
        phone: userFormData.phone,
        adress: userFormData.adress,
        password: userFormData.password,
        userWishlist: await userObj.userWishlist
        //userWishlist treba da stoji ovde kako bi sacuvao stanje liste zelja
      });
      const putData = putResponse.data;
    }catch(error){
      console.log(error.response);
    }
  }

  return (
    <>
      <SectionTitle title="User Profile" path="Home | User Profile" />
      <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.name}
              onChange={(e) => {setUserFormData({...userFormData, name: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Profile</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.profile}
              onChange={(e) => {setUserFormData({...userFormData, profile: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.email}
              onChange={(e) => {setUserFormData({...userFormData, email: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your ID Number</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.id_number}
              onChange={(e) => {setUserFormData({...userFormData, id_number: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Country</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.country}
              onChange={(e) => {setUserFormData({...userFormData, country: e.target.value})}}
            />
          </div>

        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          type="submit"
        >
           Profile Info
        </button>
      </form>
    </>
  );
};

export default Profile;

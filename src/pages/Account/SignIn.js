import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { toast } from "react-toastify";
import { signIn } from "../../functionsConfigure/functions";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitFormData = (e) => {
    e.preventDefault();
    signIn(formData, rememberMe, setIsLoading, navigate, setError);
  };


  return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
          <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
            <Link to="/">
              <img src={logoLight} alt="logoImg" className="w-28" />
            </Link>
            <div className="flex flex-col gap-1 -mt-1">
              <h1 className="font-titleFont text-xl font-medium">
                Stay sign in for more
              </h1>
              <p className="text-base">When you sign in, you are with us!</p>
            </div>
            <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
              <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with YARA
              </span>
                <br />
                Start your journey with YARA quickly and effortlessly.
              </p>
            </div>
            <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
              <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all YARA services
              </span>
                <br />
                Gain access to a comprehensive range of services offered by YARA.
              </p>
            </div>
            <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
              <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
                <br />
                Join the millions of online shoppers who trust YARA for their shopping needs.
              </p>
            </div>
            <div className="flex items-center justify-between mt-10">
              <Link to="/">
                <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                  © YARA
                </p>
              </Link>
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                Terms
              </p>
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                Privacy
              </p>
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                Security
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lgl:w-1/2 h-full">
          <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center" onSubmit={submitFormData}>
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Sign in
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Your UserName
                  </p>
                  <input
                      onChange={handleFormData}
                      value={formData.username}
                      name="username"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="John"
                  />
                </div>
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                      onChange={handleFormData}
                      value={formData.password}
                      name="password"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="password"
                      placeholder="Create password"
                  />
                </div>
                <button
                    onClick={submitFormData}
                    className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
                >
                  Sign In
                </button>
                <div className="flex flex-col gap-.5">
                  <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                    {error}
                  </p>
                </div>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signup">
                  <span className="hover:text-blue-600 duration-300">
                    Sign up
                  </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default SignIn;

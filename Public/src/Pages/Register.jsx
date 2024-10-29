import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoutes } from "../Util/APIRoutes.js";

function Register() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password does not match", toastOptions);
      return false;
    } else if (username.length < 4) {
      toast.error(
        "Username should be greater than 4 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { password, username, email } = values;

      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            username,
            email,
            password,
          }
        );

        if (data.status === false) {
          toast.error("Registration unsuccessful!", toastOptions);
        } 
         if (data.status === true) {
          toast.error("Registration successful!", toastOptions);

          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/login"); // Update this route based on your routing structure
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.", toastOptions);
        console.error("Registration Error:", error);
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="form-container h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-4 bg-gray-900 ">
        <form
          className="flex flex-col gap-8 bg-[#00000076] rounded-[2rem] p-[3rem_5rem] "
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="brand flex justify-center items-center gap-4 ">
            <img src={Logo} alt="Logo" className="h-20" />
            <h1 className="text-white uppercase text-xl ">Chatter</h1>
          </div>
          <input
            className="bg-transparent p-4 border-[0.1rem] border-solid border-[#4e0eff] rounded-[0.4rem] text-white w-full text-[1rem] focus:border-[#997af0] focus:outline-none"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="bg-transparent p-4 border-[0.1rem] border-solid border-[#4e0eff] rounded-[0.4rem] text-white w-full text-[1rem] focus:border-[#997af0] focus:outline-none"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="bg-transparent p-4 border-[0.1rem] border-solid border-[#4e0eff] rounded-[0.4rem] text-white w-full text-[1rem] focus:border-[#997af0] focus:outline-none"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="bg-transparent p-4 border-[0.1rem] border-solid border-[#4e0eff] rounded-[0.4rem] text-white w-full text-[1rem] focus:border-[#997af0] focus:outline-none"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button
            type="submit"
            className="bg-slate-700 text-white px-8 py-4 border-none font-bold cursor-pointer rounded-[0.4rem] text-[1rem] uppercase hover:bg-[#6b6a6c]"
          >
            Create User
          </button>
          <span className="text-white uppercase">
            Already have an Account?
            <Link className="text-[#4e0eff] no-underline font-bold" to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;

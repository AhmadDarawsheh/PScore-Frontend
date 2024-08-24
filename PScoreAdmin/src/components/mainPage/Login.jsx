import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
import MyTextInput from "../MyTextInput";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import the spinner component
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const handleLogin = async (values) => {
    // setLoading(true); // Start loading
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://pscore-backend.vercel.app/auth/signin",
        {
          email: values.email,
          password: values.password,
        }
      );
      if (response?.data?.message === "success") {
        console.log("login:", response.data);
        setToken(response.data.token);
        navigate("/admin");
      } else {
        alert("no login:", response.data);
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error here (e.g., show error message)
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <div className="h-screen flex items-center justify-center background-div">
      <div className="w-[400px] h-[500px] bg-white shadow-lg flex flex-col items-center justify-center">
        <h1 className="text-color-thirdColor mb-10">
          <span className="text-color-mainColor">PS</span>core
        </h1>
        {/* <TextField
          id="input-with-icon-textfield"
          label="AccountName"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HiOutlineMail size={24} className="text-color-secondColor" />
              </InputAdornment>
            ),
          }}
          variant="standard"
          color="success"
        /> */}
        <form
          className="flex flex-col items-center"
          onSubmit={formik.handleSubmit}
        >
          <MyTextInput
            id="name"
            name="email"
            placeholder="email"
            Icon={HiOutlineMail}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <MyTextInput
            id="password"
            name="password"
            placeholder="password"
            Icon={HiOutlineLockClosed}
            password
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {/* <MyTextInput
            placeholder="password"
            Icon={HiOutlineLockClosed}
            password
          /> */}

          <button
            type="submit"
            className="text-white bg-color-secondColor hover:bg-white hover:text-color-mainColor border border-transparent hover:border-color-mainColor transition-all mt-6"
          >
            {isLoading ? (
              <ClipLoader size={30} color={"green"} loading={isLoading} />
            ) : (
              <p>login</p>
            )}
          </button>
        </form>
        <p>
          dont have account?
          <span className="text-color-secondColor">signup</span>
        </p>
      </div>
    </div>
  );
}

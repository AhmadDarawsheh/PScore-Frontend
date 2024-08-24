import { TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useAuth } from "../../contexts/AuthContext";

function AddNews() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const { token } = useAuth();

  const addNews = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.descreption);

    const today = dayjs().format("YYYY-MM-DD");
    formData.append("date", today);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    try {
      const response = await axios.post(
        "https://pscore-backend.vercel.app/news/create",
        formData,
        {
          headers: {
            authorization: `Ahmad__${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      //   setMessage("Playground Created");
    } catch (error) {
      console.error("error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      descreption: "",
    },
    onSubmit: (values) => {
      addNews(values);
    },
  });

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-3">
          <TextField
            id="title"
            name="title"
            type="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            label="Title"
            variant="standard"
          />
          <TextField
            id="descreption"
            name="descreption"
            onChange={formik.handleChange}
            value={formik.values.descreption}
            label="Description"
            variant="standard"
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          <button
            className="bg-green-800 text-white hover:text-green-800 hover:bg-white border border-green-800 transition-all"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddNews;

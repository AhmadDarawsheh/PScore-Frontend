import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import "../App.css";
export default function MainRoot() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      {/* Header */}

      <div className="flex flex-row shadow-md justify-between items-center p-3 w-full bg-white fixed">
        <p className="text-lg cursor-pointer" onClick={() => navigate("/")}>
          <span className="text-color-secondColor">PS</span>core
        </p>
        <div className="space-x-2 flex flex-row">
          <Link className="text-black font-normal hover:text-color-secondColor transition-all">
            aboutUs
          </Link>
          <Link className="text-black font-normal hover:text-color-secondColor transition-all">
            news
          </Link>
          <Link
            to={"/login"}
            className="text-black font-normal hover:text-color-secondColor transition-all"
          >
            login
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

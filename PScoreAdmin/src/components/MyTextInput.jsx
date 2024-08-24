import React, { useState } from "react";
import "./App.css"; // Import your CSS file

import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail } from "react-icons/hi";
export default function MyTextInput({
  name,
  id,
  placeholder,
  password,
  Icon,
  onChange,
  value,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative w-[220px] h-[45px]">
      <div
        className={`absolute  w-full  border-b border-color-secondColor hover:border-b-2  ${
          isFocused ? "border-b-2" : ""
        }`}
      >
        <p
          className={`text-sm transition-all mb-1 ${
            isFocused ? "text-color-secondColor" : "text-color-mainColor/75"
          }`}
        >
          {placeholder}
        </p>
        <div className="flex flex-row relative hover:cursor-text">
          <Icon size={24} className="text-color-secondColor" />
          <input
            className="bg-transparent focus:outline-none focus:border-none w-[100px] ml-2"
            id={id}
            name={name}
            type={password && !isVisible ? "password" : "text"}
            onChange={onChange}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {password ? (
            <div className="cursor-pointer" onClick={toggleVisibility}>
              {isVisible ? (
                <HiOutlineEye
                  size={24}
                  className="text-color-secondColor absolute right-0 cursor-pointer"
                />
              ) : (
                <HiOutlineEyeOff
                  size={24}
                  className="text-color-secondColor absolute right-0 cursor-pointer"
                />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

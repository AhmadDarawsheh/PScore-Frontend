import React, { Fragment } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineBell, HiOutlineChatAlt } from "react-icons/hi";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-white px-2 h-16 flex justify-between items-center border-b border-gray-200">
      <div className="relative">
        <CiSearch
          size={24}
          className="left-3 absolute top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="search..."
          className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm px-4 pl-11"
        />
      </div>
      <div className="flex items-center justify-center">
        <MyPopover />
        <HiOutlineChatAlt />
        <MyDropdown />
      </div>
    </div>
  );
}
function MyPopover() {
  return (
    <Popover className="relative">
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button
            className="bg-white hover:text-gray-800 border-transparent hover:border-transparent p-1.5 m-0"
            style={{ outline: "none" }}
          >
            <HiOutlineBell />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 w-80 bg-white ">
              <div className="shadow-md ring-1 ring-black ring-opacity-5 px-2 py-1">
                <div>alerts</div>
                <div>new Reservation for tomorow</div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
function MyDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className="bg-white hover:text-gray-800 border-transparent hover:border-transparent p-1.5 m-0"
        style={{ outline: "none" }}
      >
        <div
          className="h-10 w-10 bg-cover bg-no-repeat rounded-full"
          style={{
            backgroundImage: 'url("https://source.unsplash.com/80x80?face")',
          }}
        ></div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right flex flex-col divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                className={`text-black font-normal hover:text-red-600 ${
                  active && "text-red-600"
                }`}
                to="/logout"
              >
                logout
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

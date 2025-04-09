"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import { GoPersonFill } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

interface UserRegisterData {
  username: string;
  phone: string;
  password: string;
  confirm_password: string;
  email: string;
}
const Register = ({
  setShowRegister,
  onClose,
}: {
  setShowRegister: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<UserRegisterData>({
    username: "",
    phone: "",
    password: "",
    confirm_password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false)

  const { login } = useAuth();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(`register`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      const { email, username } = res.data.user;
      const user: { email: string; username: string } = {
        email,
        username,
      };

      login(res.data.token, user);
      setLoading(false)
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setShowRegister(false);
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-[#07070767] z-[1000]">
      <div className="w-2/5 h-4/5  shadow rounded-lg bg-white p-10">
        <h1
          className="float-end -translate-y-9 translate-x-4 text-xl font-semibold cursor-pointer"
          onClick={onClose}
        >
          x
        </h1>
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-2xl font-bold text-green-400">Task Manager</h1>
          <p className="text-gray-500 text-center font-semibold">
            Just one Step away! This will help make your profile more
            personalized
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full py-6 px-6"
          >
            <div className="flex gap-2 w-full">
              <div className="flex w-1/2 items-center border rounded-md  bg-white">
                <GoPersonFill className=" p-1 h-10 w-10 text-gray-500 rounded-e-md cursor-pointer " />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="m-2 text-sm text-gray-700 focus:outline-none"
                />
              </div>
              <div className="flex w-1/2 items-center border rounded-md  bg-white">
                <FaPhoneAlt className=" p-1 h-10 w-10 text-gray-500 rounded-e-md cursor-pointer " />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone No"
                  required
                  className="m-2 text-sm text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex w-full items-center border rounded-md  bg-white">
              <HiOutlineMail className=" p-2 h-10 w-10 text-gray-500 rounded-e-md cursor-pointer " />
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter tour Email..."
                name="email"
                required
                className="m-2 text-sm text-gray-700 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex w-1/2 items-center border rounded-md  bg-white">
                <TbLockPassword className=" p-1 h-10 w-10 text-gray-500 rounded-e-md cursor-pointer " />
                <input
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  placeholder="password"
                  required
                  className="m-2 text-sm text-gray-700 focus:outline-none"
                />
              </div>
              <div className="flex w-1/2 items-center border rounded-md  bg-white">
                <input
                  type="password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  required
                  className="m-2 text-sm text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="flex items-center py-3 px-6 rounded-xl shadow-2xl gap-2 hover:bg-orange-500 bg-orange-400 text-white text-sm hover:cursor-pointer"
              >
                {loading?"Loading...":"Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

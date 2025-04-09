"use client";

import { Dispatch, SetStateAction, useState } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import { HiOutlineMail } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";
import { redirect, useRouter } from "next/navigation";

interface UserData {
  password: string;
  email: string;
}
const Login = ({
  setShowLogin,
  onClose,
}: {
  setShowLogin: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<UserData>({
    password: "",
    email: "",
  });
  const [errorMsg, seterrorMsg] = useState("");

  const router = useRouter();

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
    try {
      const res = await axios.post(`login`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      const { email, username } = res.data.user;
      const user: { email: string; username: string } = {
        email,
        username,
      };
      console.log(res.data);

      login(res.data.token, user);
      setShowLogin(false);
      redirect("/dashboard");
    } catch (error) {
      seterrorMsg("Invalid Credentials..");
      console.error("Error logging in:", error);
    }
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
            Welcome Back!
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 w-full py-10 px-10"
          >
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
            <div className="flex w-full items-center border rounded-md  bg-white">
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
            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="flex items-center py-3 px-6 rounded-xl shadow-2xl gap-2 hover:bg-orange-500 bg-orange-400 text-white text-sm hover:cursor-pointer"
              >
                Submit
              </button>
            </div>
            <h1 className="text-red-300 text-center">{errorMsg}</h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

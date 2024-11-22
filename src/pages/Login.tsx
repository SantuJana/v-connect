import React, { useState } from "react";
import styles from "../css/login.module.css";
import BannerLogo from "../assets/color-trans.svg";
import VerticalLogo from "../assets/color-trans-vertical.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import axios, { AxiosError } from "axios";
import { apiUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import {
  NotificationContext,
  useNotification,
} from "../context/notificationContext";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { failed, warn } = useNotification() as NotificationContext;
  const initialForm = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState<FormData>(initialForm);

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      warn("please enter email and password");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/landing", {replace: true});
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      // @ts-ignore
      failed(axiosError?.response?.data?.msg);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-violet-100">
      <div
        className="absolute w-11/13 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden flex flex-col sm:flex-row justify-between shadow-xl min-h-96"
        // style={{ width: "800px" }}
      >
        <div className="hidden w-1/2 sm:flex justify-center items-center overflow-hidden p-2.5 bg-slate-300">
          <img
            className="h-16 w-auto object-cover"
            src={BannerLogo}
            alt="Banner"
          />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col justify-center items-center overflow-hidden p-5 bg-white">
          <div>
            <img className="h-15" src={VerticalLogo} alt="Logo" />
          </div>
          <form onSubmit={handleFormSubmit} method="post">
            <div className="mt-6 flex flex-col">
              <div className="mb-3.5">
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  width="300px"
                  onChange={handleFormDataChange}
                />
              </div>
              <div className="mb-3.5">
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  width="300px"
                  onChange={handleFormDataChange}
                />
              </div>
              <div className={`mb-3.5 mt-2 mb-0`}>
                <Button type="submit" title="Login" width="100%" />
              </div>
              <div>
                <p className="inline-block text-base cursor-pointer text-purple-600 hover:text-purple-700 hover:underline underline-offset-4">
                  Forgot password?
                </p>
              </div>
              <div className={styles.divider}>
                <p>or</p>
              </div>
              <div className={styles.socialContainer}>
                <div className={styles.socialDiv}>
                  <FcGoogle size={25} cursor={"pointer"} />
                  <p>Google</p>
                </div>
                <div className={styles.socialDiv}>
                  <ImFacebook2 size={25} color="blue" cursor={"pointer"} />
                  <p>Facebook</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

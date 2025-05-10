import React, { useCallback, useEffect, useState } from "react";
import BannerLogo from "../assets/color-trans.svg";
import VerticalLogo from "../assets/color-trans-vertical.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  useNotification,
  NotificationContext,
} from "../context/notificationContext";
import axios, { AxiosError } from "axios";
import { apiUrl } from "../constants";
import GenderSelection from "../components/GenderSelection";
import { useMutation } from "@tanstack/react-query";
import { register } from "../service/auth.service";

export default function Register() {
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
    dob: "",
    name: "",
    gender: null,
  });

  const { warn, success, failed } = useNotification() as NotificationContext;
  const navigate = useNavigate();

  const {mutate, isError, error, isPending, isSuccess, data} = useMutation({
    mutationKey: ['register'],
    mutationFn: (data) => register(data),
  })

  const handleFormSubmit =  useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.gender) {
      warn("Please fill all the field");
    } else if (formData.password?.length < 5) {
      warn("Password is too sort");
    } else if (formData.password !== formData.conPassword) {
      warn("Confirm password did not matched");
    } else {
      mutate(formData);
    }
  }, [formData, mutate, warn]);

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleGenderChange = useCallback(
    (val: "Male" | "Female") => {
      setFormData((prevData: any) => ({ ...prevData, gender: val }));
    },
    [setFormData]
  );

  useEffect(() => {
    if (isError){
      failed((error as any)?.response?.data?.error)
    }
  }, [isError, error, failed])

  useEffect(() => {
    if (data) {
      success(data?.data?.msg);
      navigate("/login");
    }
  }, [isSuccess, data, success])

  return (
    <div className="relative h-screen w-screen bg-violet-100">
      <div
        className="absolute w-11/13 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden flex flex-col sm:flex-row justify-between shadow-xl sm:min-h-96"
        // style={{ width: "800px" }}
      >
        <div className="hidden w-1/2 sm:flex justify-center items-center overflow-hidden p-2.5 bg-slate-300">
          <img
            className="h-16 w-auto object-cover"
            src={BannerLogo}
            alt="Banner"
          />
        </div>
        <div className="w-[calc(100vw-20px)] sm:w-1/2 flex flex-col justify-center items-center overflow-hidden p-5 bg-white">
          <div>
            <img className="h-15" src={VerticalLogo} alt="Logo" />
          </div>
          <form onSubmit={handleFormSubmit} method="post" className="w-full">
            <div className="mt-6 flex flex-col">
              <div className="mb-3.5">
                <Input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  width="100%"
                  onChange={handleFormDataChange}
                />
              </div>
              <div className="mb-3.5">
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  width="100%"
                  onChange={handleFormDataChange}
                />
              </div>
              <div className="mb-3.5">
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  width="100%"
                  onChange={handleFormDataChange}
                />
              </div>
              <div className="mb-3.5">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  name="conPassword"
                  value={formData.conPassword}
                  width="100%"
                  onChange={handleFormDataChange}
                />
              </div>
              <div className="mb-3.5">
                <GenderSelection
                  selectedGender={formData.gender}
                  onSelectGender={handleGenderChange}
                />
                {/* <Input
                  type="date"
                  placeholder="Date of birth"
                  name="dob"
                  value={formData.dob}
                  width="100%"
                  onChange={handleFormDataChange}
                /> */}
              </div>
              <div className={`mt-2 mb-3.5`}>
                <Button
                  type="submit"
                  title="Signup"
                  width="100%"
                  loading={isPending}
                />
              </div>
              <div className="flex gap-1">
                Already have an account?
                <Link
                  to="/login"
                  className="text-center block cursor-pointer text-purple-600 hover:text-purple-700 hover:underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
              {/* <div className={styles.divider}>
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
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useCallback, useRef, useState } from "react";
import useUserStore from "../store/user.store";
import Avatar from "../assets/icon.png";
import api from "../utils/axiosInstance";
import {
  NotificationContext,
  useNotification,
} from "../context/notificationContext";
import { imagekitEndpoint } from "../constants";
import moment from "moment";
import Input from "../components/Input";
import Button from "../components/Button";
import DatePicker from "../components/DatePicker";

export default function Profile() {
  const { user, setUser } = useUserStore();
  const { failed, success } = useNotification() as NotificationContext;
  const [formData, setFormData] = useState<any>({
    name: user?.name || "",
    email: user?.email || "",
    dob: user?.dob || "",
    city: user?.city || "",
    image: null,
  });
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleImageEditClick = () => {
    imageInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files?.length) {
      const reader = new FileReader();
      reader.onload = function (e: ProgressEvent<FileReader>) {
        const src: any = e.target?.result;
        setFormData((prevData: any) => ({ ...prevData, image: src }));
        imageRef.current && (imageRef.current.src = src);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await api.post("/user/update", formData);
        if (response?.status === 200) {
          setFormData((prevData: any) => ({ ...prevData, image: null }));
          setUser({
            ...user,
            name: formData.name,
            email: formData.email,
            dob: formData.dob,
            city: formData.city,
            image: response.data.data?.image || user?.image,
          });
          success(response?.data?.msg);
        }
      } catch (error) {
        failed("Failed to update.");
      }
      setIsLoading(false);
    },
    [formData, failed, success, setUser, user]
  );

  return (
    <div className="w-full">
      <form method="post" onSubmit={handleSubmit}>
        <div className="w-full flex justify-center mt-5">
          <figure className="h-24 w-24 rounded-full ring-2 ring-violet-400 overflow-hidden relative">
            <input
              ref={imageInputRef}
              type="file"
              name="image"
              id=""
              onChange={handleFileChange}
              hidden
            />
            <img
              ref={imageRef}
              src={
                user?.image
                  ? `${imagekitEndpoint}${user.image}?tr=h-200,w-200`
                  : Avatar
              }
              alt=""
              className="w-full h-full object-contain"
            />
            <div
              className="absolute h-8 w-full bottom-0 cursor-pointer"
              onClick={handleImageEditClick}
            >
              <div className="bg-slate-900 h-full w-full opacity-50 absolute"></div>
              <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] transform text-white">
                Edit
              </span>
            </div>
          </figure>
        </div>
        <div className="mt-8 flex flex-col mx-auto gap-3 w-5/6 md:w-96">
          <div className="w-full">
            <Input
              name="name"
              onChange={handleChange}
              value={formData?.name || ""}
              placeholder="Enter name"
              type="text"
              width="100%"
            />
          </div>
          <div className="w-full">
            <Input
              name="email"
              onChange={handleChange}
              value={formData?.email || ""}
              placeholder="Enter email"
              type="email"
              width="100%"
            />
          </div>
          <div className="w-full">
            <DatePicker name="dob" onChange={handleChange} value={formData?.dob ? moment(formData?.dob).format("YYYY-MM-DD") : ""} placeholder="Select date of birth" width="100%" />
          </div>
          <div className="w-full">
            <Input
              name="city"
              onChange={handleChange}
              value={formData?.city || ""}
              placeholder="Enter city"
              type="text"
              width="100%"
            />
          </div>
          <div className="w-full flex justify-center">
            <Button title="Save" loading={isLoading} type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

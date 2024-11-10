import React, { useState } from "react";
import styles from "../css/login.module.css";
import BannerLogo from "../assets/color-trans.svg";
import VerticalLogo from "../assets/color-trans-vertical.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import axios from "axios";
import { apiUrl } from "../constants";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
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
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/landing");
      }
    } catch (error) {
      console.log("Login Error: ", error);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <img className={styles.bannerImage} src={BannerLogo} alt="Banner" />
        </div>
        <div className={styles.rightSection}>
          <div>
            <img className={styles.logo} src={VerticalLogo} alt="Logo" />
          </div>
          <form onSubmit={handleFormSubmit} method="post">
            <div className={styles.form}>
              <div className={styles.row}>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  width="300px"
                  onChange={handleFormDataChange}
                />
              </div>
              <div className={styles.row}>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  width="300px"
                  onChange={handleFormDataChange}
                />
              </div>
              <div className={styles.row}>
                <Button type="submit" title="Login" width="100%" />
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

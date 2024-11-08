import React from "react";
import styles from "../css/login.module.css";
import BannerLogo from "../assets/color-trans.svg";
import VerticalLogo from "../assets/color-trans-vertical.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import {FcGoogle} from "react-icons/fc"
import {ImFacebook2} from "react-icons/im"

export default function Login() {
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
          <div className={styles.form}>
            <div className={styles.row}>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={""}
                width="300px"
                onChange={() => {}}
              />
            </div>
            <div className={styles.row}>
              <Input
                type="password"
                placeholder="Password"
                name="email"
                value={""}
                width="300px"
                onChange={() => {}}
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
        </div>
      </div>
    </div>
  );
}

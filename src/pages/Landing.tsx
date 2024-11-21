import React from "react";
import Logo from "../assets/icon.png";
import Call from "../assets/call.png";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export default function Landing() {
  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-purple-400 to-purple-200 px-3 sm:px-0 pb-5">
      <div className="container">
        <div className="h-16">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-2">
              <img src={Logo} className="h-8 sm:h-11" alt="logo" />
              <p className="text-xl sm:text-2xl">Vconnect</p>
            </div>
            <div className="flex items-center gap-11">
              <Link
                to={"/contact-us"}
                className="hover:text-violet-600 hidden sm:block"
              >
                Contact Us
              </Link>
              <Link
                to={"/terms-and-conditions"}
                className="hover:text-violet-600 hidden sm:block"
              >
                Terms and Conditions
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  to={"/join"}
                  className="ring-1 text-violet-600 ring-violet-600 px-2 py-1 rounded hover:border-none hover:bg-violet-700 hover:text-white"
                >
                  Join
                </Link>
                <Link
                  to={"/login"}
                  className="bg-violet-600 rounded px-2 py-1 ring-1 ring-violet-600 text-white hover:bg-violet-700"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-16">
          <h1 className="text-center text-3xl sm:text-5xl font-bold bg-gradient-to-r from-violet-600 to-violet-900 text-transparent bg-clip-text">
            Connect with your lovable one in Any Time
          </h1>
        </div>
        <div className="mt-4 flex items-center flex-col">
          <h1 className="text-violet-800 sm:w-4/5">
            Welcome to V-connect, your ultimate destination for seamless video
            calling and social interaction. Designed to bring people closer,
            V-connect empowers you to stay in touch with friends, family, and
            colleagues, no matter where you are.
          </h1>
          <div className="mt-5 w-4/5 flex flex-col sm:flex-row gap-2 sm:justify-around">
            <div className="inline-block bg-violet-500 text-white text-center rounded-full px-6 py-3">
              Crystal-Clear Video Calls
            </div>
            <div className="inline-block bg-violet-500 text-white text-center rounded-full px-6 py-3">
              Cross-Platform Compatibility
            </div>
            <div className="inline-block bg-violet-500 text-white text-center rounded-full px-6 py-3">
              Safe and Secure
            </div>
            {/* <div className="inline-block bg-violet-500 text-white rounded-full px-6 py-3">
              Crystal-Clear Video Calls
            </div> */}
          </div>
          <div className="mt-7 sm:mt-10">
            <img src={Call} alt="" />
          </div>
          <p className="text-violet-800 mt-3">
            Don’t wait just dive in to inside to connect with your favorite one
            and enjoy seamless connectivity.
          </p>
          <Link
            to={"/login"}
            className="mt-8 sm:mt-10 group rounded-full bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 flex gap-2 items-center"
          >
            Let's Go
            <IoIosArrowForward
              size={18}
              className="transform duration-150 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

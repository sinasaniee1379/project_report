import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { chengeLan } from "../action/translation/translation";
import { darkMode, userLoginInfo, userRegisterInfo } from "../action/user/user";
import LoginForm from "../components/loginForm";
import Signup from "../components/signup";
const Login = () => {
  const { t, i18n } = useTranslation();
  const [register, setRegister] = useState(true);
  const dispatch = useDispatch();
  const { isTraslate } = useSelector((state) => state.translate);
  const { isDark } = useSelector((state) => state.user);

  const changeLanguageHandler = (e) => {
    dispatch(chengeLan());
    console.log(isTraslate);
    if (isTraslate) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("fa");
    }
  };
  return (
    <div className="app relative min-h-screen bg-stain-pattern bg-cover grid place-items-center bg-fixed dark:bg-[#242424] dark:text-white">
      <div className="container py-28 lg:py-10">
        <div className="flex">
          <Link
            to={"/"}
            className="logo absolute left-10 top-12 flex items-center"
          >
            <div className="logo-text">
              <h6 className="text-[#4285F4] capitalize font-poppins font-semibold text-xl">
                Apple
              </h6>
            </div>
            <div className="logo-img w-12 h-12 mr-2">
              <img
                className="w-full h-full object-contain"
                src="/img/logo.svg"
                alt=""
              />
            </div>
          </Link>
          <button
            className="absolute left-[285px] top-14 bg-gray-300 p-1 rounded"
            id="theme-mode-toggler"
            onClick={() => dispatch(darkMode())}
          >
            {isDark ? (
              <img
                src="/img/sun-1-svgrepo-com.svg"
                alt=""
                className="bx text-xl md:text-3xl text-white ml-1 pointer-events-none moon"
              />
            ) : (
              <img
                src="/img/moon-svgrepo-com.svg"
                alt=""
                className="bx text-xl md:text-3xl text-white ml-1 pointer-events-none moon"
              />
            )}
          </button>
          <p
            className="cursor-pointer absolute left-[206px] top-14 flex items-center font-bold bg-gray-300 p-2 rounded"
            onClick={changeLanguageHandler}
          >
            {isTraslate ? "EN" : "FA"}
          </p>
        </div>
        <div className="form-container w-full max-w-lg bg-white rounded-3xl shadow-[0_4px_35px_rgba(0,0,0,0.18)] py-12 mx-auto px-9 sm:px-16 dark:bg-[#242424]">
          <div className="form-header mb-14">
            <div className="form-header-title mb-9">
              <h4 className="font-iryekan font-bold text-lg text-center">
                {" "}
                به سایت <span className="text-[#2969e7]">سیب </span>
                خوش آمدید
              </h4>
            </div>
            <div className="form-header-navs">
              <div className="flex gap-x-4 items-center w-fit py-3 px-5 bg-[#4285F4] rounded-[33px] mx-auto">
                <p
                  onClick={() => setRegister(true)}
                  className={
                    register
                      ? "nav-link font-iryekan font-bold text-xl grid place-items-center w-36 h-10 text-white rounded-[33px] bg-blue-400"
                      : "nav-link font-iryekan font-bold text-xl grid place-items-center w-36 h-10 text-white rounded-[33px]"
                  }
                >
                  {t("register")}
                </p>
                <p
                  onClick={() => setRegister(false)}
                  className={
                    register
                      ? "nav-link font-iryekan font-bold text-xl grid place-items-center w-36 h-10 text-white rounded-[33px]"
                      : "nav-link font-iryekan font-bold text-xl grid place-items-center w-36 h-10 text-white rounded-[33px] bg-blue-400"
                  }
                >
                  {t("login")}
                </p>
              </div>
            </div>
          </div>
          <div className="form-body">
            <div className="form-body-tabs">
              {register ? <Signup /> : <LoginForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

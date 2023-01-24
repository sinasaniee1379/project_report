import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginAdmin, loginClient } from "../action/user/user";
import { userRegisterInfo } from "../action/user/user";
import * as Yup from "yup";

const initialValues = {
  username: "",
  password: "",
};
const validationSchema = Yup.object({
  username: Yup.string().required("نام کاربری را وارد کنید"),
  password: Yup.string()
    .required("رمز عبور را وارد کنید")
    .min(8, "رمز عبور باید حداقل شامل 8 کارارکتر باشد"),
});
const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    const { username, password } = values;
    const loginForm = {
      username,
      password,
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/login",
      loginForm
    );

    console.log(data);
    dispatch(userRegisterInfo(data));
    if (data.level === 10) {
      navigate("/admin");
      toast.success(data.message);
      dispatch(loginAdmin());
    } else {
      navigate("/");
      toast.success(data.message);
      dispatch(loginClient());
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div
      style={{ cursor: "pointer" }}
      className="tab-pane signin-tab cursor-pointer"
    >
      <form className="font-iryekan" onSubmit={formik.handleSubmit}>
        <div className="input-group  mt-2">
          <label
            htmlFor="sn-username"
            className="block mb-2 text-sm font-bold dark:text-white"
          >
            {t("yourUserName")}
          </label>
          <input
            type="text"
            id="sn-username"
            className="border border-gray-500 text-sm rounded-lg block w-full p-[14px] outline-none dark:bg-[#242424] dark:text-white"
            name="username"
            onChange={formik.handleChange}
            value={formik.values["username"]}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched["username"] && formik.errors["username"] ? (
          <div style={{ color: "red", fontSize: ".8rem" }} className="mb-8">
            {formik.errors["username"]}
          </div>
        ) : null}
        <div className="input-group  mt-2">
          <label htmlFor="sn-password" className="block mb-2 text-sm font-bold">
            {t("yourPass")}
          </label>
          <div className="relative">
            <input
              type={isShow ? "text" : "password"}
              id="sn-password"
              className="border border-gray-500 text-sm rounded-lg block w-full p-[14px] pl-[52px] outline-none dark:bg-[#242424] dark:text-white"
              name="password"
              onChange={formik.handleChange}
              value={formik.values["password"]}
              onBlur={formik.handleBlur}
            />
            <button
              onClick={() => setIsShow(!isShow)}
              type="button"
              className="show-hide-toggler absolute left-4 top-1/2 -translate-y-1/2"
            >
              <div className="visible pointer-events-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </div>
              <div className="unvisible pointer-events-none hidden">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
        {formik.touched["password"] && formik.errors["password"] ? (
          <div style={{ color: "red", fontSize: ".8rem" }} className="mb-4">
            {formik.errors["password"]}
          </div>
        ) : null}
        <div className="forgot-password mb-10">
          <a className="text-gray-400 text-sm">{t("forgetPass")}</a>
        </div>

        <button
          disabled={!formik.isValid}
          className="text-white bg-[#4285F4] text-2xl shadow-[0_4px_30px_rgba(38,58,67,0.15)] hover:bg-blue-800 font-medium rounded-lg w-full px-5 py-4 text-center mt-2.5"
        >
          {t("login")}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegisterInfo } from "../action/user/user";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { loginClient } from "../action/user/user";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  username: "",
  fullname: "",
  birth: "",
  phone: "",
  password: "",
};
const validationSchema = Yup.object({
  username: Yup.string().required("نام کاربری را وارد کنید"),
  fullname: Yup.string().required("نام و نام خانوادگی را وارد کنید"),
  birth: Yup.string().required("تاریخ تولد را وارد کنید"),
  phone: Yup.string()
    .required("شماره موبایل را وارد کنید")
    .matches(/^[0-9]{10}$/, "شماره موبایل باید 11 رقم باشد")
    .nullable(),
  password: Yup.string()
    .required("رمز عبور را وارد کنید")
    .min(8, "رمز عبور باید حداقل شامل 8 کارارکتر باشد"),
});
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const onSubmit = async (values) => {
    const { username, fullname, birth, phone, password } = values;
    const registerForm = {
      username,
      fullname,
      birth,
      phone,
      password,
      level: 1,
    };
    console.log(registerForm);
    dispatch(userRegisterInfo(registerForm));
    const { data } = await axios.post(
      "http://localhost:5000/api/register",
      registerForm
    );
    console.log(data);
    if (data.status) {
      toast.success(data.message);
      navigate("/client");
      dispatch(loginClient(data));
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <div className="tab-pane signup-tab cursor-pointer">
      <form className="font-iryekan" onSubmit={formik.handleSubmit}>
        <div className="input-group mb-8">
          <label htmlFor="sp-username" className="block mb-2 text-sm font-bold">
            {t("yourUserName")}
          </label>
          <input
            type="text"
            id="sp-username"
            className="border border-gray-500 text-sm rounded-lg block w-full p-[14px] outline-none dark:bg-[#242424] dark:text-white"
            required
            name="username"
            onChange={formik.handleChange}
            value={formik.values["username"]}
            onBlur={formik.handleBlur}
          />
          {formik.touched["username"] && formik.errors["username"] ? (
            <div style={{ color: "red", fontSize: ".8rem" }}>
              {formik.errors["username"]}
            </div>
          ) : null}
        </div>
        <div className="flex gap-x-8 mb-8">
          <div className="input-group flex-grow">
            <label
              htmlFor="sp-full-name"
              className="block mb-2 text-sm font-bold"
            >
              {t("yourFullname")}
            </label>
            <input
              type="text"
              id="sp-full-name"
              className="border border-gray-500 text-sm rounded-lg block w-full p-[14px] outline-none dark:bg-[#242424] dark:text-white"
              required
              name="fullname"
              onChange={formik.handleChange}
              value={formik.values["fullname"]}
              onBlur={formik.handleBlur}
            />
            {formik.touched["fullname"] && formik.errors["fullname"] ? (
              <div style={{ color: "red", fontSize: ".8rem" }}>
                {formik.errors["fullname"]}
              </div>
            ) : null}
          </div>
          <div className="input-group flex-grow">
            <label
              htmlFor="sp-birth-date"
              className="block mb-2 text-sm font-bold"
            >
              {t("yourBirth")}
            </label>
            <input
              type="text"
              id="sp-birth-date"
              className="persian-datepicker border border-gray-500 text-sm rounded-lg block w-full p-[14px] outline-none dark:bg-[#242424] dark:text-white"
              required
              name="birth"
              onChange={formik.handleChange}
              value={formik.values["birth"]}
              onBlur={formik.handleBlur}
            />
            {formik.touched["birth"] && formik.errors["birth"] ? (
              <div style={{ color: "red", fontSize: ".8rem" }}>
                {formik.errors["birth"]}
              </div>
            ) : null}
          </div>
        </div>
        <div className="input-group mb-8">
          <label
            htmlFor="sp-phone-number"
            className="block mb-2 text-sm font-bold"
          >
            {t("yourPhone")}
          </label>
          <input
            type="number"
            id="sp-phone-number"
            className="border border-gray-500 text-sm rounded-lg block w-full p-[14px] outline-none dark:bg-[#242424] dark:text-white"
            required
            name="phone"
            onChange={formik.handleChange}
            value={formik.values["phone"]}
            onBlur={formik.handleBlur}
          />
          {formik.touched["phone"] && formik.errors["phone"] ? (
            <div style={{ color: "red", fontSize: ".8rem" }}>
              {formik.errors["phone"]}
            </div>
          ) : null}
        </div>
        <div className="input-group mb-8">
          <label htmlFor="sp-password" className="block mb-2 text-sm font-bold">
            {t("yourPass")}
          </label>
          <div className="relative">
            <input
              type={isShow ? "text" : "password"}
              id="sp-password"
              className="border border-gray-500 text-sm rounded-lg block w-full p-[14px] pl-[52px] outline-none dark:bg-[#242424] dark:text-white"
              required
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
            {formik.touched["password"] && formik.errors["password"] ? (
              <div style={{ color: "red", fontSize: ".8rem" }}>
                {formik.errors["password"]}
              </div>
            ) : null}
          </div>
        </div>

        <button
          className="text-white bg-[#4285F4] text-2xl shadow-[0_4px_30px_rgba(38,58,67,0.15)] hover:bg-blue-800 font-medium rounded-lg w-full px-5 py-4 text-center mt-2.5"
          disabled={!formik.isValid}
        >
          {t("register")}
        </button>
      </form>
    </div>
  );
};

export default Signup;

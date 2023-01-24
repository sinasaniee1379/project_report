import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { chengeLan } from "../action/translation/translation";
import { darkMode } from "../action/user/user";
const Admin = () => {
  const dispatch = useDispatch();
  const { isTraslate } = useSelector((state) => state.translate);
  const { isDark } = useSelector((state) => state.user);
  const { t, i18n } = useTranslation();
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
    <div className="app bg-white dark:bg-[#242424] dark:text-white">
      <header className="main-header flex justify-between items-center min-h-[84px] bg-[#4285f4]">
        <div className="container">
          <div className="flex justify-between">
            <div className="header-right flex items-center">
              <div className="header-logo h-7">
                <img
                  className="w-full h-full object-contain"
                  src="/img/main-logo.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="header-left flex items-center">
              <div className="header-user flex items-center">
                <div className="header-user-img ml-4 w-12 h-12 object-cover overflow-hidden rounded-full border border-white">
                  <img src="/img/user-profile.svg" alt="" />
                </div>
                <div className="header-user-name">
                  <h4 className="font-iryekan text-xl text-white">
                    محمد آقایی
                  </h4>
                </div>
              </div>
              <div className="header-theme-mode mr-5 md:mr-16">
                <button
                  className="grid place-items-center"
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
              </div>
              <div className="header-logout flex items-center mr-5">
                <p
                  className="cursor-pointer flex items-center font-bold text-white ml-5"
                  onClick={changeLanguageHandler}
                >
                  {isTraslate ? "EN" : "FA"}
                </p>
                <Link to={"/"} className="flex items-center" href="">
                  <img
                    src="/img/finger-cricle.png"
                    alt=""
                    style={{ marginLeft: "10px" }}
                  />
                  <h4 className="font-iryekan text-xl text-white">
                    {t("exit")}
                  </h4>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="profile mt-14 py-6">
        <div className="container">
          <div className="section-title mb-8">
            <h4 className="font-iryekan text-2xl text-[#4285F4]">
              {t("specification")}
            </h4>
          </div>

          <div className="profile-content">
            <div className="user-profile flex">
              <div className="user-picture w-24 h-32 rounded-md overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="/img/user-profile.svg"
                  alt=""
                />
              </div>
              <div className="user-information flex gap-x-7 mr-7">
                <div className="user-information-keys font-iryekan h-full flex flex-col justify-between">
                  <h5 className="text-lg">{t("fullName")}:</h5>
                  <h5 className="text-lg">{t("position")} :</h5>
                  <h5 className="text-lg">{t("section")} :</h5>
                </div>
                <div className="user-information-values font-iryekan h-full flex flex-col justify-between">
                  <h5 className="text-[#808080]">مجتبی حکیمیان</h5>
                  <h5 className="text-[#808080]">مدیر</h5>
                  <h5 className="text-[#808080]">نرم افزار اصفهان</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="people-history mt-14 py-6">
        <div className="container">
          <div className="section-title mb-8">
            <h4 className="font-iryekan text-2xl text-[#4285F4]">
              {t("searchHistory")}
            </h4>
          </div>

          <div className="people-history-filter">
            <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8 font-iryekan">
              <select
                id=""
                className="border border-gray-400 text-gray-500 text-sm rounded-lg block p-1 min-w-[100px] flex-grow md:p-2 dark:bg-[#242424]"
              >
                <option selected>{t("position")}</option>
                <option value="all">همه افراد</option>
              </select>
              <select
                id=""
                className="border border-gray-400 text-gray-500 text-sm rounded-lg block p-1 min-w-[100px] flex-grow md:p-2 dark:bg-[#242424]"
              >
                <option selected>{t("day")}</option>
                <option value="all">۱۴</option>
              </select>
              <select
                id=""
                className="border border-gray-400 text-gray-500 text-sm rounded-lg block p-1 min-w-[100px] flex-grow md:p-2 dark:bg-[#242424]"
              >
                <option selected>{t("month")}</option>
                <option value="all">آذر</option>
              </select>
              <select
                id=""
                className="border border-gray-400 text-gray-500 text-sm rounded-lg block p-1 min-w-[100px] flex-grow md:p-2 dark:bg-[#242424]"
              >
                <option selected>{t("year")}</option>
                <option value="all">۱۴۰۱</option>
              </select>
              <button className="bg-[#4285F4] text-white rounded-lg p-1 min-w-[100px] flex-grow md:p-2">
                {t("filter")}
              </button>
            </div>
          </div>

          <div className="people-history-table mt-8">
            <table className="ma-normal-table">
              <thead>
                <tr>
                  <th>{t("undersupervision")}</th>
                  <th>{t("position")}</th>
                  <th>{t("date")}</th>
                  <th>{t("report")}</th>
                  <th>{t("scoreC")}</th>
                  <th>{t("scoreB")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>سینا صنیعی</td>
                  <td>کارمند</td>
                  <td>۱۴۰۱/۰۴/۰۴</td>
                  <td>گزارش</td>
                  <td>۳۰</td>
                  <td>۳۰</td>
                </tr>
                <tr>
                  <td>سینا صنیعی</td>
                  <td>کارمند</td>
                  <td>۱۴۰۱/۰۴/۰۴</td>
                  <td>گزارش</td>
                  <td>۳۰</td>
                  <td>۳۰</td>
                </tr>
                <tr>
                  <td>سینا صنیعی</td>
                  <td>کارمند</td>
                  <td>۱۴۰۱/۰۴/۰۴</td>
                  <td>گزارش</td>
                  <td>۳۰</td>
                  <td>۳۰</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="presence mt-14 py-6">
        <div className="container">
          <div className="section-title mb-8">
            <h4 className="font-iryekan text-2xl text-[#4285F4]">
              {t("leave&absence")}
            </h4>
          </div>

          <div className="people-history-table mt-8">
            <table className="ma-unborder-table">
              <thead>
                <tr>
                  <th>{t("undersupervision")}</th>
                  <th>{t("position")}</th>
                  <th>{t("section")}</th>
                  <th>{t("reason")}</th>
                  <th className="w-1/5">{t("report")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center gap-x-1 justify-center">
                      <div className="person-picture w-7 h-7 rounded-full overflow-hidden">
                        <img
                          className="object-cover"
                          src="/img/user-profile.svg"
                          alt=""
                        />
                      </div>
                      <div className="person-name text-xs text-gray-500">
                        سینا صنیعی
                      </div>
                    </div>
                  </td>
                  <td>کارمند</td>
                  <td>نرم افزار اصفهان</td>
                  <td>
                    <div className="reason">
                      <div className="flex items-center w-fit mx-auto">
                        <div className="flex items-center ml-2">
                          <label
                            htmlFor=""
                            className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            مرخصی
                          </label>
                          <input
                            checked
                            id=""
                            type="checkbox"
                            value=""
                            className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300"
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor=""
                            className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            غیبت
                          </label>
                          <input
                            checked
                            id=""
                            type="checkbox"
                            value=""
                            className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="report">
                      <div className="flex items-center w-fit mx-auto">
                        <textarea
                          className="border h-10 max-h-20 border-gray-400 rounded-md p-2.5 scrollbar-hide dark:bg-[#242424] dark:text-white"
                          type="text"
                        ></textarea>
                        <button className="bg-[#4285F4] text-white p-2.5 px-8 mr-2 rounded-md">
                          {t("record")}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="flex items-center gap-x-1 justify-center">
                      <div className="person-picture w-7 h-7 rounded-full overflow-hidden">
                        <img
                          className="object-cover"
                          src="/img/user-profile.svg"
                          alt=""
                        />
                      </div>
                      <div className="person-name text-xs text-gray-500">
                        سینا صنیعی
                      </div>
                    </div>
                  </td>
                  <td>کارمند</td>
                  <td>نرم افزار اصفهان</td>
                  <td>
                    <div className="reason">
                      <div className="flex items-center w-fit mx-auto">
                        <div className="flex items-center ml-2">
                          <label
                            htmlFor=""
                            className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            مرخصی
                          </label>
                          <input
                            checked
                            id=""
                            type="checkbox"
                            value=""
                            className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300"
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor=""
                            className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            غیبت
                          </label>
                          <input
                            checked
                            id=""
                            type="checkbox"
                            value=""
                            className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="report">
                      <div className="flex items-center w-fit mx-auto">
                        <textarea
                          className="border h-10 max-h-20 border-gray-400 rounded-md p-2.5 scrollbar-hide dark:bg-[#242424] dark:text-white"
                          type="text"
                        ></textarea>
                        <button className="bg-[#4285F4] text-white p-2.5 px-8 mr-2 rounded-md">
                          {t("record")}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="flex items-center gap-x-1 justify-center">
                      <div className="person-picture w-7 h-7 rounded-full overflow-hidden">
                        <img
                          className="object-cover"
                          src="/img/user-profile.svg"
                          alt=""
                        />
                      </div>
                      <div className="person-name text-xs text-gray-500">
                        سینا صنیعی
                      </div>
                    </div>
                  </td>
                  <td>کارمند</td>
                  <td>نرم افزار اصفهان</td>
                  <td>
                    <div className="reason">
                      <div className="flex items-center w-fit mx-auto">
                        <div className="flex items-center ml-2">
                          <label
                            htmlFor=""
                            className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            مرخصی
                          </label>
                          <input
                            checked
                            id=""
                            type="checkbox"
                            value=""
                            className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300"
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor=""
                            className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            غیبت
                          </label>
                          <input
                            checked
                            id=""
                            type="checkbox"
                            value=""
                            className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="report">
                      <div className="flex items-center w-fit mx-auto">
                        <textarea
                          className="border h-10 max-h-20 border-gray-400 rounded-md p-2.5 scrollbar-hide dark:bg-[#242424] dark:text-white"
                          type="text"
                        ></textarea>
                        <button className="bg-[#4285F4] text-white p-2.5 px-8 mr-2 rounded-md">
                          {t("record")}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="scoring mt-14 py-6">
        <div className="container">
          <div className="section-title mb-8">
            <h4 className="font-iryekan text-2xl text-[#4285F4]">
              {t("ratingpeoplesupervision")}
            </h4>
          </div>

          <div className="scoring-table overflow-x-auto mt-8">
            <table className="ma-unborder-table">
              <thead className="text-[#4285f4]">
                <tr>
                  <th>{t("undersupervision")}</th>
                  <th>{t("position")}</th>
                  <th>{t("date")}</th>
                  <th>{t("scoreC")}</th>
                  <th>امتیاز کارمندان به یکدیگر</th>
                  <th>امتیاز کاربر به مدیر</th>
                  <th className="w-1/5">{t("yourScore")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center gap-x-1 justify-center">
                      <div className="person-picture w-7 h-7 rounded-full overflow-hidden">
                        <img
                          className="object-cover"
                          src="/img/user-profile.svg"
                          alt=""
                        />
                      </div>
                      <div className="person-name text-xs text-gray-500">
                        سینا صنیعی
                      </div>
                    </div>
                  </td>
                  <td>کارمند</td>
                  <td>۱۴۰۱/۰۴/۰۴</td>
                  <td>۲۰</td>
                  <td>
                    <div className="bg-lock flex justify-center items-end pb-[2px] text-gray-500">
                      ۲۰
                    </div>
                  </td>
                  <td>
                    <div className="bg-lock flex justify-center items-end pb-[2px] text-gray-500">
                      ۴۰
                    </div>
                  </td>
                  <td>
                    <a
                      className="flex items-center w-fit mx-auto text-md text-[#4285f4]"
                      href=""
                    >
                      <img
                        src="/img/frame.png"
                        alt=""
                        style={{ marginLeft: "15px" }}
                      />
                      {t("see")}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="flex items-center gap-x-1 justify-center">
                      <div className="person-picture w-7 h-7 rounded-full overflow-hidden">
                        <img
                          className="object-cover"
                          src="/img/user-profile.svg"
                          alt=""
                        />
                      </div>
                      <div className="person-name text-xs text-gray-500">
                        سینا صنیعی
                      </div>
                    </div>
                  </td>
                  <td>کارمند</td>
                  <td>۱۴۰۱/۰۴/۰۴</td>
                  <td>۲۰</td>
                  <td>
                    <div className="bg-lock flex justify-center items-end pb-[2px] text-gray-500">
                      ۲۰
                    </div>
                  </td>
                  <td>
                    <div className="bg-lock flex justify-center items-end pb-[2px] text-gray-500">
                      ۴۰
                    </div>
                  </td>
                  <td>
                    <a
                      className="flex items-center w-fit mx-auto text-md text-[#4285f4]"
                      href=""
                    >
                      <img
                        src="/img/frame.png"
                        alt=""
                        style={{ marginLeft: "15px" }}
                      />
                      {t("see")}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="final-score mt-14 py-6">
        <div className="container">
          <div className="section-title mb-8">
            <h4 className="font-iryekan text-2xl text-[#4285F4]">
              {t("finalScore")}
            </h4>
          </div>

          <div className="final-score-filter">
            <div className="h-11 flex items-center gap-x-8 font-iryekan">
              <select
                id=""
                className="border border-gray-400 text-gray-500 text-sm rounded-lg block p-1 min-w-[100px] flex-grow md:p-2 dark:bg-[#242424]"
              >
                <option selected>{t("month")}</option>
                <option value="all">آذر</option>
              </select>
              <select
                id=""
                className="border border-gray-400 text-gray-500 text-sm rounded-lg block p-1 min-w-[100px] flex-grow md:p-2 dark:bg-[#242424]"
              >
                <option selected>{t("year")}</option>
                <option value="all">۱۴۰۱</option>
              </select>
              <button className="bg-[#4285F4] text-white rounded-lg p-1 min-w-[100px] flex-grow md:p-2">
                {t("filter")}
              </button>
            </div>
          </div>

          <div className="final-score-table mt-8">
            <table className="ma-unborder-table">
              <thead>
                <tr>
                  <th>{t("undersupervision")}</th>
                  <th>{t("position")}</th>
                  <th>{t("avg")} </th>
                  <th>{t("scoreMonth")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center gap-x-1 justify-center">
                      <div className="person-picture w-7 h-7 rounded-full overflow-hidden">
                        <img
                          className="object-cover"
                          src="/img/user-profile.svg"
                          alt=""
                        />
                      </div>
                      <div className="person-name text-xs text-gray-500">
                        سینا صنیعی
                      </div>
                    </div>
                  </td>
                  <td>کارمند</td>
                  <td>۲۰</td>
                  <td>
                    <a
                      className="flex items-center w-fit mx-auto text-md text-[#4285f4]"
                      href=""
                    >
                      <img
                        src="/img/frame.png"
                        alt=""
                        style={{ marginLeft: "15px" }}
                      />
                      {t("see")}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="flex items-center gap-x-1 justify-center">
                      <div className="person-picture w-7 h-7 rounded-full overflow-hidden">
                        <img
                          className="object-cover"
                          src="/img/user-profile.svg"
                          alt=""
                        />
                      </div>
                      <div className="person-name text-xs text-gray-500">
                        سینا صنیعی
                      </div>
                    </div>
                  </td>
                  <td>کارمند</td>
                  <td>۲۰</td>
                  <td>
                    <a
                      className="flex items-center w-fit mx-auto text-md text-[#4285f4]"
                      href=""
                    >
                      <img
                        src="/img/frame.png"
                        alt=""
                        style={{ marginLeft: "15px" }}
                      />
                      {t("see")}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="scores-boxes font-iryekan my-14">
            <div className="flex justify-between items-stretch">
              <div className="score-box grid place-items-center w-44 h-20 bg-[#4285f4] text-white rounded-lg">
                <div className="flex flex-col items-center">
                  <h4 className="mb-1">۳۴</h4>
                  <h5>{t("maximum")}</h5>
                </div>
              </div>
              <div className="score-box grid place-items-center w-44 h-20 bg-[#4285f4] text-white rounded-lg">
                <div className="flex flex-col items-center">
                  <h4 className="mb-1">۴۱</h4>
                  <h5>{t("lowest")}</h5>
                </div>
              </div>
              <div className="score-box grid place-items-center w-44 h-20 bg-[#4285f4] text-white rounded-lg">
                <div className="flex flex-col items-center">
                  <h4 className="mb-1">۷۰</h4>
                  <h5>{t("avgScore")}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#4285f4]">
        <div className="copyright font-iryekan text-white text-sm p-2 text-center">
          <h6>{t("copyRight")}</h6>
        </div>
      </footer>
    </div>
  );
};

export default Admin;

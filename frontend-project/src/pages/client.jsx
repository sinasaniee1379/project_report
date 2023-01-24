import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { chengeLan } from "../action/translation/translation";
import { logoutUser } from "../action/user/user";
import { darkMode } from "../action/user/user";
import Modal from "../components/modal";
import { toast } from "react-hot-toast";

const Client = () => {
  const dispatch = useDispatch();
  const { fullname, position, id, isDark } = useSelector((state) => state.user);
  const [text, setText] = useState("");
  const [score, setScore] = useState("");
  const [partner, setPartner] = useState("");
  const [partnerScore, setPartnerScore] = useState("");
  const [type, setType] = useState("");
  const { t, i18n } = useTranslation();
  const { isTraslate } = useSelector((state) => state.translate);
  const [report, setReport] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reportText, setReportText] = useState("");
  const navigate = useNavigate();
  const handleSend = async () => {
    const date = new Date().toLocaleDateString("fa-IR");

    const sendReport = {
      id,
      score,
      text,
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/reportUser",
      sendReport
    );
    console.log(data);
    setReport(data);
    setText("");
    setScore("");
    toast.success("گزارش ثبت شد");
  };
  const changeLanguageHandler = (e) => {
    dispatch(chengeLan());
    console.log(isTraslate);
    if (isTraslate) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("fa");
    }
  };

  const handleGetReport = async () => {
    console.log(id);
    const { data } = await axios.get(`http://localhost:5000/api/report`, {
      params: { id },
    });
    setReport(data);
  };

  const handleLogout = async () => {
    const { data } = await axios.delete("http://localhost:5000/api/logout", id);
    data.status && dispatch(logoutUser());
    navigate("/");
  };

  const handleModal = (text) => {
    console.log(text);
    setOpenModal(true);
    setReportText(text);
  };

  useEffect(() => {
    handleGetReport();
  }, []);
  return (
    <>
      {openModal && (
        <Modal text={reportText} open={openModal} setOpen={setOpenModal} />
      )}
      <div className="app bg-white dark:bg-[#242424] dark:text-white">
        <header className="main-header flex justify-between items-center min-h-[65px] bg-[#4285f4] md:min-h-[84px]">
          <div className="container">
            <div className="flex justify-between">
              <div className="header-right flex items-center">
                <div className="header-logo h-9 md:h-10">
                  <img
                    className="w-full h-full object-contain"
                    src="/img/main-logo.svg"
                    alt=""
                  />
                </div>
              </div>
              <div className="header-left flex items-center">
                <div className="header-user flex items-center">
                  <div className="header-user-img w-9 h-9 aspect-square ml-4 object-cover overflow-hidden rounded-full border border-white md:w-12 md:h-12">
                    <img
                      className="w-full h-full object-cover"
                      src="/img/user-profile.svg"
                      alt=""
                    />
                  </div>
                  <div className="header-user-name">
                    <h4 className="font-iryekan text-base md:text-xl text-white">
                      {fullname}
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
                <div className="header-logout flex items-center mr-5 md:mr-5">
                  <p
                    className="cursor-pointer flex items-center font-bold text-white ml-5"
                    onClick={changeLanguageHandler}
                  >
                    {isTraslate ? "EN" : "FA"}
                  </p>
                  <div className="flex items-center" onClick={handleLogout}>
                    <img
                      src="/img/finger-cricle.png"
                      alt=""
                      style={{ marginLeft: "10px" }}
                    />
                    <h4 className="font-iryekan text-xl text-white">
                      {t("exit")}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section>
          <div className="container">
            <div className="md:grid md:grid-cols-2 md:gap-x-7 lg:gap-x-14">
              <div className="right-section">
                <div className="profile mt-7 lg:mt-14 py-6">
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
                      <div className="user-information flex gap-x-2 lg:gap-x-7 mr-7">
                        <div className="user-information-keys font-iryekan h-full flex flex-col justify-between">
                          <h5 className="text-sm sm:text-sm lg:text-lg">
                            {t("fullName")}:
                          </h5>
                          <h5 className="text-sm sm:text-sm lg:text-lg">
                            {t("position")} :
                          </h5>
                          <h5 className="text-sm sm:text-sm lg:text-lg">
                            {t("section")} :
                          </h5>
                        </div>
                        <div className="user-information-values font-iryekan h-full flex flex-col justify-between">
                          <h5 className="text-[#808080] text-sm sm:text-sm lg:text-base">
                            {fullname}
                          </h5>
                          <h5 className="text-[#808080] text-sm sm:text-sm lg:text-base">
                            {position}
                          </h5>
                          <h5 className="text-[#808080] text-sm sm:text-sm lg:text-base">
                            اصفهان
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="month-report mt-7 lg:mt-14 py-6">
                  <div className="section-title mb-8">
                    <h4 className="font-iryekan text-2xl text-[#4285F4]">
                      {t("reportMonth")}
                    </h4>
                  </div>

                  <div className="month-report-table overflow-x-auto mt-8">
                    <table className="ma-unborder-table">
                      <thead>
                        <tr>
                          <th>{t("date")}</th>
                          <th>{t("score")}</th>
                          <th>{t("report")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report?.map((item, index) => (
                          <tr key={index}>
                            <td className="border-b border-gray-400">
                              {item.date}
                            </td>
                            <td className="border-b border-gray-400">
                              {item.score}
                            </td>
                            <td className="border-b border-gray-400">
                              <p
                                className="flex items-center w-fit mx-auto text-md text-[#4285f4]"
                                onClick={() => handleModal(item.text)}
                              >
                                <img
                                  src="/img/frame.png"
                                  alt=""
                                  style={{ marginLeft: "15px" }}
                                />
                                {t("see")}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="left-section">
                <div className="day-report mt-7 lg:mt-14 py-6">
                  <div className="section-title mb-8">
                    <h4 className="font-iryekan text-2xl text-[#4285F4]">
                      {t("dayReport")}
                    </h4>
                  </div>

                  <div className="day-report-textarea mt-8 font-iryekan">
                    <div className="day-report-label font-iryekan">
                      <div className="flex items-center justify-between mb-6">
                        <h5>{t("description")} :</h5>

                        <div className="flex flex-wrap">
                          <div className="flex items-center mr-4">
                            <input
                              id="daily-radio"
                              type="radio"
                              value="day"
                              name="report-radio"
                              className="w-4 h-4 bg-gray-100 border-gray-300"
                              onChange={(e) => setType(e.target.value)}
                            />
                            <label
                              for="daily-radio"
                              className="ml-2 text-sm font-medium text-gray-900 pr-2 dark:text-white"
                            >
                              {t("daily")}
                            </label>
                          </div>
                          <div className="flex items-center mr-4">
                            <input
                              id="weekly-radio"
                              type="radio"
                              value="week"
                              name="report-radio"
                              className="w-4 h-4 bg-gray-100 border-gray-300"
                              onChange={(e) => setType(e.target.value)}
                            />
                            <label
                              for="weekly-radio"
                              className="ml-2 text-sm font-medium text-gray-900 pr-2 dark:text-white"
                            >
                              {t("monthly")}
                            </label>
                          </div>
                          <div className="flex items-center mr-4">
                            <input
                              id="monthly-radio"
                              type="radio"
                              value="month"
                              name="report-radio"
                              className="w-4 h-4 bg-gray-100 border-gray-300"
                              onChange={(e) => setType(e.target.value)}
                            />
                            <label
                              for="monthly-radio"
                              className="ml-2 text-sm font-medium text-gray-900 pr-2 dark:text-white"
                            >
                              {t("yearly")}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <textarea
                      className="w-full border border-gray-400 rounded-lg mb-6 p-2 dark:bg-[#242424] dark:text-white"
                      name=""
                      id=""
                      rows="10"
                      placeholder="توضیحات ..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <div className="my-score">
                      <div className="give-score">
                        <div className="flex justify-between items-center font-iryekan gap-4">
                          <h6>{t("whatScore")}</h6>
                          <input
                            className="border border-gray-400 rounded-lg p-2.5 w-14 dark:bg-[#242424] dark:text-white"
                            type="number"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                          />
                          <button
                            onClick={handleSend}
                            className="bg-[#4285F4] text-white rounded-lg w-1/3 self-stretch"
                          >
                            {t("record")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="scoring-employees mt-7 lg:mt-14 py-6">
                  <div className="section-title mb-8">
                    <h4 className="font-iryekan text-2xl text-[#4285F4]">
                      {t("whatScoreToEmployee")}
                    </h4>
                  </div>

                  <div className="employees-score">
                    <div className="give-score">
                      <div className="flex justify-between items-center font-iryekan gap-4">
                        <input
                          className="border border-gray-400 rounded-lg p-2.5 dark:bg-[#242424] dark:text-white"
                          type="text"
                          placeholder="نام همکار خود را وارد کنید"
                          value={partner}
                          onChange={(e) => setPartner(e.target.value)}
                        />
                        <input
                          className="border border-gray-400 rounded-lg p-2.5 w-16 dark:bg-[#242424] dark:text-white"
                          type="number"
                          placeholder="امتیاز"
                          value={partnerScore}
                          onChange={(e) => setPartnerScore(e.target.value)}
                        />
                        <button className="bg-[#4285F4] text-white rounded-lg w-1/3 self-stretch">
                          {t("record")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="scores mt-7 lg:mt-14 py-6">
                  <div className="scores-boxes text-center font-iryekan">
                    <div className="flex justify-between items-stretch gap-4">
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
    </>
  );
};

export default Client;

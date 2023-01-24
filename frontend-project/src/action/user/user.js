export const userRegisterInfo = (data) => {
  console.log(data);
  return {
    type: "USER_REGISTER_INFO",
    payload: data,
  };
};

export const userLoginInfo = (data) => {
  return {
    type: "USER_LOGIN_INFO",
    payload: data,
  };
};

export const darkMode = () => {
  return {
    type: "DARK_MODE",
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT",
  };
};

export const loginClient = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const loginAdmin = () => {
  return {
    type: "ADMIN",
  };
};

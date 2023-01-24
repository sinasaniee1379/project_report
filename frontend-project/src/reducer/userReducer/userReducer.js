const initialState = {
  level: "",
  username: "",
  fullname: "",
  id: "",
  birth: "",
  phone: "",
  isAuthenticated: false,
  position: "",
  isDark: false,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_REGISTER_INFO":
      return {
        ...state,
        level: action.payload.level,
        username: action.payload.username,
        fullname: action.payload.fullname,
        id: action.payload.id,
        birth: action.payload.birth,
        phone: action.payload.phone,
        isAuthenticated: true,
        position: "کارمند",
      };

    case "USER_LOGIN_INFO":
      return {
        level: action.payload.level,
        username: action.payload.username,
        fullname: action.payload.fullname,
        id: action.payload.id,
        birth: action.payload.birth,
        phone: action.payload.phone,
        isAuthenticated: true,
        position: "کارمند",
      };
    case "DARK_MODE":
      return {
        isDark: !state.isDark,
      };

    case "LOGIN":
      const { id } = action.payload;
      return { ...state, isAuthenticated: true, isAdmin: false, id };

    case "LOGOUT":
      return { isAuthenticated: false };
    case "ADMIN":
      return { ...state, isAuthenticated: true, isAdmin: true };
    default:
      return state;
  }
};

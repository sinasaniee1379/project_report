import { combineReducers } from "redux";
import { AuthReducer } from "./authReducer/auth";
import { TranslateReducer } from "./translationReducer/traslationReducer";
import { UserReducer } from "./userReducer/userReducer";

export const reducers = combineReducers({
  user: UserReducer,
  auth: AuthReducer,
  translate: TranslateReducer,
});

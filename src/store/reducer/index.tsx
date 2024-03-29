import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { supplierReducer } from "./supplierReducer";

const reducers = combineReducers({
  auth: authReducer,
  supplier:supplierReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;

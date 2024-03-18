import { createStore, applyMiddleware, AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import reducers from "./reducer";
import { useDispatch } from "react-redux";

export const store = createStore(reducers, {}, applyMiddleware(thunk));
export type ReduxState = ReturnType<typeof reducers>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

export type AppDispatch = TypedDispatch;
const useAppDispatch: () => AppDispatch = useDispatch;
export const useDispatchApp = useAppDispatch;

import { UserAuth } from "../action/types";
import {
  AUTH_TOKEN,
  RESET_DATA,
  USER_DETAILS
} from "../action/actionTypes";

const initialState: UserAuth = {
  token: "",
  userDetails:{}
};
export function authReducer(
  state: UserAuth = initialState,
  action: any
): UserAuth {
  switch (action.type) {
    case AUTH_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
    case RESET_DATA: {
      return initialState;
    }
    default:
      return state;
  }
}

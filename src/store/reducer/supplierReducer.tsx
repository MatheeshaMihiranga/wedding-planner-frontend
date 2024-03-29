import { SupplierData } from "../action/types";
import {
  RESET_DATA,
  SUPPLIER_DATA,
  USER_DETAILS
} from "../action/actionTypes";

const initialState: SupplierData = {
  supplierData:[]
};
export function supplierReducer(
  state: SupplierData = initialState,
  action: any
): SupplierData {
  switch (action.type) {
    case SUPPLIER_DATA: {
      return {
        ...state,
        supplierData: action.payload,
      };
    }
    case RESET_DATA: {
      return initialState;
    }
    default:
      return state;
  }
}

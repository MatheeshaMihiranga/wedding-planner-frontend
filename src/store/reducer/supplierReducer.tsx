import { SupplierData } from "../action/types";
import {
  RESET_DATA,
  SUPPLIER_DATA,
  SUPPLIER_FILTER_DATA,
  SUPPLIER_REVIEWS,
  SUPPLIER_SEARCH_DATA,
  SUPPLIER_ENQUIRE,
  USER_MY_SUPPLIER
} from "../action/actionTypes";

const initialState: SupplierData = {
  supplierData: [],
  supplierReview: [],
  supplierEnquire:[],
  mySupplier:[],
  supplierFilterData: {
    type: "",
    location: null,
    maxCount: null,
    date: null,
  },
  supplierSearchData: [],
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
    case SUPPLIER_FILTER_DATA: {
      return {
        ...state,
        supplierFilterData: action.payload,
      };
    }
    case SUPPLIER_SEARCH_DATA: {
      return {
        ...state,
        supplierSearchData: action.payload,
      };
    }
    case SUPPLIER_REVIEWS: {
      return {
        ...state,
        supplierReview: action.payload,
      };
    }
    case SUPPLIER_ENQUIRE: {
      return {
        ...state,
        supplierEnquire: action.payload,
      };
    }
    case USER_MY_SUPPLIER: {
      return {
        ...state,
        mySupplier: action.payload,
      };
    }
    case RESET_DATA: {
      return initialState;
    }
    default:
      return state;
  }
}

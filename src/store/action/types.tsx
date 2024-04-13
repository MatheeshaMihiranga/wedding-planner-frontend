export interface UserAuth {
  token: string;
  userDetails: any;
}

export interface SupplierData {
  supplierData: any;
  supplierReview:any;
  supplierEnquire:any;
  mySupplier:any;
  checkList:any;
  supplierFilterData: {
    type: string;
    location: string | null;
    maxCount: any | null;
    date: string | null;
  };
  supplierSearchData:any
}

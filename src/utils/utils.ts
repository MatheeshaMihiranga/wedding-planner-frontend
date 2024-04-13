import { isEmpty } from "lodash";

export const getCompanyLogo = (theme: any) => {
  switch (theme) {
    case "BLUE":
      return require("../assets/images/logo.png");
    default:
      return require("../assets/images/dashboard.png");
  }
};

export const getSupplierPackageEnable = (type: any) => {
  switch (type) {
    case "BLUE":
      return require("../assets/images/logo.png");
    default:
      return require("../assets/images/dashboard.png");
  }
};

export const formatDate = (dateValue: any) => {
  const date = new Date(dateValue);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const handleDashBoard = (
  userRole: any,
  userDetails: any,
  navigate: any
) => {
  if (userRole === "user") {
    navigate(`/user-dashboard/${userDetails._id}`);
  } else if (userRole === "supplier") {
    if (isEmpty(userDetails?.supplierId?.categoryType)) {
      navigate(`/supplier/categoryList`);
    } else {
      navigate(`/supplier-dashboard/${userDetails.supplierId?._id}`);
    }
  } else {
    navigate(`/dashboard`);
  }
};

export const generateReadableMonthYearListMoreThanYear = (inputDate: any) => {
  const monthYearSet = new Set();
  const currentDate = new Date(inputDate);

  // Month names array for mapping month index to month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Calculate start date (1 year before the input date)
  const startDate = new Date(inputDate);
  startDate.setFullYear(startDate.getFullYear() - 1);

  // Iterate through each month from start date up to the input date
  while (startDate <= currentDate) {
    const monthIndex = startDate.getMonth(); // Month index (0-indexed)
    const year = startDate.getFullYear(); // Full year

    // Construct the readable month-year format (e.g., "2024 May")
    const monthYear = `${year} ${monthNames[monthIndex]}`;

    // Add to the set
    monthYearSet.add(monthYear);

    // Move to the next month
    startDate.setMonth(startDate.getMonth() + 1);
  }

  // Convert the set to an array and return
  return Array.from(monthYearSet);
};

function generateReadableMonthYearList(startDate:Date,endDate:Date) {
  const monthYearSet = new Set();
  const currentDate = new Date(startDate);

  // Month names array for mapping month index to month name
  const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];

  // Iterate through each month until the end date
  while (currentDate <= endDate) {
      const monthIndex = currentDate.getMonth(); // Month index (0-indexed)
      const year = currentDate.getFullYear(); // Full year

      // Construct the readable month-year format (e.g., "2024 May")
      const monthYear = `${year} ${monthNames[monthIndex]}`;

      // Add to the set
      monthYearSet.add(monthYear);

      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
  }

  // Convert the set to an array and return
  return Array.from(monthYearSet);
}

const isMoreThanOneYearApart = (date: any) => {
  const givenDate = new Date(date);
  const now = new Date();
  
  // Create a new date object that is one year from now
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  
  if (givenDate > oneYearFromNow) {
    return true
  } else {
    return false
  }
};


export const getYearMonthDetails = (givenData:any) =>{
  const checkGivenDateIsMoreThanYear = isMoreThanOneYearApart(givenData)
  if(checkGivenDateIsMoreThanYear){
    return  generateReadableMonthYearListMoreThanYear(givenData)
  }else{
    const currentDate = new Date();
    const getDateByFormat = formatDate(currentDate)
    return  generateReadableMonthYearList(new Date(getDateByFormat),new Date(givenData))
  }

}
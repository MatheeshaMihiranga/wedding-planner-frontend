import { images } from "../assets/images";
import { getCompanyLogo } from "../utils/utils";

const API_URL = "http://localhost:4005";

const THEME = "BLUE";
const LOGO = getCompanyLogo(THEME);

const USER_TYPE = [
  {
    key: 1,
    text: "Supplier",
    value: "supplier",
  },
  {
    key: 2,
    text: "User",
    value: "user",
  },
];

const RATING = [
  {
    key: 5,
    text: 5,
    value: 5,
  },
  {
    key: 4,
    text: 4,
    value: 4,
  },
  {
    key: 3,
    text: 3,
    value: 3,
  },
  {
    key: 2,
    text: 2,
    value: 2,
  },
  {
    key: 1,
    text: 1,
    value: 1,
  },
];

const Packages = [
  { key: 1, text: 100, value: 100 },
  { key: 2, text: 150, value: 150 },
  { key: 3, text: 200, value: 200 },
  { key: 4, text: 250, value: 250 },
  { key: 5, text: 300, value: 300 },
  { key: 6, text: 350, value: 350 },
  { key: 7, text: 400, value: 400 },
  { key: 8, text: 450, value: 450 },
  { key: 9, text: 500, value: 500 },
  { key: 10, text: 550, value: 550 },
  { key: 11, text: 600, value: 600 },
  { key: 12, text: 650, value: 650 },
  { key: 13, text: 700, value: 700 },
];

const Districts = [
  { key: 1, text: "Ampara", value: "Ampara" },
  { key: 2, text: "Anuradhapura", value: "Anuradhapura" },
  { key: 3, text: "Badulla", value: "Badulla" },
  { key: 4, text: "Batticaloa", value: "Batticaloa" },
  { key: 5, text: "Colombo", value: "Colombo" },
  { key: 6, text: "Galle", value: "Galle" },
  { key: 7, text: "Gampaha", value: "Gampaha" },
  { key: 8, text: "Hambantota", value: "Hambantota" },
  { key: 9, text: "Jaffna", value: "Jaffna" },
  { key: 10, text: "Kalutara", value: "Kalutara" },
  { key: 11, text: "Kandy", value: "Kandy" },
  { key: 12, text: "Kegalle", value: "Kegalle" },
  { key: 13, text: "Kilinochchi", value: "Kilinochchi" },
  { key: 14, text: "Kurunegala", value: "Kurunegala" },
  { key: 15, text: "Mannar", value: "Mannar" },
  { key: 16, text: "Matale", value: "Matale" },
  { key: 17, text: "Matara", value: "Matara" },
  { key: 18, text: "Monaragala", value: "Monaragala" },
  { key: 19, text: "Mullaitivu", value: "Mullaitivu" },
  { key: 20, text: "Nuwara Eliya", value: "Nuwara Eliya" },
  { key: 21, text: "Polonnaruwa", value: "Polonnaruwa" },
  { key: 22, text: "Puttalam", value: "Puttalam" },
  { key: 23, text: "Ratnapura", value: "Ratnapura" },
  { key: 24, text: "Trincomalee", value: "Trincomalee" },
  { key: 25, text: "Vavuniya", value: "Vavuniya" },
];

const UnavailableDates = [
  {
    name: "Date",
    col: 14,
  },
  {
    name: "",
    col: 2,
  },
];

const WeddingVenues = [
  {
    name: "Packaging Name",
    col: 3,
  },
  {
    name: "Hall Name",
    col: 3,
  },
  {
    name: "Max Count",
    col: 3,
  },
  {
    name: "Price",
    col: 3,
  },
  {
    name: "",
    col: 4,
  },
];

const WeddingVenuesDetails = [
  {
    name: "Packaging Name",
    col: 3,
  },
  {
    name: "Hall Name",
    col: 3,
  },
  {
    name: "Max Count",
    col: 3,
  },
  {
    name: "Price",
    col: 3,
  },
  {
    name: "Description",
    col: 4,
  },
];

const WeddingPackageTable = [
  {
    name: "Packaging Name",
    col: 4,
  },
  {
    name: "Description",
    col: 4,
  },
  {
    name: "Price",
    col: 4,
  },
  {
    name: "",
    col: 4,
  },
];

const WeddingPackageTableDetails = [
  {
    name: "Packaging Name",
    col: 5,
  },
  {
    name: "Description",
    col: 5,
  },
  {
    name: "Price",
    col: 6,
  },
];

const DisableCategory = ["Attire", "Jewellery"];

const UserDashboardData = [
  {
    key: 1,
    text: "Dashboard",
    navigate: "user-dashboard",
    image:images.UserDashboard
  },
  {
    key: 2,
    text: "My Suppliers",
    navigate: "user-dashboard/supplier",
    image:images.Suppliers
  },
  {
    key: 3,
    text: "Checklist",
    navigate: "user-dashboard/checklist",
    image:images.Checklist
  },
  {
    key: 4,
    text: "Budget",
    navigate: "user-dashboard/budget",
    image:images.Budget
  },
  {
    key: 5,
    text: "Guests",
    navigate: "user-dashboard/guests",
    image:images.Guest
  },
];

const SupplierDashboardData = [
  {
    key: 1,
    text: "Business Information",
    navigate: "supplier-dashboard/",
    image:images.SupplierDashboard
  },
  {
    key: 2,
    text: "Inquires",
    navigate: "supplier-dashboard/inquires",
    image:images.Inquiries
  },
  {
    key: 3,
    text: "Reviews",
    navigate: "supplier/supplier-reviews/",
    image:images.Reviews
  },
  {
    key: 4,
    text: "Account Settings",
    navigate: "supplier-dashboard/setting",
    image:images.AccountSetting
  }
];

const CommonDashboardDetails = [
  {
    key: 1,
    mainTile: "Discover and book your dream wedding suppliers all in one place.",
    subTitle: "Bliss simplifies wedding planning! Discover a curated selection of top-rated vendors and book them directly through our platform. Find everything you need for your dream wedding, all in one convenient place.",
    image:images.DashboardImage1
  },
  {
    key: 2,
    mainTile: "Bliss : Your All-in-One Wedding Solution",
    subTitle: "Plan your dream wedding with ease! Bliss connects you with top-rated vendors and simplifies the booking process. Find everything you need, from photographers to florists, all in one convenient place.",
    image:images.DashboardImage2
  },
  {
    key: 3,
    mainTile: "Bliss: Say 'I Do' to Stress-Free Planning",
    subTitle: "Eliminate wedding planning stress with Bliss! Our platform offers a seamless experience, connecting you with trusted vendors, streamlining communication, and keeping you organized every step of the way.",
    image:images.DashboardImage3
  },
  {
    key: 4,
    mainTile: "Bliss: Create Your Perfect Wedding Day.",
    subTitle: "Bliss empowers you to customize your dream wedding. Explore our curated selection of vendors, manage your budget, and create a wedding that reflects your unique style, all on one user-friendly platform.",
    image:images.DashboardImage4
  }
];

const Categories = [
  {
    key: 1,
    text: "Wedding Venues",
    navigate: "supplier-register",
    categoryType: "Venues",
  },
  {
    key: 2,
    text: "Wedding Photographers",
    navigate: "supplier-register",
    categoryType: "Photographer",
  },
  {
    key: 3,
    text: "Wedding Music & DJs",
    navigate: "supplier-register",
    categoryType: "Music",
  },
  {
    key: 4,
    text: "Transport",
    navigate: "supplier-register",
    categoryType: "Transport",
  },
  {
    key: 2,
    text: "Wedding Decorations & Styling",
    navigate: "supplier-register",
    categoryType: "Decorations",
  },
  {
    key: 3,
    text: "Wedding Attire",
    navigate: "supplier-register",
    categoryType: "Attire",
  },
  {
    key: 4,
    text: "Jewellery",
    navigate: "supplier-register",
    categoryType: "Jewellery",
  },
];

export {
  API_URL,
  THEME,
  LOGO,
  USER_TYPE,
  Categories,
  Districts,
  WeddingVenues,
  WeddingPackageTable,
  DisableCategory,
  UnavailableDates,
  RATING,
  Packages,
  WeddingVenuesDetails,
  WeddingPackageTableDetails,
  UserDashboardData,
  SupplierDashboardData,
  CommonDashboardDetails,
};

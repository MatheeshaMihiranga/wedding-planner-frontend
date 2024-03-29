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
]

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
]

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
]

const DisableCategory = [
  "Attire",
  "Jewellery"
]

const Categories = [
  {
    key: 1,
    text: "Wedding Venues",
    navigate: "supplier-register",
    categoryType:"Venues"
  },
  {
    key: 2,
    text: "Wedding Photographers",
    navigate: "supplier-register",
    categoryType:"Photographer"
  },
  {
    key: 3,
    text: "Wedding Music & DJs",
    navigate: "supplier-register",
    categoryType:"Music"
  },
  {
    key: 4,
    text: "Transport",
    navigate: "supplier-register",
    categoryType:"Transport"
  },
  {
    key: 2,
    text: "Wedding Decorations & Styling",
    navigate: "supplier-register",
    categoryType:"Decorations"
  },
  {
    key: 3,
    text: "Wedding Attire",
    navigate: "supplier-register",
    categoryType:"Attire"
  },
  {
    key: 4,
    text: "Jewellery",
    navigate: "supplier-register",
    categoryType:"Jewellery"
  },
];

export { API_URL, THEME, LOGO, USER_TYPE, Categories, Districts,WeddingVenues,WeddingPackageTable,DisableCategory,UnavailableDates };

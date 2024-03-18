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
  }
];

const Categories = [
  {
    key: 1,
    text: "Wedding Venues",
    navigate: "wedding-venus",
  },
  {
    key: 2,
    text: "Wedding Photographers",
    value: "wedding-photographers",
  },
  {
    key: 3,
    text: "Wedding Music & DJs",
    value: "wedding-music",
  },
  {
    key: 4,
    text: "Transport",
    value: "wedding-transport",
  },
  {
    key: 2,
    text: "Wedding Decorations & Styling",
    value: "wedding-decoration",
  },
  {
    key: 3,
    text: "Wedding Attire",
    value: "wedding-attire",
  },
  {
    key: 4,
    text: "Jewellery",
    value: "wedding-jewellery",
  }
];


export {
  API_URL,
  THEME,
  LOGO,
  USER_TYPE,
  Categories
};

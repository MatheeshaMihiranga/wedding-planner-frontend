
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBrKTld-QhJsjrqd4PbjWCdYkaunwpVV2Q",
  authDomain: "wedding-planner-36692.firebaseapp.com",
  projectId: "wedding-planner-36692",
  storageBucket: "wedding-planner-36692.appspot.com",
  messagingSenderId: "79318427445",
  appId: "1:79318427445:web:5e9b2c78c4da7525ec0e7c"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
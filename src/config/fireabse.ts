
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBXV898Me-CT4fbBE0gCM2GhuNkbdem8yk",
  authDomain: "weddingplanner-8e171.firebaseapp.com",
  projectId: "weddingplanner-8e171",
  storageBucket: "weddingplanner-8e171.appspot.com",
  messagingSenderId: "592452666498",
  appId: "1:592452666498:web:e719666791d8a6f2ad609b"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
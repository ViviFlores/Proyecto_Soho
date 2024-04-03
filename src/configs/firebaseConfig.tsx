import { initializeApp } from "firebase/app";
import { getReactNativePersistence,initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyAlF27qnoeZmkaj-SWx58lUOBU5M-wGCJw",
  authDomain: "proyecto-app-b3bb1.firebaseapp.com",
  projectId: "proyecto-app-b3bb1",
  storageBucket: "proyecto-app-b3bb1.appspot.com",
  messagingSenderId: "671517370589",
  appId: "1:671517370589:web:ea8b92b074f3ad7f6f1334",
};

const firebase = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
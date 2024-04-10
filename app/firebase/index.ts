import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from "firebase/auth";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_APP_ID,
} from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

export const firebase = initializeApp(firebaseConfig);

export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const useFirebase = () => firebase;

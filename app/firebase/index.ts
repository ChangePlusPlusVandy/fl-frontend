import Config from "react-native-config";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBxOCPWJVuUEq-phN_mf54Zph7JZJLM-8E",
    authDomain: "friends-life-1cd60.firebaseapp.com",
    projectId: "friends-life-1cd60",
    storageBucket: "friends-life-1cd60.appspot.com",
    messagingSenderId: "842743778727",
    appId: "1:842743778727:web:a4360e42602a535f093a82"
};

export const firebase = initializeApp(firebaseConfig);

export const useFirebase = () => firebase;
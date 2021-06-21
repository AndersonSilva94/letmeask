import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAhfDHsL3D603vZUQrfFDHwMPICVckJiXI",
  authDomain: "letmeask-afb92.firebaseapp.com",
  databaseURL: "https://letmeask-afb92-default-rtdb.firebaseio.com",
  projectId: "letmeask-afb92",
  storageBucket: "letmeask-afb92.appspot.com",
  messagingSenderId: "334044852531",
  appId: "1:334044852531:web:b37cfcfddfaa0f0fae0e46"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
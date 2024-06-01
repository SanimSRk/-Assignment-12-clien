// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBtdHyCY_IfeH9DjEU3W61Ch2lBxv_2vlo',
  authDomain: 'assignment-12-8b8a8.firebaseapp.com',
  projectId: 'assignment-12-8b8a8',
  storageBucket: 'assignment-12-8b8a8.appspot.com',
  messagingSenderId: '417594505011',
  appId: '1:417594505011:web:b7253e2715f819d5ac3046',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

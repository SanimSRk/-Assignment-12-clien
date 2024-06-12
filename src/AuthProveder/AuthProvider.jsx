import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.init';
import useAxiosPublice from '../Hooks/AxiosPublic/useAxiosPublice';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(true);
  const axiosPublice = useAxiosPublice();
  const providerGoogle = new GoogleAuthProvider();
  const handileClikeCreateUser = (email, password) => {
    setLoding(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handileUpdateUser = (fullName, image) => {
    return updateProfile(auth.currentUser, {
      displayName: fullName,
      photoURL: image,
    });
  };

  const handileClickLoginUser = (email, password) => {
    setLoding(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const hanidleClickLogouts = () => {
    setLoding(false);
    setUser(null);
    return signOut(auth);
  };

  const handileClickGoogleSing = () => {
    setLoding(true);
    return signInWithPopup(auth, providerGoogle);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);

        const userInfo = { email: currentUser?.email };

        axiosPublice.post(`/jwt`, userInfo).then(res => {
          console.log(res.data);

          if (res?.data?.token) {
            localStorage.setItem('token', res?.data?.token);
            setLoding(false);
          }
        });
      } else {
        setLoding(false);

        localStorage.removeItem('token');
      }
    });

    return () => unsubscribe;
  }, [axiosPublice]);

  const authInfo = {
    handileClickLoginUser,
    handileClikeCreateUser,
    hanidleClickLogouts,
    user,
    loding,
    handileClickGoogleSing,
    handileUpdateUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

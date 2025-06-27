import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';// call methods using auth in firebase

// Create Authcontext
const AuthContext = createContext(null);

//  component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);//if user vailable logging
      setLoading(false);
    });

    return unsubscribe;// it the user not available logging
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password); // existing user a login account

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);// existing register the a user 

  const logout = () => signOut(auth);// user logout

  return (
    //user, login, register, logout methods expose using context
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children} {/*App render after loading */}
    </AuthContext.Provider>
  );
};

// Hook and auth context
export const useAuth = () => useContext(AuthContext);

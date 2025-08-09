import { useEffect, useState } from "react";
import axiosInstance,{setUserInterceptor} from '../axios';
import {
  auth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  googleProvider,
  signOut,
  onAuthStateChanged,
} from "./firebase.init";
import { reload, updateProfile } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [action, setAction] = useState(true); // To control auth state change listener
  // Helper to format user data
  const formatUser = (firebaseUser) => {
    if (!firebaseUser) return null;
    const { displayName, email, uid, photoURL } = firebaseUser;
    return { displayName, email, uid, photoURL };
  };

  const callbackend=async(data)=>{
    if(!data || !data.uid) return null;

      const userData = {
        username:data.displayName || 'Anonymous',
        uid: data.uid,
        email: data.email || 'Anonymous',
        role: 'user'
      };
      console.log("Callback user data:", userData);
       await axiosInstance.post('/api/auth/login', userData)
        .then(response => {
          console.log("Callback response:", response.data);
        })
        .catch(error => {
           // Handle error appropriately
          console.error("Callback error:", error);
          throw error;
        });
  }

  //  Google Login
  const loginWithGoogle = async () => {
    try {
      setAction(true);
      const result = await signInWithPopup(auth, googleProvider);

    } catch (error) {
      console.error("Google login failed:", error.message);
      setUser(null);
      throw error
    }

  };

  //  Email/Password Login
  const loginWithEmail = async (email, password) => {
    try {
      setAction(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Email login failed:", error.message);
      setUser(null);
      throw error
    }
  };

  //  Register with Email
  const registerWithEmail = async (email, password, displayName,photoURL) => {
    try {
      setAction(false);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName,photoURL});
      await reload(result.user);
      setUser(formatUser(result.user));
      setUserInterceptor(formatUser(result.user));
      await callbackend(result.user);
    } catch (error) {
      console.error("Registration failed:", error.message);
      setUser(null);
      throw error
    }
  };

  //  Logout
  const logout = async () => {
    try {
      setAction(true);
      await signOut(auth);
      setUser(null);
      await axiosInstance.post('/logout');
    } catch (error) {
      console.error("Logout failed:", error.message);
      throw error
    }
  };

  // 🔹 On Auth State Change
  useEffect(() => {
  
   const unsubscribe =  onAuthStateChanged(auth, async (firebaseUser) => {
    console.log("action:", action);
    
    if(!action) return; // Prevents state change if action is false
      const collectuser = formatUser(firebaseUser);
      console.log("user pre uid:", uid);

      if (!collectuser) {
        console.log("User data:", collectuser);
        setUid(null);
        setUser(null);
        setLoading(false);
        return;
      }
     if (collectuser.uid === uid) {
      console.log("User uid:", collectuser);
      console.log("User preuid:", uid);
      setUser(collectuser);
      setLoading(false);
      return;
    }
      setUid(collectuser.uid);
      setUser(collectuser);
      setUserInterceptor(collectuser);
      console.log("User data:", collectuser);
      await callbackend(collectuser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [action]);

  return {
    theme,
    setTheme,
    user,
    loading,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
  };
};

export default useAuth;

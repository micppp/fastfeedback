import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';
import Cookies from 'js-cookie';
import { createUser } from './db';
import Router from 'next/router';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);
      Cookies.set('fast-feedback-auth', true, {
        expires: 1,
      });
      return user;
    } else {
      Router.push('/');
      setUser(false);
      Cookies.remove('fast-feedback-auth');

      return false;
    }
  };

  const signInWithGithub = () => {
    Router.push('/dashboard');

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response));
  };

  const signInWithGoogle = () => {
    Router.push('/dashboard');

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response));
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => handleUser(user));

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGithub,
    signInWithGoogle,
    signOut,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData ? user.providerData[0].providerId : null,
    photoUrl: user.photoURL,
    token: user.ya,
  };
};

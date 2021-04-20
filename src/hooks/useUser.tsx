import { useState } from "react";
import { auth, provider } from "../firebase";

interface IUserState {
  user: any | null;
  isLoading: boolean;
  error: any | null;
}

function useUser() {
  const [userState, setUserState] = useState<IUserState>({
    user: null,
    isLoading: false,
    error: null,
  });
  const isSignedIn = userState.user !== null;
  const userId = isSignedIn ? userState.user.id : undefined;

  const signIn = async () => {
    setUserState({
      user: null,
      isLoading: true,
      error: null,
    });
    try {
      const credentials = await auth.signInWithPopup(provider);
      console.log("Signed In!");
      console.log(credentials);
      if (!credentials.user) {
        throw new Error("No user in credz");
      }
      const { displayName, uid } = credentials!.user;
      setUserState({
        ...userState,
        user: credentials.user,
        isLoading: false,
      });
      console.log(displayName, uid);
    } catch (err) {
      console.error(err);
      setUserState({
        ...userState,
        isLoading: false,
        error: err,
      });
    }
  };

  const signOut = async () => {
    setUserState({
      user: userState.user,
      isLoading: true,
      error: null,
    });
    try {
      await auth.signOut();
      console.log("Signed Out!");
      setUserState({
        user: null,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      console.error(err);
      setUserState({
        user: userState.user,
        isLoading: false,
        error: err,
      });
    }
  };

  return { ...userState, userId, isSignedIn, signIn, signOut };
}

export default useUser;

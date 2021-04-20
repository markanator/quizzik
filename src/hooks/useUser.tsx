import { useEffect, useState } from "react";
import { auth, provider } from "../firebase";

interface IUserState {
  user: any | null;
  isLoading: boolean;
  error: any | null;
}

function useUser() {
  const [userState, setUserState] = useState<IUserState>({
    user: auth.currentUser,
    isLoading: auth.currentUser === null ? true : false,
    error: null,
  });

  const isSignedIn = userState.user !== null;
  const userId = isSignedIn ? userState.user.id : undefined;

  useEffect(() => {
    const onChange = (currentUser) => {
      setUserState({
        user: currentUser,
        isLoading: false,
        error: null,
      });
    };
    const onError = (error) => {
      console.log(error);
      setUserState({ user: null, isLoading: false, error });
    };
    const unsub = auth.onAuthStateChanged(onChange, onError);

    return unsub;
  }, []);

  const signIn = async () => {
    setUserState({
      user: null,
      isLoading: true,
      error: null,
    });
    try {
      const credentials = await auth.signInWithPopup(provider);
      if (!credentials.user) {
        throw new Error("No user in credz");
      }
      setUserState({
        ...userState,
        user: credentials.user,
        isLoading: false,
      });
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

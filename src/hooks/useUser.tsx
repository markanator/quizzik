import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProviderProps, IUserContext, IUserState } from "types/UseUserTypes";
import { auth, firebase, provider } from "../firebase";

// Main User Provider
function UserProvider({ children }: IProviderProps): ReactElement {
  const [userState, setUserState] = useState<IUserState>({
    user: auth.currentUser,
    isLoading: auth.currentUser === null ? true : false,
    error: null,
  });

  const isSignedIn = userState.user !== null;
  const userId = isSignedIn ? (userState.user?.uid as string) : undefined;

  useEffect(() => {
    const onChange = (currentUser: firebase.User | null) => {
      setUserState({
        user: currentUser,
        isLoading: false,
        error: null,
      });
    };
    const onError = (error: firebase.auth.Error) => {
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

  return (
    <UserContext.Provider
      value={{ ...userState, userId, isSignedIn, signIn, signOut }}
    >
      {children}
    </UserContext.Provider>
  );
}

// explicitly determine if user has been initialized
const UserContext = createContext<IUserContext | null>(null);

function useUser(): IUserContext {
  const userState = useContext(UserContext);
  if (!userState) {
    throw new Error(
      "useUser needs to have a UserProvider component as a parent on the React Tree"
    );
  }
  return userState;
}
export default useUser;

export { UserContext, UserProvider };

import { ReactElement } from "react";
import ErrorMessage from "../../components/error-message";
import useUser from "../../hooks/useUser";

const HomePage = (): ReactElement => {
  const userState = useUser();

  if (userState.error) {
    console.error(userState.error);
  }

  let contents;

  if (userState.user) {
    contents = (
      <>
        <p>TODO: users quizes on the page</p>
        <button onClick={userState.signOut}>
          {userState.isLoading ? "Signing out..." : "Sign Out"}
        </button>
      </>
    );
  } else {
    contents = (
      <>
        <p>
          This app lets you create, play and share quizzes on any topoc! Sign in
          with your Google account below to get started!
        </p>
        <button onClick={userState.signIn}>Sign In</button>
      </>
    );
  }

  return (
    <main>
      <h1>Home 🏠</h1>
      {userState.error && (
        <ErrorMessage>
          Something went wrong loggin in. Please try again later.
        </ErrorMessage>
      )}
      {contents}
    </main>
  );
};

export default HomePage;

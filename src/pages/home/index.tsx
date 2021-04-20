import { ReactElement } from "react";
import ErrorMessage from "../../components/error-message";
import useUser from "../../hooks/useUser";

const HomePage = (): ReactElement => {
  const { error, isLoading, isSignedIn, signIn, signOut, user } = useUser();

  if (error) {
    console.log(error);
  }

  let contents;

  if (isSignedIn) {
    contents = (
      <>
        <p>TODO: users quizes on the page</p>
        <button onClick={signOut}>
          {isLoading ? "Signing out..." : "Sign Out"}
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
        <button onClick={signIn}>Sign In</button>
      </>
    );
  }

  return (
    <main>
      <h1>Home 🏠</h1>
      {error && (
        <ErrorMessage>
          Something went wrong loggin in. Please try again later.
        </ErrorMessage>
      )}
      {contents}
    </main>
  );
};

export default HomePage;

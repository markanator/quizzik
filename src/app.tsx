import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PageFooter from "./components/page-footer";
import PageHeader from "./components/page-header";
import { UserProvider } from "./hooks/useUser";
import LoadingSpinner from "./components/loading-spinner";
import useUser from "./hooks/useUser";

// code split => React.lazy.. load :)
// const NotFoundPage = React.lazy(() => import("./pages/not-found-page"));
const QuizPage = React.lazy(() => import("./features/quiz/quiz-page"));
const QuizzesPage = React.lazy(() => import("./features/quizzes"));
const AboutPage = React.lazy(() => import("./pages/about"));
const HomePage = React.lazy(() => import("./pages/home"));
const FirebaseTest = React.lazy(() => import("./pages/FirebaseTest"));

function ProviderWrappedApp() {
  return (
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  );
}

function App() {
  const userState = useUser();

  return (
    <>
      <PageHeader />
      {userState.isLoading ? (
        <LoadingSpinner />
      ) : (
        <Switch>
          <React.Suspense
            fallback={
              <>
                <LoadingSpinner />
              </>
            }
          >
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/quizzes">
              <QuizzesPage />
            </Route>
            <Route path="/quiz">
              <QuizPage />
            </Route>
            <Route path="/demo">
              <FirebaseTest />
            </Route>
            {/* <Route path="/*">
              <NotFoundPage />
            </Route> */}
          </React.Suspense>
        </Switch>
      )}

      <PageFooter />
    </>
  );
}

export default ProviderWrappedApp;

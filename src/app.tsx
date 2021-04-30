import React, { ReactElement } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PageFooter from "./components/page-footer";
import PageHeader from "./components/page-header";
import { UserProvider } from "./hooks/useUser";
import LoadingSpinner from "./components/loading-spinner";
import useUser from "./hooks/useUser";
import ProtectedRoute from "utils/ProtectedRoute";

// code split => React.lazy.. load :)
const NotFoundPage = React.lazy(() => import("./pages/not-found-page"));
const QuizPage = React.lazy(() => import("./features/play-quiz"));
const QuizzesPage = React.lazy(() => import("./features/quizzes"));
const AboutPage = React.lazy(() => import("./pages/about"));
const HomePage = React.lazy(() => import("./pages/home"));
const FirebaseTest = React.lazy(() => import("./pages/FirebaseTest"));
const EditPage = React.lazy(() => import("./pages/EditPage"));

function ProviderWrappedApp(): ReactElement {
  return (
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  );
}

function App(): ReactElement {
  const { isLoading, isSignedIn } = useUser();

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <PageHeader />
      <React.Suspense
        fallback={
          <>
            <LoadingSpinner />
          </>
        }
      >
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/quizzes">
            <QuizzesPage />
          </Route>
          <Route path="/play/:id">
            <QuizPage />
          </Route>
          <ProtectedRoute isSignedIn={isSignedIn} path="/edit/:id">
            <EditPage />
          </ProtectedRoute>
          <Route path="/demo">
            <FirebaseTest />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </React.Suspense>
      <PageFooter />
    </>
  );
}

export default ProviderWrappedApp;

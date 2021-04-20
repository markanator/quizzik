import { Switch, Route, BrowserRouter } from "react-router-dom";
import PageFooter from "./components/page-footer";
import PageHeader from "./components/page-header";
import { UserProvider } from "./hooks/useUser";
import LoadingSpinner from "./components/loading-spinner";
import QuizPage from "./features/quiz/quiz-page";
import AboutPage from "./pages/about";
import HomePage from "./pages/home";
import useUser from "./hooks/useUser";

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
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/quiz">
            <QuizPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
        </Switch>
      )}

      <PageFooter />
    </>
  );
}

export default ProviderWrappedApp;

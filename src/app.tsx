import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageFooter from "./components/page-footer";
import PageHeader from "./components/page-header";
import useUser from "./hooks/useUser";
import QuizPage from "./features/quiz/quiz-page";
import AboutPage from "./pages/about";
import HomePage from "./pages/home";
import LoadingSpinner from "./components/loading-spinner";

/**
 * The App component is responsible for setting up routing.
 */
function App() {
  const { isLoading } = useUser();

  return (
    <BrowserRouter>
      <PageHeader />
      {isLoading ? (
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
    </BrowserRouter>
  );
}

export default App;

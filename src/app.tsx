import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageFooter from "./components/page-footer";
import PageHeader from "./components/page-header";
import QuizPage from "./features/quiz/quiz-page";
import AboutPage from "./pages/about";
import HomePage from "./pages/home/home-page";

/**
 * The App component is responsible for setting up routing.
 */
function App() {
  return (
    <BrowserRouter>
      <PageHeader />

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

      <PageFooter />
    </BrowserRouter>
  );
}

export default App;

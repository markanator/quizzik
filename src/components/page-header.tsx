import { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./page-header.css";

function PageHeader(): ReactElement {
  return (
    <header className="page-header">
      <span className="page-header__logo">🧪🧪🧪</span>
      <nav className="page-header__nav">
        <Link to="/">Home</Link> | <Link to="/quizzes">Quizzes</Link>
      </nav>
    </header>
  );
}

export default PageHeader;

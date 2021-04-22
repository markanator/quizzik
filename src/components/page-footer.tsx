import { ReactElement } from "react";
import "./page-footer.css";

function PageFooter(): ReactElement {
  const year = new Date().getFullYear();
  return <footer className="page-footer">© Mark Ambrocio, {year}</footer>;
}

export default PageFooter;

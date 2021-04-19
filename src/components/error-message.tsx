import "./error-message.css";
import * as React from "react";

/**
 * Simple error message display.
 * @param {object} props
 * @param {React.ReactNode} props.children Message to display.
 */
function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <p className="error-message">{children}</p>;
}

export default ErrorMessage;

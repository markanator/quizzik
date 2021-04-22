import "./error-message.css";
import * as React from "react";

/**
 * Simple error message display.
 * @param {object} props
 * @param {React.ReactNode} props.children Message to display.
 */
interface Props {
  children: React.ReactNode;
}

function ErrorMessage({ children }: Props): React.ReactElement {
  return <p className="error-message">{children}</p>;
}

export default ErrorMessage;

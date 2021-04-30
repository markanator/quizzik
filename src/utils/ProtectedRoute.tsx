import React, { ReactElement } from "react";
import { Redirect, Route } from "react-router";

interface props {
  children: React.ReactNode;
  isSignedIn: boolean;
  [x: string]: unknown;
}

const ProtectedRoute = ({
  children,
  isSignedIn,
  ...rest
}: props): ReactElement => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isSignedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/?auth=false",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;

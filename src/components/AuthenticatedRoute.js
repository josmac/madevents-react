import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const RedirectToLogin = () => <Redirect to="/login" />;

const RedirectToProfile = () => {
  const { user } = useAuthContext();

  return <Redirect to={`/profile/${user.id}`} />;
};

const AuthenticatedRoute = (props) => {
  const { user } = useAuthContext();
  return (
    <Route {...props} component={user ? props.component : RedirectToLogin} />
  );
};

export const NotAuthenticatedRoute = (props) => {
  const { user } = useAuthContext();
  return (
    <Route {...props} component={!user ? props.component : RedirectToProfile} />
  );
};

export default AuthenticatedRoute;

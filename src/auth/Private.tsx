import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuthSession } from "./AuthSessionContext";

type PrivateProps = {
  component: ReactElement;
};

export const Private = ({ component }: PrivateProps) => {
  const { session, loading } = useAuthSession();

  if (loading) {
    return <p>Authenticating...</p>;
  }

  return session ? component : <Navigate to="/auth" />;
};

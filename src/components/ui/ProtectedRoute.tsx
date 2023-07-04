import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { ChildrenProps } from "~/models";

export default function ProtectedRoute({
  children,
  to,
}: ChildrenProps & { to: string }) {
  return (
    <>
      {Cookies.get("token") !== undefined ? (
        children
      ) : Cookies.get("token") === undefined ? (
        <Navigate to={to} />
      ) : null}
    </>
  );
}

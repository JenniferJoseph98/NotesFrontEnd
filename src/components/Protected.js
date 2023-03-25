import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  let email = localStorage.getItem("email");
  if (email === null) {
    email = "";
  }
  return <div>{email.length ? children : <Navigate to="/" />}</div>;
};
export default Protected;

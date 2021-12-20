import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="login-container">
      <h2>Welcome! Please login to Continue</h2>
      <button className="btn-login" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div>
  );
};

export default LoginButton;

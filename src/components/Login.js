import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const clientId = "840821527925-9i4dh6qaudkt56i687bvaml3vgshn3r0.apps.googleusercontent.com";

function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
    if (response.credential) {
      localStorage.setItem("userToken", response.credential);
      window.location.href = "/"; // Force a redirect to home
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="login-container">
        <h2>Login to StreamList</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthStyles/Auth.css";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import AuthImage from "../../Assets/Login Screen VECTOR 1.png";
import { useLoginPatientMutation } from "../../lib/APIs/patientAuthApis";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginPatient, { isLoading, isSuccess, isError, error }] = useLoginPatientMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting login form with email:", email);
    try {
      const result = await loginPatient({ email, password }).unwrap();
      console.log("Login successful:", result);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("Login success, navigating to /chat");
      setEmail("");
      setPassword("");
      navigate("/chat");
    }
  }, [isSuccess, navigate]); // Added dependencies to useEffect

  useEffect(() => {
    if (isError) {
      console.error("Login error:", error);
    }
  }, [isError, error]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container d-flex justify-content-center card-container">
      <Card
        className="border border-0"
        style={{
          width: "48rem",
          height: "40rem",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <div className="row close-holder col-12 ">
          <div className="fw-bold mb-5 btn-close">
            <CloseButton variant="black" />
          </div>
        </div>
        <div className="container mt-1">
          <div className="row align-items-center">
            <div className="col-md-6 authImg">
              <img src={AuthImage} alt="Login screen illustration" />
            </div>
            <div className="col-md-6">
              <h1 className="fw-bold form-intro">Login To Account</h1>
              <p className="form-text">
                Welcome back, Please enter your Email and Password to login
              </p>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control fw-bold"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <br />
                <div className="form-group2 d-flex ">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control fw-bold"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="btn border-2 bg-transparent btnForView"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="forget-group text-end ms-1 mt-2">
                  <a
                    href="/recover"
                    className=" text-decoration-none fs-6 fw-medium"
                  >
                    Forgot password?
                  </a>
                </div>
                <button type="submit" className="btnForLogin" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
              </form>

              <div className="sign-up">
                <p>
                  Don't have an account?
                  <a href="/signup" className="text-decoration-none fw-bold">
                    SIGN UP
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
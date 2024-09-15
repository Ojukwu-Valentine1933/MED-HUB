import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signImage from "../../Assets/Login Screen VECTOR 2.png";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "react-bootstrap/Card";
import "./AuthStyles/Auth.css";
import useFormValidation from "../../hooks/useFormValidation";
import { useCreateNewPatientMutation } from "../../lib/APIs/patientApi";

const SignUp = () => {
  const redirect = useNavigate();

  // State variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Added phoneNumber state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [createNewPatient, { isSuccess }] = useCreateNewPatientMutation();

  // Form validation hook
  const { formIsValid, formError } = useFormValidation(
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  );

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Handling form submission...");
    console.log("formIsValid:", formIsValid);

    if (!formIsValid) {
      console.log("Form is not valid. Cannot submit.");
      return;
    }

    try {
      const result = await createNewPatient({ firstName, lastName, email, phoneNumber, password, confirmPassword }).unwrap();
      console.log("Patient created successfully:", result);
    } catch (err) {
      console.error("Failed to create patient:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      redirect("/account-success");
    }
  }, [isSuccess, redirect]);

  console.log("formIsValid: ", formIsValid);
  console.log("formError: ", formError);

  return (
    <div className="container d-flex justify-content-center card-container mb-5">
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
        <div className="row close-holder col-12">
          <div className="fw-bold mb-5 btn-close">
            <CloseButton variant="black" />
          </div>
        </div>

        <div className="container mt-1">
          <div className="row align-items-center">
            <div className="col-md-6 authImg">
              <img src={signImage} alt="Sign Up screen illustration" />
            </div>
            <div className="col-md-6 sign-intro">
              <h1 className="">Register an Account</h1>
              <p>
                We are glad to have you here! Please fill in your information.
              </p>
              {formError && (
                <div className="alert alert-danger mt-5" role="alert">
                  {typeof formError === "string"
                    ? formError
                    : JSON.stringify(formError)}
                </div>
              )}
              <form className="sign-up-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control fw-bold"
                    id="FirstName"
                    placeholder="First Name"
                    onChange={(event) => setFirstName(event.target.value)}
                    value={firstName}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control fw-bold"
                    id="LastName"
                    placeholder="Last Name"
                    onChange={(event) => setLastName(event.target.value)}
                    value={lastName}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control fw-bold"
                    id="email"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                  />
                </div>

                <br />
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control fw-bold"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    value={phoneNumber}
                  />
                </div>
                <br />

                <div className="form-group d-flex">
                  <input
                    type="password"
                    className="form-control fw-bold"
                    id="password"
                    placeholder="Create password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                  />
                </div>
                <br />
                <div className="form-group d-flex">
                  <input
                    type="password"
                    className="form-control fw-bold"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    value={confirmPassword}
                  />
                </div>
                <div className="forget-group d-flex text-center gap-2 mt-4">
                  <p className="fw-medium">Already have an account?</p>
                  <Link
                    to="/login"
                    className="text-decoration-none fs-6 fw-bold"
                  >
                    Login
                  </Link>
                </div>
                <button
                  type="submit"
                  className={`btnForSignUp ${!formIsValid ? "disabled" : ""}`}
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
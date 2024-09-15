import RecoverImg from "../../Assets/Recover Screen VECTOR 1.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoverpasswordMutation } from "../../lib/APIs/patientAuthApis";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [recoverpassword, { isLoading, isSuccess, isError, error }] = useRecoverpasswordMutation();
  const redirect = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await recoverpassword({ email }).unwrap();
    } catch (err) {
      console.error("Failed to recover password:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      redirect("/recover-success");
    }
  }, [isSuccess, redirect]);

  return (
    <section className="container recover-section">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <h1 className="recover-intro">Recover Password</h1>
          <p className="recover-text">We are glad to have you here! Please fill in your information</p>

          <form className="recover-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control fw-bold"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Recovering..." : "Recover Now"}
            </button>
          </form>

          {isError && <p className="error-text">Failed to recover password: {error?.data?.error || error.message}</p>}
        </div>
        <div className="col-4"></div>
      </div>
      <div className="recover-image">
        <img src={RecoverImg} alt="Recover screen illustration" />
      </div>
    </section>
  );
};

export default RecoverPassword;
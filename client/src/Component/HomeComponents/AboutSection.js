import React from "react";
import { Element } from "react-scroll";
import "../../Styles/aboutsection.css";

const AboutSection = () => {
  return (
    <div>
      {/* <!-- About us section starts here --> */}
      <Element name="about">
        <section id="about" className="container-fluid about-section">
          <div>
            <h1 className="about-text">How MedHub Works</h1>
          </div>
          <div className="row  ">
            <div className="col-lg-4 mb-3  ">
              <div className="card about-card ">
                <div className="card-body ">
                  <h3 className="card-no">1.</h3>
                  <h3 className="card-title about-card-title">
                    Patient Registration & Appointment Scheduling:
                  </h3>
                  <p className="card-text about-card-text">
                    Patients can register through a user-friendly interface,
                    either online or on-site.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="card about-card">
                <div className="card-body">
                  <h3 className="card-no">2.</h3>
                  <h3 className="card-title about-card-title">
                    Electronic Medical Records (EMR) Management:
                  </h3>
                  <p className="card-text about-card-text">
                    MedHub stores and organizes patients' medical records
                    securely, allowing healthcare professionals to access and
                    update them in real-time.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="card about-card">
                <div className="card-body">
                  <h3 className="card-no">3.</h3>
                  <h3 className="card-title about-card-title">
                    Doctor-Patient Interaction:
                  </h3>
                  <p className="card-text about-card-text">
                    During consultations, doctors can input diagnoses, prescribe
                    medications, and order tests directly within the system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>
    </div>
  );
};

export default AboutSection;

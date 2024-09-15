import React from "react";
import "../../Styles/herosection.css";
import HeroBanner from "../../Assets/Hero Banner.png";

const HeroSection = () => {
  return (
    <div>
      <section className="container hero-section">
        <div className="row d-flex ">
          <div className="col-lg-6 hero-img">
            <img src={HeroBanner} alt="" />
          </div>
          <div className="col-lg-6 hero-text">
            <h1 className="text-1">Welcome to MedHub:</h1>
            <h1 className="text-2">
              A Comprehensive Hospital & Patient Management Solution
            </h1>
            <p>
              MedHub is an innovative hospital and patient management solution
              designed to streamline healthcare operations. The platform
              integrates various functionalities such as patient registration,
              appointment scheduling, medical record management, billing, and
              inventory control into a centralized system. By optimizing
              hospital workflows and enhancing patient care, MedHub ensures
              efficient communication between healthcare providers and patients,
              reduces administrative burdens, and improves overall healthcare
              service delivery. Tailored for hospitals and clinics of all sizes,
              MedHub aims to revolutionize healthcare management with its
              user-friendly interface and robust features.
            </p>
            <div class="hero-btn mt-5">
              <a href="/signup" class="hero-btn">
                GET STARTED
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

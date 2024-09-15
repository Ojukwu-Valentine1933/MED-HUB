import React from "react";
import Doctor from "../../Assets/Doctor.png";

import "../../Styles/whychooseus.css";

const WhyChooseUs = () => {
  return (
    <div>
      {/* <!-- why section starts here --> */}
      <section className="container why-section">
        <h1 className="why-intro">Why Choose MedHub?</h1>
        <div className="row">
          <div className="col mb-4">
            <div className="card why-card first">
              <div className="card-body">
                <h3 className="card-title why-card-title">
                  All-in-One Solution
                </h3>
                <p className="card-text why-card-text">
                  MedHub integrates all essential hospital operations—patient
                  management, appointment scheduling, medical record handling,
                  billing, inventory control—into one platform, reducing the
                  need for multiple, disjointed systems.
                </p>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card why-card second">
              <div className="card-body">
                <h3 className="card-title why-card-title">
                  Improved Efficiency
                </h3>
                <p className="card-text why-card-text">
                  By automating manual processes and reducing paperwork, MedHub
                  optimizes hospital workflows. Healthcare staff can focus more
                  on patient care rather than administrative tasks, improving
                  overall efficiency and productivity.
                </p>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card why-card third">
              <div className="card-body">
                <h3 className="card-title why-card-title">
                  Enhanced Patient Experience
                </h3>
                <p className="card-text why-card-text">
                  Patients benefit from seamless registration, easy appointment
                  booking, digital medical records, and transparent billing
                  processes. MedHub also provides reminders for appointments and
                  access to their health information, improving patient
                  engagement and satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Get started section --> */}
      <section class="container-fluid started-section">
        <div class="row">
          <div class="col mt-5 start-text ps-5 ">
            <h1 class="started-intro">Getting Started with MEDHUB</h1>
            <p class="started-text ">
              Making informed decisions about your health has never been easier.
              Visit MedHub: A Quick Guide to Streamline Your Hospital Operations
            </p>
            <div class="started-btn mt-5">
              <a href="/signup" class="hero-btn">
                GET STARTED
              </a>
            </div>
          </div>
          <div class="col">
            <img src={Doctor} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;

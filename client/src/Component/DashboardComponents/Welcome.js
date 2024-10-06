import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../../Styles/welcome.css"; // Assuming your custom styles are here
import sunicon from "../../Assets/sun-icon.png";
import chatboticon from "../../Assets/chatbot-icon.png";

const Welcome = () => {
  // Initialize state with the value from localStorage
  const [firstName, setFirstName] = useState("");

  // Effect to load the name from localStorage when the component mounts
  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName")?.trim();
    if (storedFirstName) {
      setFirstName(storedFirstName); // Update the state with the first name
    }
  }, []);

  // State to store the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="dashboard-container container mt-5">
      <div className="row w-100">
        {/* Left Section: Welcome Message */}
        <div className="col-12 col-md-8 welcome-container mb-4">
          <div className="d-flex text-white p-3 gap-3 align-items-center">
            <b className="text-white">Good Tidings, {firstName}</b>
            <img
              src={sunicon}
              alt="sun-icon"
              width={20}
              height={20}
              loading="lazy"
            />
          </div>
          <h3 className="text-white ps-4 pt-2 mt-3">
            How are you feeling today?
          </h3>
          <p className="text-white ps-3  pt-2">
            Your well-being is our top priority! To ensure accurate and
            personalized guidance, please share all relevant details about your
            health with MED-HUB. Don't hesitate to provide comprehensive
            information.
          </p>

          {/* Button section */}
          <div className="welcome-btn ms-2 p-2 mb-5 d-flex flex-column flex-sm-row gap-2">
            <Link
              to="#"
              className="btn bg-white text-center fw-bold fs-6 mt-1 d-flex align-items-center justify-content-center gap-2"
            >
              <img
                src={chatboticon}
                alt="chatbot-icon"
                width={20}
                height={20}
                loading="lazy"
              />
              CHAT WITH AI-DOC
            </Link>

            <Link
              to="#"
              className="btn bg-white fw-bold fs-6 mt-1 text-center d-flex flex-column justify-content-center"
            >
              Connect with a               Health Professional
            </Link>
          </div>
        </div>

        {/* Right Section: Calendar */}
        <div className="col-12 col-md-4 calendar-container">
          <div className="calendar-section text-center">
            <div className="calendar-wrapper  rounded  shadow">
            <p className="text-white fw-bold">View Your Activities</p>

              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                className="w-100 fw-bold fs-3"
              />
              <p className="text-white  fw-bold">
                <strong>Selected Date:</strong> {selectedDate.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="welcome-footer d-flex flex-column mt-4 flex-md-row justify-content-between align-items-center fw-bold row">
  <div className="text-white col-md-6 col-12 pt-2 ps-2">
    <h4 className="ps-2">Are you a Health Practitioner?</h4>
    <p className="ps-2">Join our Health Professional Team today!</p>
  </div>
  <div className="col-md-4 col-0"></div>
  <div className="col-md-2 col-12 pt-2 text-center text-md-end">
    <button className="btn bg-white fw-bold text-uppercase">Register Now</button>
  </div>
</div>

    </div>
  );
};

export default Welcome;

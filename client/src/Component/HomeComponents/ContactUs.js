import React from "react";
import "../../Styles/contactus.css";
import Arrow from "../../Assets/arrow vector.png";
import Line from "../../Assets/line.png";



const ContactUs = () => {
  return (
    <div>
     

      {/* <!-- Contact us section starts here --> */}
      <section className="container contact-section">
        <div className="row contact-div-holder">
          <div className=" col">
            <h1 className="contact-intro">Get in touch with us</h1>
            <img src={Arrow} alt="" />
            <p class="contact-text">
              Get in touch with us if you have any suggestions or information to
              help this idea.
            </p>
            <h5 className="follow">
              FOLLOW US{" "}
              <span>
                <img src={Line} alt="" />
              </span>
            </h5>
            <div className="contact-icon">
              <a href="##" class="twitter-icon">
                <i class="fa-brands fa-twitter"></i>
              </a>
              <a href="##" class="fb-icon">
                <i class="fa-brands fa-facebook"></i>
              </a>
              <a href="##" class="ig-icon">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
            <div className="mail">
              <a href="##" className="mail-icon">
                <i className="fa-solid fa-envelope me-1"></i>
              </a>
              support@med-hub.com
            </div>
          </div>
          <div className="col contact-form">
            <form>
              <input type="text" placeholder="Full Name" /> <br />
              <input type="email" placeholder="Email" /> <br />
              <input type="text" placeholder="Phone Number" /> <br />
              <textarea
                placeholder="Message"
                cols="30"
                rows="5"
                className=""
              ></textarea>{" "}
              <br />
              <br />
            </form>
            <button className=" border-0 contact-btn">
              SEND MESSAGE
            </button>
          </div>
        </div>
      </section>

      {/* <!-- footer section starts here --> */}
    <footer>
      <h6>Copyright of MED-HUB &#169; BUILDATHON 2024 </h6>
    </footer>
    </div>
  );
};

export default ContactUs;

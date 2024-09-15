import success from "../../Assets/success.png";
import completed from "../../Assets/completed.png";
const AccountSuccess = () => {
  return (
    <section className="container recover-section">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4 reset-section">
          <div className="success-img">
            <img src={success} alt=""></img>
          </div>
          <div className="success-intro">
            <h4 className="success-text">Account created successfully!</h4>

            <p>
              We are happy to have you with us... Login to experience our great
              offer!
            </p>
          </div>

          <div className="reset-btn">
            <a href="/login" className="text-decoration-none">
              BACK TO LOGIN
            </a>
          </div>
        </div>
        <div className="col-4"></div>
      </div>
      <div className="recover-image">
        <img src={completed} alt=""></img>
      </div>
    </section>
  );
};

export default AccountSuccess;

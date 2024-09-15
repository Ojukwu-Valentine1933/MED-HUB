import RecoverSuccessImg from "../../Assets/Recover Screen VECTOR 2.png";
import success from "../../Assets/success.png";
const RecoverSuccess = () => {
  return (
    <section className="container recover-section">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4 reset-section">
            <div className="success-img">
            <img src={success} alt="" ></img>
            </div>
         
          <h4 className="success-text">Link sent Successfully!</h4>
          <h4 className="success-text">Check your email for recovery link</h4>

          <div className="reset-link">
            <p>
              Didn't get a link?{" "}
              <a href="/reset" className="text-decoration-none">
                RESEND LINK
              </a>
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
        <img src={RecoverSuccessImg} alt=""></img>
      </div>
    </section>
  );
};

export default RecoverSuccess;

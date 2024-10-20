import classNames from "classnames/bind";
import styles from "./ResetPassword.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../helper/httpRequest";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleBackToLoginPage = () => {
    navigate("/");
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const res = await post("/auth/forgot-password", { email });
    const dataRes = await res.json();

    if (res.ok) {
      toast.info(dataRes.message);
      navigate("/");
    } else {
      toast.error(dataRes.message);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <form className={cx("form")} onSubmit={(e) => handleForgotPassword(e)}>
        <h5 className={cx("title")}>Please enter your email</h5>
        <input
          className={cx("input")}
          type="email"
          value={email}
          required
          onChange={(e) => handleSetEmail(e)}
        />
        <div className={cx("btn-group")}>
          <button className={cx("back-btn")} onClick={handleBackToLoginPage}>
            Back
          </button>
          <button type="submit" className={cx("submit-btn")}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;

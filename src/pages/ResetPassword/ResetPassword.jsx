import classNames from "classnames/bind";
import styles from "./ResetPassword.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { post } from "../../helper/httpRequest";

const cx = classNames.bind(styles);

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSetPasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handleCancel = () => {
    navigate("/");
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.warn("Password and password confirm must be matched ");
    }
    const token = searchParams.get("token");

    const res = await post("/auth/reset-password", { token, password });
    const dataRes = await res.json();

    if (res.ok) {
      toast.success(dataRes.message);
      navigate("/");
    } else {
      toast.error(dataRes.message);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <form className={cx("form")} onSubmit={(e) => handleResetPassword(e)}>
        <div className={cx("header")}>
          <h4 className={cx("title")}>Reset password</h4>
        </div>
        <div className={cx("body")}>
          <div className={cx("group-form-item")}>
            <label className={cx("label")}>Enter your password</label>
            <input
              name="password"
              className={cx("input")}
              type="password"
              value={password}
              required
              onChange={(e) => handleSetPassword(e)}
            />
          </div>
          <div className={cx("group-form-item")}>
            <label className={cx("label")}>Enter your password confirm</label>
            <input
              name="password"
              className={cx("input")}
              type="password"
              value={passwordConfirm}
              required
              onChange={(e) => handleSetPasswordConfirm(e)}
            />
          </div>
        </div>

        <div className={cx("footer")}>
          <div className={cx("btn-group")}>
            <button className={cx("cancel-btn")} onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className={cx("submit-btn")}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;

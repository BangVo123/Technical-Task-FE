import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useState } from "react";
import { post } from "../../helper/httpRequest";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSetUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    const res = await post("/auth/login", data);
    const dataRes = await res.json();
    if (res.ok) {
      localStorage.setItem("token", dataRes.metadata.token);
      toast.success(dataRes.message);
      navigate("/dashboard");
    } else {
      toast.error(dataRes.message);
    }
  };
  const handleClearInput = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className={cx("wrapper")}>
      <form className={cx("form")} onSubmit={handleLoginSubmit}>
        <div className={cx("header")}>
          <h4 className={cx("title")}>Login</h4>
        </div>
        <div className={cx("body")}>
          <div className={cx("group-form-item")}>
            <label className={cx("label")}>Enter your username or email</label>
            <input
              name="username"
              className={cx("input")}
              type="text"
              required
              value={username}
              onChange={(e) => handleSetUsername(e)}
            />
          </div>
          <div className={cx("group-form-item")}>
            <label className={cx("label")}>Enter your password</label>
            <input
              name="password"
              className={cx("input")}
              type="password"
              required
              value={password}
              onChange={(e) => handleSetPassword(e)}
            />
          </div>
          <Link to="/forgotPassword" className={cx("forgot-password")}>
            Forgot password?
          </Link>
        </div>

        <div className={cx("footer")}>
          <div className={cx("register")}>
            Do you not have any account?
            <Link to="/register" className={cx("navigate-btn")}>
              Register here!
            </Link>
          </div>
          <div className={cx("btn-group")}>
            <button className={cx("cancel-btn")} onClick={handleClearInput}>
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

export default Login;

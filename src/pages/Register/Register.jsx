import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { useState } from "react";
import { post } from "../../helper/httpRequest";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSetUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
    };

    const res = await post("/auth/register", data);
    const dataRes = await res.json();
    if (res.ok) {
      toast.success(dataRes.message);
      navigate("/");
    } else {
      toast.error(dataRes.message);
    }
  };
  const handleClearInput = () => {
    setEmail("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className={cx("wrapper")}>
      <form className={cx("form")} onSubmit={handleRegisterSubmit}>
        <div className={cx("header")}>
          <h4 className={cx("title")}>Register</h4>
        </div>
        <div className={cx("body")}>
          <div className={cx("group-form-item")}>
            <label className={cx("label")}>Enter your username</label>
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
            <label className={cx("label")}>Enter your email</label>
            <input
              name="email"
              className={cx("input")}
              type="email"
              required
              value={email}
              onChange={(e) => handleSetEmail(e)}
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
        </div>
        <div className={cx("footer")}>
          <div className={cx("register")}>
            Already has an account?
            <Link to="/" className={cx("navigate-btn")}>
              Login here!
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

export default Register;

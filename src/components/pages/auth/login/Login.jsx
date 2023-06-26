import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import show_icon from "../../../../assets/svg/show.svg";
import hide_icon from "../../../../assets/svg/hide.svg";
import styles from "./Login.module.scss";

export const Login = () => {
  document.title = "Login";

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const signIn = useSignIn();

  const handleChangeUsername = (e) => {
    setData((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const handleChangePassword = (e) => {
    setData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const password_toggle = () => {
    setShowPassword(!showPassword);
  };

  const server_url = "https://auth-node.up.railway.app";

  const notifySuccess = () => {
    return toast.success("Successfully logged in", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const notifyError = (msg) => {
    const defaultMessage = "Server temporarily unavailable";

    return toast.error(msg ? `${msg}` : defaultMessage, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();

    try {
      if (!validateUsername(data.username)) {
        notifyError("Invalid Username!");
      } else {
        await axios.post(`${server_url}/auth/login`, data).then((res) => {
          if (res.data.auth === true) {
            const token = res.data.token;
            const username = res.data.data.username;
            const email = res.data.data.email;

            signIn({
              token: token,
              expiresIn: 3600,
              tokenType: "Bearer",
              authState: {
                username: username,
                email: email,
              },
            });

            navigate("/");

            notifySuccess();

            setData((prev) => ({
              ...prev,
              username: "",
              password: "",
            }));
          } else {
            notifyError(res.data.message);
          }
        });
      }
    } catch {
      notifyError();
    }
  };

  const validateUsername = (username) => {
    const regex = /^[\w\s]{2,30}$/;
    return regex.test(username);
  };

  return (
    <>
      <div className={styles.page}>
        <form onSubmit={sendData} className={styles.form}>
          <input
            required
            type="text"
            value={data.username}
            placeholder="Username"
            onChange={handleChangeUsername}
            className={styles.input}
          />

          <div className={styles.password_wrapper}>
            <input
              required
              type={showPassword ? "text" : "password"}
              value={data.password}
              placeholder="Password"
              onChange={handleChangePassword}
              className={styles.input}
            />

            <div className={styles.password_btn_wrapper}>
              <img
                src={showPassword ? hide_icon : show_icon}
                alt="password-icon"
                className={styles.password_btn}
                onClick={password_toggle}
              />

              {/* <div className={styles.hint_container}>
                <p className={styles.hint_title}>
                  {showPassword ? "Hide password" : "Show password"}
                </p>
              </div> */}
            </div>
          </div>

          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

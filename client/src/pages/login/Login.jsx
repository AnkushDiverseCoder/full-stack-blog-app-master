import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null)

  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://fullstackblog-l1gk.onrender.com/api/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(err.response.data);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          ref={emailRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          {error}
        </span>
      )}
      </form>
      <Link to="/register">
        <button className="loginRegisterButton">Register</button>
      </Link>
    </div>
  );
}

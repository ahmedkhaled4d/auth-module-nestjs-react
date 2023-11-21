import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosApiInstance } from "../api/axios";
import { checkPasswordErrors } from "../utils/validate";

export default function Signup() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    setErrMsg(null);
  }, [email, password]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const passwordCheck = checkPasswordErrors(password);
      setErrMsg(passwordCheck);
      if (passwordCheck === null) {
        const { data } = await axiosApiInstance.post(
          "/auth/signup",
          { email, password, username },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        localStorage.setItem("user", JSON.stringify(data));

        navigate("/app");
      }
    } catch (err) {
      setErrMsg(err?.response?.data.message);
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="Auth-form-content">
          {errMsg && (
            <Alert key="danger" variant="danger">
              {errMsg}
            </Alert>
          )}
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered? <Link to="/signin">Sign In</Link>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
          <p className="text-center mt-2">
            Back to <a href="/">Home?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

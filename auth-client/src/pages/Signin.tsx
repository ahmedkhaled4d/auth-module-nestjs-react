import { Alert } from "react-bootstrap";
import { Link, json, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { axiosApiInstance } from "../api/axios";

export default function Signin() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    setErrMsg(null);
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosApiInstance.post(
        "/auth/signin",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // Set HTTP-only cookies on the client side
      // document.cookie = `accessToken=${data.accessToken}; Secure; SameSite=None; Path=/; HttpOnly`;
      // document.cookie = `refreshToken=${data.refreshToken}; Secure; SameSite=None; Path=/; HttpOnly`;

      localStorage.setItem("user", JSON.stringify(data));
      setAuth(data);
      navigate("/app");
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
            Not registered yet? <Link to="/signup">Sign up</Link>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
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

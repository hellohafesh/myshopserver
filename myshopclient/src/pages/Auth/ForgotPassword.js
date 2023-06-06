import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./AuthStyle.css";
import logo from "../../Images/mainmyshop.png";
// import { useAuth } from "../../Context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  // const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success("Tost");
    const data = { email, newPassword, answer };

    try {
      const res = await axios.post("/api/v1/auth/forgot-password", data);

      if (res.data && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate(location.state || "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title={"Forgot Password - "}>
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <img
            style={{
              height: "90px",
              width: "200px",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
            src={logo}
          />

          <h1 className="title">Reset Your Password</h1>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputemail"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Your Father Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Set Your New Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;

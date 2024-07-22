import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LoginPage, {
  Username,
  Password,
  Submit,
  Title,
  Footer,
  Logo,
} from "@react-login-page/page6";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUrl =
    "https://meet-up-backend-2kfj.onrender.com/api/v1/user/login";

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(loginUrl, {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data.data.avatar);
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("avatar", res.data.data.avatar);
          sessionStorage.setItem("userName", res.data.data.name);
          sessionStorage.setItem("userId", res.data.data._id);
          toast.success("Login Success");
          navigate("/");
        });
    } catch (err) {
      toast.error("Login Failed");
    }
  };

  return (
    <>
      {/* ----------------------------------------------- */}
      <div className="h-screen overflow-hidden">
        <LoginPage>
          <Title>Welcome User</Title>
          <Username
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Password
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="userPassword"
          />
          <Submit onClick={handleLogin}>Submit</Submit>
          <Logo>
            <img src="" alt="" />
          </Logo>
          <Footer>
            Not an Account? <Link to="/signUp">Sign up now</Link>
          </Footer>
        </LoginPage>
      </div>
    </>
  );
};

export default Login;

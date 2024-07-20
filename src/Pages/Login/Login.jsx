import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../Components/Sidebar/Sidebar";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUrl = "https://meet-up-backend-2kfj.onrender.com/api/v1/user/login";

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
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* ----------------------------------------------- */}
      <section className=" fixed">
        <div className="bg-[#000] h-screen w-screen">
          <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
            <div
              className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
              style={{ height: "500px" }}
            >
              <div className="flex flex-col w-full  p-4">
                <div className="flex flex-col flex-1 justify-center mb-8">
                  <h1 className="text-4xl text-center font-thin">Login</h1>
                  <div className="w-full mt-4">
                    <form
                      className="form-horizontal w-3/4 mx-auto"
                      onSubmit={handleLogin}
                    >
                      <div className="flex flex-col mt-4">
                        <input
                          id="email"
                          type="text"
                          className="flex-grow h-8 px-2 border rounded border-grey-400"
                          name="email"
                          required
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col mt-4">
                        <input
                          id="password"
                          type="password"
                          className="flex-grow h-8 px-2 rounded border border-grey-400"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="Password"
                        />
                      </div>
                      <div className="flex flex-col mt-8">
                        <button
                          type="submit"
                          className="bg-[#000]  text-white text-sm font-semibold py-2 px-4 rounded"
                        >
                          Login
                          {/* <Link to="/">
                          </Link> */}
                        </button>
                      </div>
                    </form>
                    <div className="text-center mt-4">
                      <a
                        className="no-underline hover:underline text-blue-dark text-xs"
                        href="#"
                      >
                        Forgot Your Password?
                      </a>
                    </div>
                    <div className="text-center mt-4">
                      <span
                        className="no-underline hover:underline text-blue-dark text-xs"
                        href="#register"
                      >
                        Don't Have an Account ?
                        <span className="text-lg">
                          <Link to="/signUp">SignUp Here</Link>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Sidebar />
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
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
          sessionStorage.setItem("useremail", res.data.data.email);
          sessionStorage.setItem("userId", res.data.data._id);
          toast.success("Login Success");
          navigate("/home");
        });
    } catch (err) {
      toast.error("Login Failed");
    }
  };

  return (
    <>
      {/* ----------------------------------------------- */}
      <div className="w-screen overflow-hidden h-screen bg-black grid grid-cols-1 justify-items-center items-center">
        <div className=" bg-white py-4 rounded-[6px]">
          <div className=" grid grid-cols-1 p-4 justify-items-center items-center justify-center my-8 ">
            <div className=" flex flex-col border-2 w-11/12 md:w-full justify-center">
              <h2 className="flex justify-center py-4 text-2xl">Login Here</h2>
              <form
                action=""
                onSubmit={handleLogin}
                className="grid py-4 px-8 grid-cols-1 justify-items-center gap-4"
              >
                <div>
                  <input
                    type="email"
                    required
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    className=" border-gray-500 border-[1px] py-2 px-2 rounded-[3px]"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                    className=" border-gray-500 border-[1px] py-2 px-2 rounded-[3px]"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="border-2 border-black px-2 py-1 rounded-[6px] hover:bg-black hover:text-white duration-700"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className=" flex justify-center pt-4">
              <h3>
                Don't Have An Account ?
                <span className=" hover:underline cursor-pointer"> Register Here</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

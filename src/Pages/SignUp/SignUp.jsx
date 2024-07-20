import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const registerUrl = "https://meet-up-backend-2kfj.onrender.com/api/v1/user/create";
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(registerUrl, {
          name: name,
          email: email,
          password: password,
          avatar: avatar,
        })
        .then((res) => {
          // console.log(res);
          navigate("/login");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const handleResume = async (e) => {
    e.preventDefault();
    const cloudData = new FormData();
    cloudData.append("file", avatar);
    cloudData.append("upload_preset", "image_preset");
    let cloudapi = "https://api.cloudinary.com/v1_1/da0g8xa3n/image/upload";
    let resImg = await fetch(cloudapi, {
      method: "POST",
      body: cloudData,
    });
    const final = await resImg.json();
    setAvatar(final.secure_url);
    // setFormData({ ...formData, resume: final.secure_url });
    alert("Resume Uploaded SuccessFully");
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
                  <h1 className="text-4xl text-center font-thin">Register</h1>
                  <div className="flex py-4 justify-center items-center">
                    <div>
                      <input
                        className="shadow appearance-none border-gray-700 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="resume"
                        type="file"
                        name="resume"
                        onChange={handleChange}
                        accept=".pdf,.doc,.docx"
                      />
                      <button onClick={handleResume}>Upload Image</button>
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <form
                      className="form-horizontal w-3/4 mx-auto"
                      onSubmit={handleRegister}
                    >
                      <div className="flex flex-col mt-4">
                        <input
                          id="full_name"
                          type="text"
                          className="flex-grow h-8 px-2 border rounded border-grey-400"
                          name="full_name"
                          required
                          placeholder="Full Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

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
                          required
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col mt-8">
                        <button
                          type="submit"
                          className="bg-[#000]  text-white text-sm font-semibold py-2 px-4 rounded"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    {/* <div className="text-center mt-4">
                      <a
                        className="no-underline hover:underline text-blue-dark text-xs"
                        href="#"
                      >
                        Forgot Your Password?
                      </a>
                    </div> */}
                    <div className="text-center mt-4">
                      <span
                        className="no-underline hover:underline text-blue-dark text-xs"
                        href="#register"
                      >
                        Already Have an Account?
                        <span className="text-lg">
                          <Link to="/login">Login Here</Link>
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
    </>
  );
};

export default SignUp;

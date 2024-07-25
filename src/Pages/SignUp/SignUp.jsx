import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginPage, {
  Username,
  Password,
  Submit,
  Title,
  Logo,
  Footer,
} from "@react-login-page/page6";
import { toast } from "react-toastify";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();

  const registerUrl =
    "https://meet-up-backend-2kfj.onrender.com/api/v1/user/create";
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
          toast.success("Register Success");
          navigate("/");
        });
      setName("");
      setEmail("");
      setPassword("");
      setAvatar("");
    } catch (err) {
      if (email !== null || name !== null || password !== null) {
        console.log("err");
      } else {
        toast.error("Please fill all the fields");
      }
    }
  };

  // const handleChange = (e) => {
  // };
  
  const handleResume = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);
    try{
      const cloudData = new FormData();
      cloudData.append("file", file);
      cloudData.append("upload_preset", "image_preset");
      let cloudapi = "https://api.cloudinary.com/v1_1/da0g8xa3n/image/upload";
      let resImg = await fetch(cloudapi, {
        method: "POST",
        body: cloudData,
      });
      const final = await resImg.json();
      setAvatar(final.secure_url);
      // setFormData({ ...formData, resume: final.secure_url });
      toast.success("Avatar Uploaded succes sfully");
    } catch(err){
      console.log(err)
    }
  };

  return (
    <>
      <div className="w-screen overflow-hidden h-screen bg-black grid grid-cols-1 justify-items-center items-center">
        <div className=" bg-white py-4 rounded-[6px]">
          <div className=" grid grid-cols-1 p-4 justify-items-center items-center justify-center my-8 ">
            <div className=" flex flex-col border-2 w-11/12 md:w-full justify-center">
              <h2 className="flex justify-center py-4 text-2xl">Sign-Up Here</h2>
              <form
                action=""
                onSubmit={handleRegister}
                className="grid py-4 px-8 grid-cols-1 justify-items-center gap-4"
              >
                <div className="flex flex-col border-2 gap-2 p-2 justify-center justify-items-center">
                  <div ><label className=" font-bold" htmlFor="avatar">Upload Avatar </label></div>
                  <div className="flex justify-center">
                  <input type="file" id="avatar" onChange={handleResume} name="avatar" placeholder="Upload Avatar" className=" w-[13vw]" />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    required
                    name="name"
                    id="name"
                    placeholder="UserName"
                    onChange={(e)=>setName(e.target.value)}
                    className=" border-gray-500 border-[1px] py-2 px-2 rounded-[3px]"
                  />
                </div>
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
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
            <div className=" flex justify-center pt-4">
              <h3>
                Already have an Account ?
                <span className=" hover:underline cursor-pointer"> Login Here</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

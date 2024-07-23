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
        toast.error("Please fill all the fields");
    }
  };

  const handleChange = async(event) => {
    const file = event.target.files[0];
    setAvatar(file);
    // e.preventDefault();
    const cloudData = new FormData();
    cloudData.append("file", avatar);
    cloudData.append("upload_preset", "image_preset");
    let cloudapi = "https://api.cloudinary.com/v1_1/da0g8xa3n/image/upload";
    let resImg = await fetch(cloudapi, {
      method: "POST",
      body: cloudData,
    });
    const final = await resImg.json();
    console.log("sfbdsk",final.secure_url)
    setAvatar(final.secure_url);
    // setFormData({ ...formData, resume: final.secure_url });
    toast.success("Avatar Uploaded successfully");
  };

  const handleResume = async (e) => {
    e.preventDefault();
    // const cloudData = new FormData();
    // cloudData.append("file", avatar);
    // cloudData.append("upload_preset", "image_preset");
    // let cloudapi = "https://api.cloudinary.com/v1_1/da0g8xa3n/image/upload";
    // let resImg = await fetch(cloudapi, {
    //   method: "POST",
    //   body: cloudData,
    // });
    // const final = await resImg.json();
    // setAvatar(final.secure_url);
    // // setFormData({ ...formData, resume: final.secure_url });
    // toast.success("Avatar Uploaded successfully");
  };

  return (
    <>
      {/* ----------------------------------------------- */}
      <div className="h-screen overflow-hidden">
        <LoginPage style={{ height: "50vh" }}>
          <Title style={{ height: "1vh" }}>Register Here</Title>

          <Username visible={false} />
          <Username
            keyname="name"
            label="UserName"
            name="name"
            placeholder="UserName"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Username
            onChange={handleChange}
            keyname="avatar"
            label="Avatar"
            type="file"
          >
            <button
              className=" border-2 duration-1000 p-3 hover:bg-gray-700"
              onClick={handleResume}
            >
              Upload
            </button>
          </Username>
          <Username
            keyname="email"
            label="Email"
            name="email"
            placeholder="Email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Password
            label="Password"
            placeholder="Password"
            name="userPassword"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Submit onClick={handleRegister}>Submit</Submit>
          <Logo>
            <img src="" alt="" />
          </Logo>
          <Footer>
            Already have an account? <Link to="/">Login In Here</Link>
          </Footer>
        </LoginPage>
      </div>
    </>
  );
};

export default SignUp;

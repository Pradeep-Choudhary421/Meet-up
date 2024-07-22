import React from "react";
import LoginPage, {
  Username,
  Password,
  Submit,
  Title,
  Input,
  Logo,
  Footer,
} from "@react-login-page/page6";

const LoginDemo = () => {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <LoginPage>
          <Title>Register Here</Title>
          
          <Username visible={false} />
          <Username keyname="avatar" label="Avatar" type="file"><button className=" border-2 p-3 hover:bg-gray-700">Upload</button></Username>
          
          {/* <Username
            keyname="avatar"
            label="Avatar"
            name="avatar"
            type="file"
          />     */}
          <Username
            keyname="name"
            label="UserName"
            name="name"
            placeholder="UserName"
            required
          />
          <Username
            keyname="email"
            label="Email"
            name="email"
            placeholder="Email"
            required
            type="email"
          />
          <Password
            label="Password"
            placeholder="Password"
            name="userPassword"
            required
          />
          <Submit>Submit</Submit>
          <Logo>
            <img src="" alt="" />
          </Logo>
          <Footer>
            Not a member? <a href="#">Sign up now</a>
          </Footer>
        </LoginPage>
      </div>
    </>
  );
};

export default LoginDemo;

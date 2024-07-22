import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
// import HelloUsers from "../../Components/HelloUser/HelloUsers";
const Home = () => {
  return (
    <>
      <div className="flex w-12/12 h-screen overflow-hidden text-white">
        <Sidebar />
        {/* <HelloUsers/> */}
      </div>
    </>
  );
};

export default Home;

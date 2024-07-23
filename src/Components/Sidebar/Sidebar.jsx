import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import Chats from "../Chats/Chats";
import userPro from "../../assets/user.png";
import HelloUsers from "../HelloUser/HelloUsers";

const Sidebar = () => {
  const [userData, setUserData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [chatData, setChatData] = useState(null);
  const [ham, setHam] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUserData, setFilteredUserData] = useState([]);

  // const handleLogout = () => {
  //   sessionStorage.removeItem("token");
  //   sessionStorage.removeItem("userName");
  //   sessionStorage.removeItem("avatar");
  //   sessionStorage.removeItem("useremail");
  //   navigate("/login");
  // };
  const userUrl =
    "https://meet-up-backend-2kfj.onrender.com/api/v1/user/getOther";
  const token = sessionStorage.getItem("token");
  const userName = sessionStorage.getItem("userName");
  const userAvatar = sessionStorage.getItem("avatar");
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(userUrl, {
        headers: {
          "auth-x-token": token,
        },
      })
      .then((res) => {
        setUserData(res.data.data);
      });
  }, []);

  // Update filtered user data when userData or searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUserData(userData);
    } else {
      const filteredUsers = userData.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUserData(filteredUsers);
    }
  }, [searchQuery, userData]);

  

  const handleToggle = (item) => {
    setToggle(true);
    setChatData(item);
    setHam(false);
  };
  const handleCloseToggle = () =>{
    setToggle(false);
    setHam(true)
  }

  const handleOpen = () => {
    setHam(!ham);
  };

  const handleClose = () => {
    setHam(!ham);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
          {/* <div className="absolute top-4 left-4 text-2xl block md:hidden">
          <FaBars />
          </div> */}
      <div className="bg-black w-[35%] lg:w-[25%] h-screen border-r-2 hidden md:block"> 
        <div className="flex flex-col items-center py-4 h-full w-full bg-black text-white">
          <div className="flex flex-col justify-center items-center">
            <div className="py-4 flex flex-col justify-center items-center">
              <div className="rounded-[50%] overflow-hidden w-3/12">
              <Link to="/userProfile">
                <img src={userAvatar} alt="" />
                </Link>
              </div>
              <div className="mt-2 text-2xl"> <Link to="/userProfile">
              {userName}
              </Link></div>
              <div className="pt-4 flex justify-center ">
                <input
                  required
                  type="text"
                  className="py-1 px-2 text-white required w-[100%] rounded-[4px] bg-transparent border-2"
                  placeholder="Search User"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {/* <button
                  type="submit"
                  className="border-2 rounded-[4px] hover:bg-white hover:text-black duration-700 py-1 px-2"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className=" py-6 overflow-y-scroll no-scrollbar w-full h-[55vh] flex justify-center text-2xl">
              <ul className=" border-2 w-72 h-fit">
                {filteredUserData.map((item, index) => (
                  <li
                    onClick={() => handleToggle(item)}
                    key={index}
                    className=" flex justify-center gap-16 hover:border-2 duration-100 cursor-pointer py-2 rounded-[4px] border-b-2"
                  >
                    {/* <div className="grid grid-cols-2 items-center "> */}
                      <div className="w-2/12 rounded-[50%] overflow-hidden object-cover">
                        {item.avatar === "" ? (
                          <img
                            className="w-fit"
                            src={userPro}
                            alt=""
                          />
                        ) : (
                          <img
                            className="w-fit"
                            src={item.avatar}
                            alt=""
                          />
                        )}
                      </div>
                      <div className="">
                      <h2>{item.name}</h2>
                      {/* </div> */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div>
              {/* <div className="py-2" onClick={handleLogout}>
                <button className="border-2 border-white p-2 rounded-[4px]">
                  Logout
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* responsive */}
      
        <div className="absolute text-2xl top-4 left-2 md:hidden text-white">
          {
            ham ? 
            <IoCloseSharp onClick={handleClose} /> :
          <FaBars onClick={handleOpen} />
          }
        </div>


      <div
        className={`bg-black pt-12 h-screen border-r-2 ${
          ham ? "block" : "hidden"
        } md:hidden`}
      >
        <div className="w-screen overflow-hidden ">
            <div className="grid grid-cols-1 justify-items-center justify-center items-center  overflow-hidden ">
              <div className=" overflow-hidden w-5/12 py-4">
              <Link className=" cursor-pointer" to="/userProfile">
              <img src={userAvatar} alt="" />
              </Link>
              </div>
            </div>
          <div className="flex justify-center items-center py-2">
            <form action="">
              <input
                required
                type="text"
                className="py-1 px-2 text-black required rounded-[4px] mr-2"
                placeholder="Search User"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
          </div>
          <div className=" flex py-2 flex-col justify-center items-center">
            <h1 className="text-4xl">People Available</h1>
            <div className=" py-6 mt-4 border-t-2 overflow-y-scroll no-scrollbar w-full h-[55vh] flex justify-center text-2xl">
              <ul className=" border-2 w-72 h-fit">
                {filteredUserData.map((item, index) => (
                  <li
                    onClick={() => handleToggle(item)}
                    key={index}
                    className=" flex justify-center gap-16 hover:border-2 duration-100 cursor-pointer py-2 rounded-[4px] border-b-2"
                  >
                    {/* <div className="grid grid-cols-2 items-center "> */}
                      <div className="w-2/12 rounded-[50%] overflow-hidden object-cover">
                        {item.avatar === "" ? (
                          <img
                            className="w-fit"
                            src={userPro}
                            alt=""
                          />
                        ) : (
                          <img
                            className="w-fit"
                            src={item.avatar}
                            alt=""
                          />
                        )}
                      </div>
                      <div className="">
                      <h2>{item.name}</h2>
                      {/* </div> */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {toggle && <Chats items={chatData} onClose={handleCloseToggle} /> }
      {!toggle && <HelloUsers/>}
    </>
  );
};

export default Sidebar;

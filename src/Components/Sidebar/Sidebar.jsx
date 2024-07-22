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
  const [ham, setHam] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUserData, setFilteredUserData] = useState([]);

  const userUrl =
    "https://meet-up-backend-2kfj.onrender.com/api/v1/user/getOther";
  const token = sessionStorage.getItem("token");
  const userName = sessionStorage.getItem("userName");
  const userAvatar = sessionStorage.getItem("avatar");
  const navigate = useNavigate();

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

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("avatar");
    navigate("/login");
  };

  const handleToggle = (item) => {
    setToggle(true);
    setChatData(item);
    setHam(false);
  };

  const handleOpen = () => {
    setHam(true);
  };

  const handleClose = () => {
    setHam(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="bg-black w-[35%] lg:w-[25%] h-screen border-r-2 hidden md:block">
        <div className="flex flex-col items-center py-4 h-full w-full bg-black text-white">
          <div className="flex flex-col justify-center items-center">
            <div className="py-4 flex flex-col justify-center items-center">
              <div className="rounded-[50%] overflow-hidden w-3/12">
                <img src={userAvatar} alt="" />
              </div>
              <div className="mt-2 text-2xl">{userName}</div>
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
              <div className="py-2" onClick={handleLogout}>
                <button className="border-2 border-white p-2 rounded-[4px]">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* responsive */}
      {!ham ? (
        <div className="absolute text-2xl top-2 left-4 md:hidden text-black ">
          <FaBars onClick={handleOpen} />
        </div>
      ) : (
        <div className="absolute text-2xl top-2 left-4 md:hidden text-white">
          <IoCloseSharp onClick={handleClose} />
        </div>
      )}
      <div
        className={`bg-black pt-12 h-screen border-r-2 ${
          ham ? "block" : "hidden"
        } md:hidden`}
      >
        <div className="w-screen">
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
          <div className=" flex py-8 flex-col justify-center items-center">
            <h1 className="text-4xl">People Available</h1>
            <div className=" py-6 overflow-hidden h-[80vh] flex justify-center text-2xl">
              <ul className=" overflow-scroll no-scrollbar">
                {filteredUserData.map((item, index) => (
                  <li
                    onClick={() => handleToggle(item)}
                    key={index}
                    className="my-2 hover:border-2 mx-12 duration-100 cursor-pointer px-2 py-2 rounded-[4px]"
                  >
                    <div className="flex justify-start items-start gap-8 ">
                      <div className="w-2/12 rounded-[50%] overflow-hidden object-cover">
                        <img
                          className="w-fit"
                          src={item.avatar}
                          alt={item.name}
                        />
                      </div>
                      <h2 className="py-2">{item.name}</h2>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {toggle && <Chats items={chatData} /> }
      {!toggle && <HelloUsers/>}
    </>
  );
};

export default Sidebar;

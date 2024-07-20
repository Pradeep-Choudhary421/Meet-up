import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const Chats = ({ items }) => {
  const [msg, setMsg] = useState("");
  const [getMsg, setGetMsg] = useState([]);
  const sendUrl = `https://meet-up-backend-2kfj.onrender.com/api/v1/message/send/${items._id}`;
  const getMessageUrl = `https://meet-up-backend-2kfj.onrender.com/api/v1/message/get/${items._id}`;
  const token = sessionStorage.getItem("token");
  const userAvatar = sessionStorage.getItem("avatar")

  const getAllMessages = async () => {
    axios
      .get(getMessageUrl, {
        headers: {
          "auth-x-token": sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setGetMsg(res.data.conversation.messages);
      })
      .catch((err) => {
        // console.log()
      });
  };
  useEffect(() => {
    getAllMessages();
  }, [items._id]);
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        sendUrl,
        {
          message: msg,
          senderId: sessionStorage.getItem("userId"),
        },
        {
          headers: {
            "auth-x-token": token,
          },
        }
      );
      setMsg("");
      getAllMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div className="w-full bg-black overflow-hidden h-screen">
        <div className="flex justify-start pl-8 py-3 border-2 ">
          <div className="rounded-[50%] overflow-hidden w-10 ">
            <img className="object-contain" src={items.avatar} alt="" />
          </div>
          <div className="flex justify-center items-center px-6">
            <h3 className="text-2xl">{items.name}</h3>
          </div>
        </div>
        {/* Chatting */}
        <div className="pb-52 pt-8 px-4 overflow-scroll h-[75vh] mb-8 no-scrollbar">
          {getMsg.length === 0 ? (
            <div>No chat</div>
          ) : (
            <div>
              {getMsg.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-start my-4 gap-4">
                    {item.receiverId === items._id ? (
                      <div className=" overflow-hidden w-[50px] rounded-[50%]">
                        <img src={userAvatar} alt="" />
                      </div>
                    ) : (
                      <div className=" overflow-hidden w-[50px] rounded-[50%]">
                        <img src={items.avatar} alt="" />
                      </div>
                    )}
                    <div className="w-6/12 border-2 rounded-lg p-2 flex justify-end">
                      {item.message}
                    </div>
                  </div>
                </div>
              ))}{" "}
            </div>
          )}
        </div>
        {/* Type Message */}
        <div className=" bottom-0 py-4 bg-black overflow-hidden">
          <div className="flex justify-center ">
            <form action="" onSubmit={sendMessage}>
              <input
                type="text"
                required
                onChange={(e) => setMsg(e.target.value)}
                className="bg-transparent border-2  rounded-lg w-[30vw]"
              />
              <button
                className="border-2 py-2 px-4 mx-6 text-white  rounded-lg"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;

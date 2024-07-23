import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import userPro from "../../assets/user.png";
const Chats = ({ items, onClose }) => {
  const [msg, setMsg] = useState("");
  const [getMsg, setGetMsg] = useState([]);
  const [socket, setSocket] = useState(null);
  const sendUrl = `https://meet-up-backend-2kfj.onrender.com/api/v1/message/send/${items._id}`;
  const getMessageUrl = `https://meet-up-backend-2kfj.onrender.com/api/v1/message/get/${items._id}`;
  const token = sessionStorage.getItem("token");
  const userAvatar = sessionStorage.getItem("avatar");
  useEffect(() => {
    const newSocket = io("https://meet-up-backend-2kfj.onrender.com", {
      query: { token },
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    socket.on("chat message", (newMessage) => {
      setGetMsg((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => socket.off("chat message");
  }, [socket]);

  const getAllMessages = async () => {
    try {
      const res = await axios.get(getMessageUrl, {
        headers: {
          "auth-x-token": token,
        },
      });
      setGetMsg(res.data.conversation.messages);
    } catch (error) {
      setGetMsg([]);
    }
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
      // Socket.io emit message to server
      socket.emit("chat message", {
        message: msg,
        senderId: sessionStorage.getItem("userId"),
        receiverId: items._id,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <>
      <div className="w-full bg-black overflow-hidden h-screen">
        <div className="flex justify-start pl-8 py-3 border-2 ">
        
          <div className="rounded-[50%] overflow-hidden w-10 ">
            {items.avatar === "" ? (
              <img className="w-fit" src={userPro} alt="" />
            ) : (
              <img className="w-fit" src={items.avatar} alt="" />
            )}
          </div>
          <div className="flex justify-center items-center px-6">
            <h3 className="text-2xl">{items.name}</h3>
          </div>
        </div>
        {/* Chatting */}
        <div className="pb-52 pt-8 px-4 overflow-scroll h-[75vh] mb-8 no-scrollbar">
          {getMsg.length === 0 ? (
            <div className="flex justify-center">
              <h2 className="text-2xl">Start Conversation!</h2>
            </div>
          ) : (
            <div>
              {getMsg.map((item, index) => (
                <div key={index}>
                  <div>
                    {item.senderId === sessionStorage.getItem("userId") ? (
                      <div className="flex justify-end my-4 gap-4">
                        <div className="max-w-48 sm:max-w-80 border-2 text-inherit rounded-lg p-2 flex justify-end overflow-hidden">
                          <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                            {item.message}
                          </div>
                        </div>
                        {item.receiverId === items._id ? (
                          <div className=" overflow-hidden w-[50px] rounded-[50%]">
                            <img src={userAvatar} alt="" />
                          </div>
                        ) : (
                          <div className=" overflow-hidden w-[50px] rounded-[50%]">
                            <img src={items.avatar} alt="" />
                          </div>
                        )}
                      </div>
                    ) : (
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
                        <div className="max-w-48 sm:max-w-80 border-2 text-inherit rounded-lg p-2 flex justify-end overflow-hidden">
                          <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                            {item.message}
                          </div>
                        </div>
                      </div>
                    )}
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
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="bg-transparent border-2 rounded-lg w-[55vw] sm:w-[40vw] lg:w-[30vw]"
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

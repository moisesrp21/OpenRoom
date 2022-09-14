import React from "react";
// import request from "../services/requests";
import { motion } from "framer-motion";
interface Props {
  user: string;
  setUser: (u: string) => void;
}
const ChatHeader = ({ user, setUser }: Props) => {
  const [username, setUsername] = React.useState("");
  const [button, setButton] = React.useState("initial");
  const variants = {
    initial: { display: "none", opacity: 0, y: 20 },
    show: { display: "flex", opacity: 1, y: 0 },
    hide: { opacity: 0, x: 20, transitionEnd: { display: "none" } },
  };
  //style
  const container = `
  absolute top-0 left-0 w-screen
  flex flex-col items-center
   bg-gradient-to-b from-[#262626] to-transparent 
  rounded-b-[20px] z-20 ${
    user === "" ? "h-screen backdrop-blur-[3px]" : "h-fit"
  }`;
  const userfieldcss = `flex-1 max-w-[230px]  mt-[10px] appearance-none rounded-[5px] bg-transparent border text-white border-gray-300 px-3 py-2 paceholder-gray-500 focus:z-10 focus:border-[#4992e2] focus:outline-none focus:ring-indigo-500 sm:text-sm`;
  const userbuttoncss = `flex-1 max-w-[230px] mt-[10px] appearance-none bg-transparent border-b text-[#4992e2] border-gray-300 px-3 py-2 focus:z-10 border-[#4992e2] focus:outline-none focus:ring-indigo-500 sm:text-sm`;
  const enter = () => {
    if (username !== "") {
      setUser(username);
      setUsername("");
      localStorage.setItem("user", username);
      localStorage.setItem("token", "123456"); //still working on it
      //creating username if new
      // request.createUser(username);
      setButton("hide");
    }
  };
  const leave = () => {
    setUser("");
    setUsername("");
    localStorage.setItem("user", "");
    localStorage.setItem("token", "");
  };
  const getAction = () => {
    if (user === "") {
      return "Enter Room";
    } else {
      return "Leave Room";
    }
  };
  return (
    <div className={container}>
      <div
        className={`w-[300px] ${
          user === ""
            ? "h-fit pt-[20px] "
            : "h-full pt-[40] backdrop-blur-[3px] "
        } flex justify-center rounded-[20px] `}
        onClick={() => {}}
      >
        {user !== "" ? (
          <motion.button
            onClick={() => {
              setButton("show");
            }}
            onBlur={() => {
              console.log("first");
              setButton("hide");
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={userbuttoncss}
          >
            {user}
          </motion.button>
        ) : (
          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={userfieldcss}
            placeholder="@username"
            autoFocus
            onFocus={() => setButton("show")}
            onBlur={() => setButton("hide")}
            value={username}
            onChange={(e) => {
              if (username === "") {
                setUsername(
                  "@" + e.target.value.toLowerCase().replace(/\s/g, "")
                );
              } else {
                setUsername(e.target.value.toLowerCase().replace(/\s/g, ""));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enter();
              }
            }}
          />
        )}
        {/* <UserIcon /> */}
      </div>
      <motion.div
        animate={button}
        variants={variants}
        transition={{ delay: 0.5, type: "spring" }}
        className={`hidden justify-center items-center w-[380px] h-fit`}
      >
        <div className="flex w-[230px] h-fit mt-[10px] items-center justify-center bg-[#406faa] rounded-b-[10px] shadow-lg">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white text-[0.9rem] m-[10px] p-2 bg-gradient-to-r from-[#4278df] to-[#4ea7e3] rounded-[10px]"
            onClick={() => {
              if (user === "") {
                enter();
              } else {
                leave();
              }
            }}
          >
            {getAction()}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
export default ChatHeader;

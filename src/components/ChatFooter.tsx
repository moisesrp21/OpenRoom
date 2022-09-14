import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { DataServiceType } from "../services/requests";
import { datatype } from "../services/requests";
import { motion } from "framer-motion";

interface Props {
  user: string;
  request: DataServiceType;
}
const ChatFooter = ({ user, request }: Props) => {
  const [input, setInput] = React.useState("");
  const sendMsg = async () => {
    if (input.length !== 0) {
      let data: datatype = {
        message: input,
        username: user,
        timestamp: new Date().toUTCString(),
      };
      await request.createMsg(data);
      setInput("");
    }
  };
  return (
    <div className="absolute bottom-[30px] md:bottom-0 w-full flex justify-center items-center bg-transparent">
      <div className="flex flex-row gap-3 justify-between items-center w-[80%] h-[60px] bottom-[15px] my-[15px] sticky z-2">
        <ImAttachment className="text-white h-[40px] w-[40px] bg-[#262626] p-1 rounded-[20px] shadow-md" />
        <input
          className="w-[90%] md:w-[80%] max-w-[800px] h-[70%] rounded-[30px] py-[15px] px-5 focus:outline-none shadow-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMsg();
          }}
          type="text"
          placeholder="Enter text here"
        />
        <motion.div whileTap={{ scale: 0.8, x: 5 }}>
          <BsFillArrowRightCircleFill
            className="text-[2.4rem] text-white  shadow-md"
            onClick={sendMsg}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ChatFooter;

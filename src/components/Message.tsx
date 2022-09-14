import { BiUser } from "react-icons/bi";
import { motion } from "framer-motion";

export interface messagetype {
  username: string;
  message: string;
  timestamp: string;
}
interface Props {
  type: string;
  name: string;
  message: string;
  time: string;
}

export default function Message({ type, name, message, time }: Props) {
  const getTimeElapsed = (oldDate: Date, recentDate: Date) => {
    const time_difference = Math.abs(recentDate.valueOf() - oldDate.valueOf());
    const days = Math.ceil(time_difference / (1000 * 60 * 60 * 24));
    switch (true) {
      case days >= 365:
        return `${Math.round(days / 365)}ys ago`;
      case days >= 31:
        return `${Math.round(days / 31)}ms ago`;
      case days <= 1:
        return "today";
      default:
        return `${days}days ago`;
    }
  };
  const g1 = "bg-gradient-to-r from-[#f07623] to-[#f3b522]";
  return type === "received" ? (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring" }}
      className="flex flex-row px-[20px] w-fit rounder-[10px]"
    >
      <div
        className={`flex justify-center items-center text-[1.5rem] ${g1} rounded-[20px] w-9 h-9 mr-2 mt-2`}
      >
        <BiUser className="text-white" />
      </div>
      <div className="flex flex-col w-fit rounder-[10px]">
        <div className="text-[0.8rem] mb-1 px-1 text-white">{name}</div>
        <p className="text-base px-2 py-0.5 w-fit rounded-b-[10px] rounded-r-[10px] bg-[#ffffff] shadow-md">
          {message}
        </p>
        <div className="flex mt-[2px] justify-end text-sm text-stone-500">
          {getTimeElapsed(new Date(), new Date(time))}
        </div>
      </div>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring" }}
      className="flex m-2 items-center ml-auto"
    >
      <div className="flex flex-col justify-end">
        <div className="flex justify-end px-2 pb-1 rounded-[10px]">
          <p className="text-base px-2 py-0.5 w-fit rounded-b-[10px] rounded-tl-[10px] bg-[#dcf8c6] shadow-md">
            {message}
          </p>
        </div>
        <div className="flex justify-start text-sm text-stone-500">
          {getTimeElapsed(new Date(), new Date(time))}
        </div>
      </div>
    </motion.div>
  );
}

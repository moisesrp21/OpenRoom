import { BiUser } from "react-icons/bi";
export default function UserIcon() {
  const usericon = "bg-gradient-to-r from-[#4278df] to-[#4ea7e3]";
  const css = `
  flex 
  justify-center items-center 
  text-[1.5rem] 
  cursor-pointer 
  ${usericon} 
  rounded-[20px] 
  w-[32px] h-[32px]
  shadow-lg`;
  return (
    <div className={css}>
      {<BiUser className="w-[75%] h-[75%] text-[#dedede]" />}
    </div>
  );
}

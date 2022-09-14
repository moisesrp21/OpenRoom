import React from "react";
import Message from "./Message";
import { messagetype } from "./Message";

interface Props {
  messages: messagetype[];
  user: string;
}
const ChatBody = ({ user, messages }: Props) => {
  const showMessages = (messages: messagetype[]) => {
    return messages.map((msg, i) => {
      return (
        <Message
          key={i}
          type={msg.username === user ? "sent" : "received"}
          name={msg.username}
          message={msg.message}
          time={msg.timestamp}
        />
      );
    });
  };
  const ref = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    let node = ref.current;
    if (node) {
      node.scrollTo(0, node.scrollHeight);
    }
  }, [messages]);
  return (
    <div className="flex flex-1 overflow-hidden w-screen bg-gradient-to-t from-[#262626]  to-[#282828]">
      <div ref={ref} className="flex flex-1 flex-col w-full  overflow-y-auto">
        <div className="min-h-[70px]"></div>
        {showMessages(messages)}
        <div className="min-h-[120px] md:min-h-[90px]"></div>
      </div>
    </div>
  );
};

export default ChatBody;

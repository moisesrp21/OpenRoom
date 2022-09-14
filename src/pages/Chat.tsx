import React from "react";
import ChatHeader from "../components/ChatHeader";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import { messagetype } from "../components/Message";
import request from "../services/requests";
import Pusher from "pusher-js";
import { motion } from "framer-motion";

// interface usertype {
//   username: string;
//   token: string;
// }
const Chat = () => {
  const [user, setUser] = React.useState("");
  const [messages, setMessages] = React.useState(Array<messagetype>());
  React.useLayoutEffect(() => {
    let user = localStorage.getItem("user");
    if (user !== "" && user !== null) {
      setUser(user);
    }
  }, []);
  React.useEffect(() => {
    request.getAll().then((res) => {
      setMessages(res.data);
    });
    // request.getUsers().then((res) => {
    //   setUsers(res.data);
    // });
  }, []);
  React.useEffect(() => {
    const pusher = new Pusher("59c8a517557afc694a45", { cluster: "us2" });
    let channel = pusher.subscribe("messages");
    channel.bind("inserted", (data: messagetype) => {
      setMessages([...messages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <ChatHeader user={user} setUser={setUser} />
      <div className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center z-10">
        <ChatBody user={user} messages={messages} />
        <ChatFooter user={user} request={request} />
      </div>
    </motion.div>
  );
};

export default Chat;

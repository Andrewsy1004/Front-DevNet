
import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import useAuthStore from "../../Store/authStore";
import { connectToServer } from "../helpers";

import { getUsers } from "../../Dashboard/Helpers";
import { Loader } from "../../Components";

export const Chat = () => {
  const token = useAuthStore((state) => state.token);
  const idUser = useAuthStore((state) => state.id);
  const fullName = useAuthStore((state) => state.fullName);

  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = connectToServer(token);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  useEffect(() => {
    if (socket && selectedUser) {
      socket.emit("get-message-history", {
        Reciever: selectedUser.id,
        sender: idUser,
      });

      const handleMessageHistory = (historicalMessages) => {
        const formattedMessages = historicalMessages.map((msg) => ({
          sender: msg.sender === fullName ? "me" : "other",
          text: msg.Mensaje,
          timestamp: msg.Fecha,
        }));
        setMessages(formattedMessages);
      };

      const handleNewMessage = (messageData) => {
        if (
          (messageData.sender === selectedUser.id &&
            messageData.Reciever === idUser) ||
          (messageData.sender === idUser &&
            messageData.Reciever === selectedUser.id)
        ) {
          setMessages((prevMessages) => {
            const isMessageExists = prevMessages.some(
              (msg) =>
                msg.text === messageData.Mensaje &&
                msg.sender ===
                (messageData.sender === idUser ? "me" : "other") &&
                msg.timestamp === messageData.timestamp
            );

            if (isMessageExists) return prevMessages;

            return [
              ...prevMessages,
              {
                sender: messageData.sender === idUser ? "me" : "other",
                text: messageData.Mensaje,
                timestamp: messageData.timestamp,
              },
            ];
          });
        }
      };

      socket.on("message-history", handleMessageHistory);
      socket.on("private-message", handleNewMessage);

      return () => {
        socket.off("message-history", handleMessageHistory);
        socket.off("private-message", handleNewMessage);
      };
    }
  }, [socket, selectedUser, idUser]);

  const sendMessage = () => {
    if (!userMessage.trim()) {
      toast.error("El mensaje no puede estar vacío.");
      return;
    }

    const messagePayload = {
      Reciever: selectedUser.id,
      sender: idUser,
      Mensaje: userMessage,
    };

    socket.emit("send-private-message", messagePayload);
    setUserMessage("");
  };

  const fetchUsers = async () => {
    const response = await getUsers(token);
    if (response.ok) {
      setUsers(response.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) return <Loader />;


  return (
    <div className="flex mt-3 mr-10">
      {/* Sidebar - Lista de usuarios */}
      <div className="w-1/3  border-r overflow-y-auto ml-10">
        <h2 className="text-xl font-semibold p-4 border-b">Usuarios</h2>
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center gap-4 p-4 cursor-pointer ${selectedUser?.id === user.id ? "bg-gray-200" : ""
              }`}
            onClick={() => setSelectedUser(user)}
          >
            <img
              src={user.urlPhoto}
              alt={user.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{user.fullName}</p>
              <p className="text-sm text-gray-500">{user.Rol}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Box */}
      <div className=" flex flex-col">
        {selectedUser ? (
          <>
            {/* Header del chat */}
            <div className="flex items-center gap-4 p-4 border-b min-w-[800px]">
              <img
                src={selectedUser.urlPhoto}
                alt={selectedUser.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <Link to={`/PerfilUsuario/${selectedUser?.id}`} className="text-Black font-medium">
                  {selectedUser.fullName}
                </Link>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-xs mb-4 ${msg.sender === "me" ? "ml-auto text-right" : "mr-auto"
                    }`}
                >
                  <div
                    className={`p-3 rounded-lg ${msg.sender === "me"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                      }`}
                  >
                    {msg.text}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    <span>
                      {msg.timestamp
                        ? format(new Date(msg.timestamp), "dd/MM/yyyy HH:mm:ss")
                        : new Date().toLocaleString()}
                    </span>
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Input para enviar mensajes */}
            <div className="flex p-4 border-t gap-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Enviar
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 ml-60">
            <h2 className="text-xl">Selecciona un usuario para comenzar a chatear</h2>
          </div>
        )}
      </div>
    </div>
  );
};

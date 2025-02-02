
import { Manager } from "socket.io-client";


let socket = null;

export const connectToServer = (token) => {
    const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
        extraHeaders: {
            authentication: token,
        },
    });

    socket?.removeAllListeners();
    socket = manager.socket("/");

    addListeners();


    return socket;
};


const addListeners = () => {


    socket.on("connect", () => {
        console.log("conectado");
    });

    socket.on("disconnect", () => {
        console.log("Desconectado del servidor");
    });
   
    socket.on("clients-updated", ( clients ) => {
        let clientsHtml = "";        
      });

}
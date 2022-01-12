import { useState, useEffect } from "react";
import io from 'socket.io-client';

const useSocket = (onConnect, [name, ...dependencies]) => {

  const [socket, setSocket] = useState();

  useEffect(() => {
    
    if (!name) return;

    const newSocket = io(process.env.REACT_APP_API_DOMAIN);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(`Socket Connected to Presentation: ${name}`);
      onConnect(newSocket);
    });

    return () => newSocket.close();
  
  }, [name, ...dependencies]);

  return socket;

}

export default useSocket;
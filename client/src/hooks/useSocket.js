import { useState, useEffect } from "react";
import io from 'socket.io-client';

const useSocket = (id) => {

  const [socket, setSocket] = useState();

  useEffect(() => {
    
    if (!id) return;

    const newSocket = io(process.env.REACT_APP_API_DOMAIN);
    setSocket(newSocket);

    console.log(`Socket Connected: ${id}`);

    return () => newSocket.close();
  
  }, [id]);

  return socket;

}

export default useSocket;
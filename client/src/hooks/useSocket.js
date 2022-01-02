import { useState, useEffect } from "react";
import io from 'socket.io-client';

const useSocket = () => {

  const [socket, setSocket] = useState();

  useEffect(() => {
      
      const newSocket = io(process.env.REACT_APP_API_DOMAIN);
      setSocket(newSocket);
  
      return () => newSocket.close();
  
  }, []);

  return socket;

}

export default useSocket;
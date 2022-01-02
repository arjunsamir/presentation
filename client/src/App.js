// Import Stuff Here
// import { useEffect, useState } from "react";
import useSocket from "./hooks/useSocket";

import Login from './pages/Login';

// Create App
const App = () => {

  // Establish Socket Connection
  const socket = useSocket();

  console.log(socket);


  return (
    <Login />
  )
}

export default App;

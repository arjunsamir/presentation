// Import Stylesheet
import './style/main.scss';

// Import Stuff Here
import useStateUpdate from "./hooks/useStateUpdate";
import useSocket from "./hooks/useSocket";

import Login from './pages/Login';

// Import Store
import reducer from "./store/reducer";
import initialState from "./store/initialState";
import AppContext from "./store/AppContext";

// Register Component Views
const views = { Login }

// Create App
const App = () => {

  // Create State
  const [state, update] = useStateUpdate(reducer, initialState);

  // Establish Socket Connection
  const socket = useSocket();

  // Get Current Page
  const View = views[state.view];

  return (
    <AppContext.Provider value={{ state, update, socket }}>
      <View />
    </AppContext.Provider>
  )
}

export default App;

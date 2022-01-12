// Import Stylesheet
import './style/main.scss';

// Import Stuff Here
import useStateUpdate from "./hooks/useStateUpdate";
import useSocket from "./hooks/useSocket";

// Import Views
import Login from './pages/Login';
import WaitingRoom from './pages/WaitingRoom';
import Presentation from './pages/Presentation';

// Import Store
import reducer from "./store/reducer";
import initialState from "./store/initialState";
import AppContext from "./store/AppContext";

// Register Component Views
const views = { Login, WaitingRoom, Presentation };

// Create App
const App = () => {

  // Create State
  const [state, update] = useStateUpdate(reducer, initialState);

  // Establish Socket Connection
  const socket = useSocket((s) => {

    s.on("guests-changed", ({ count }) => update("count", count))

  }, [state.name]);

  // Get Current Page
  const View = views[state.view];

  return (
    <AppContext.Provider value={{ state, update, socket }}>
      <View />
    </AppContext.Provider>
  )
}

export default App;

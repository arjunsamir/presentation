import { useReducer } from "react";

const useStateUpdate = (reducer, initialState) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const update = (key, data) => dispatch({
    type: `SET_${key.toUpperCase()}`,
    data
  });

  return [state, update];

}


export default useStateUpdate;
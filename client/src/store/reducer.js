import initialState from "./initialState";

const reducer = (state = initialState, action) => {

  const merge = (field, payload, currentState = state) => {
    return Object.assign({}, currentState, {
      [field]: payload ?? action.data
    })
  }

  switch (action.type) {

    case "SET_VIEW":
      return merge("view");

    case "SET_CODE":
      return merge("code");

    case "SET_ROLE":
      return merge("role");

    case "SET_NAME":
      return merge("name");

    case "SET_COUNT":
      return merge("count");

    case "SET_ID":
      return merge("id");

    case "SET_MULTIPLE":
      return Object.assign({}, state, action.data);

    case "SET_COUNTING":
      return merge("counting");

    default:
      return state;

  }

}


export default reducer;
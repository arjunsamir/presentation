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

    case "SET_SECRET":
      return merge("secret");

    default:
      return state;

  }

}


export default reducer;
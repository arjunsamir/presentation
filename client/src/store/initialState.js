// Get Querystring
const url = new URLSearchParams(window.location.search);
const code = url.get("code");
const role = url.get("role");

const initialState = {
  view: "Login",
  code: code ?? "",
  role: role ?? "guest",
  secret: ""
}

export default initialState;
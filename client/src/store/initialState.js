// Get Querystring
const url = new URLSearchParams(window.location.search);
const code = url.get("code");
const role = url.get("role");

// Clean URL
window.history.replaceState({}, document.title, "/");

const initialState = {
  view: "Login",
  code: code ?? "",
  role: role ?? "guest",
  name: "",
  count: 0,
  id: window.sessionStorage.getItem("id") ?? "",
  counting: false,
  slide: 0
}

export default initialState;
// Get Querystring
const url = new URLSearchParams(window.location.search);
const code = url.get("code") ||window.sessionStorage.getItem("code");
const role = url.get("role");

// Clean URL
if (process.env.NODE_ENV === "production") window.history.replaceState({}, document.title, "/");

const initialState = {
  view: "Login",
  code: code || "",
  role: role ?? "guest",
  name: "",
  count: 0,
  counting: false,
  slide: 0,
  key: window.sessionStorage.getItem("key") ?? ""
}

export default initialState;
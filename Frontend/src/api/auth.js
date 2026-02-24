import api, { setToken } from "./api";

export async function fetchUser() {
  const token = localStorage.getItem("token");
  if (token) setToken(token);

  const res = await api.get("/user");
  return res.data;
}

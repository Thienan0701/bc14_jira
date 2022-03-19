import axios from "axios";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwMyIsIkhldEhhblN0cmluZyI6IjAxLzAxLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3MjUzMTIwMDAwMCIsIm5iZiI6MTY0NzUzNjQwMCwiZXhwIjoxNjcyNjc4ODAwfQ.v1pky9yKwnujpoxePbaS26rxq_cGpKrk0GvA0sHAVqY";

const api = axios.create({
  baseURL: "https://jiranew.cybersoft.edu.vn/api/",
});
api.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      TokenCybersoft: TOKEN_CYBERSOFT,
      Authorization: localStorage.getItem("UserLogin")
        ? "Bearer " + JSON.parse(localStorage.getItem("UserLogin")).accessToken
        : "",
    };

    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);

export default api;

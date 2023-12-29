import axios from "axios";

const apiV1 = axios.create({
  baseURL: "http://localhost:9000/v1/",
  timeout: 3000,
});

export default apiV1;

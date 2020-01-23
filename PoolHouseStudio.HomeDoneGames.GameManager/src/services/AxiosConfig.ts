import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000
  //   headers: { "X-Custom-Header": "foobar" }
});

export default instance;

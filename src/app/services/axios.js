import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://185.226.117.119:8080/zanbori/api/v1";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
};

export default axiosClient;

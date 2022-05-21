import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://api.zanbori.ir/zanbori/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;

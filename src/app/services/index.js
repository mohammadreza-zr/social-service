import axiosClient from "./axios";

export const GetRequest = async (URL, option = {}) => {
  return await axiosClient.get(`/${URL}`, option).then((response) => response);
};

export const PostRequest = async (URL, payload, option = {}) => {
  return await axiosClient.post(`/${URL}`, payload, option).then((response) => response);
};

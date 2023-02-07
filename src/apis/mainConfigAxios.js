import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  // transformResponse: [
  //   function (data) {
  //     console.log(data);
  //     return data;
  //   },
  // ],
});
axiosClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
});

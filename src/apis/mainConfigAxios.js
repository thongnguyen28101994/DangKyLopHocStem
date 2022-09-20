import axios from "axios";

export const createRequest = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 1000,
  transformResponse: [
    function (data) {
      console.log(data);
      return data;
    },
  ],
});

import axios from "axios";

export const createRequest = axios.create({
  baseURL: "",
  timeout: 1000,
  transformResponse: [
    function (data) {
      console.log(data);
      return data;
    },
  ],
});

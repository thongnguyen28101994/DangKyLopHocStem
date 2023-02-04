import { axiosClient } from "./mainConfigAxios";

export const RegisterApi = {
  getUserData: () => {
    const url = "/User/getUserData";
    return axiosClient.get(url);
  },
};

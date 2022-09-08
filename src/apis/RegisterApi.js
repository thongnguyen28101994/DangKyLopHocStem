import { createRequest } from "./mainConfigAxios";

export const RegisterApi = {
  getUserData: () => {
    const url = "/User/getUserData";
    return createRequest.get(url);
  },
};

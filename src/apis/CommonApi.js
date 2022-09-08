import { createRequest } from "./mainConfigAxios";

export const CommonApi = {
  getDistrict: () => {
    const url = "/Common/GetDistrict";
    return createRequest.get(url);
  },
  getSchoolByDistrictID: (id) => {
    const url = `/Common/GetSchoolByDistrictId/${id}`;
    return createRequest.get(url);
  },
};

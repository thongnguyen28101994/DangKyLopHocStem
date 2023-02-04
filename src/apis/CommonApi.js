import { axiosClient } from "./mainConfigAxios";

export const CommonApi = {
  getDistrict: () => {
    const url = `/GetDMQuanHuyen`;
    return axiosClient.get(url);
  },
  getSchoolByDistrictID: (id) => {
    const url = `/GetDMTruong/${id}`;
    return axiosClient.get(url);
  },
  postGetDataUser: (user) => {
    const url = `/LoginForUser`;
    return axiosClient.post(url, user);
  },
  getClassList: () => {
    const url = `/GetLopHoc`;
    return axiosClient.get(url);
  },
  getAllNguoiDungByDonViID: (DonViID) => {
    const url = `/GetAllNguoiDungByDonViID/${DonViID}`;
    return axiosClient.get(url);
  },
  getParticipant: (DonViID, CLASS_ID) => {
    const url = `/GetParticipant/${DonViID}/${CLASS_ID}`;
    return axiosClient.get(url);
  },
  postRegisterParticipant: (param) => {
    const url = `/RegisterClass`;
    return axiosClient.post(url, param);
  },
};

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
  postLoginUser: (user) => {
    const url = `/LoginForUser`;
    return axiosClient.post(url, user);
  },
  postLoginAdmin: (user) => {
    const url = "/LoginForAdmin";
    return axiosClient.post(url, user);
  },
  getClassList: () => {
    const url = `/GetLopHoc`;
    return axiosClient.get(url);
  },
  getClassListByID: (ID) => {
    const url = `/GetLopHocByID/${ID}`;
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
  getOfficialParticipant: (DonViID, CLASS_ID) => {
    const url = `/GetOfficialParticipant/${DonViID}/${CLASS_ID}`;
    return axiosClient.get(url);
  },

  postRegisterParticipant: (param) => {
    const url = `/RegisterClass`;
    return axiosClient.post(url, param);
  },
  getRemoveParticipatn: (id) => {
    const url = `/DeleteParticipant/${id}`;
    return axiosClient.get(url);
  },
  getOfficialParticipantUnpaid: (DonViID, CLASS_ID)=>{
    const url = `/GetOfficialParticipantUnpaid/${DonViID}/${CLASS_ID}`;
    return axiosClient.get(url);
  },
  getOfficialParticipantPaid: (DonViID, CLASS_ID)=>{
    const url = `/GetOfficialParticipantPaid/${DonViID}/${CLASS_ID}`;
    return axiosClient.get(url);
  },
  getOfficialParticipantNotRegister : (DonViID, CLASS_ID) => {
    const url = `/GetOfficialParticipantNotRegister/${DonViID}/${CLASS_ID}`;
    return axiosClient.get(url);
  },
  postChangeStatusToPaid: (param) => {
    const url = `/ChangeStatusToPaid`;
    return axiosClient.post(url, param);
  },
  postChangeStatusToRegisted: (param) => {
    const url = `/ChangeStatusToRegisted`;
    return axiosClient.post(url, param);
  },
  postUpdateClass : (param) => {
    const url = `/UpdateClass`;
    return axiosClient.post(url, param);
  },
  postInsertClass : (param) => {
    const url = `/InsertClass`;
    return axiosClient.post(url, param);
  },
  getOfficialParticipantIsPaidV2:() => {
    const url='/GetOfficialParticipantIsPaidV2';
    return axiosClient.get(url);
  },
  getOfficialParticipantNotRegisterV2 : ()=>{
    const url ='/GetOfficialParticipantNotRegisterV2';
    return axiosClient.get(url);
  }
};

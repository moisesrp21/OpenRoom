import axios, { AxiosResponse } from "axios";

export type datatype = {
  message: string;
  username: string;
  timestamp: string;
};
export interface DataServiceType {
  getAll: () => Promise<AxiosResponse<any, any>>;
  createMsg: (data: datatype) => Promise<AxiosResponse<any, any>>;
}
class DataService {
  prod: string = "https://moisesrp.dev/openroom";
  dev: string = "http://localhost:9000/openroom";
  baseurl = this.prod;
  getAll() {
    return axios.get(`${this.baseurl}/messages/sync/`);
  }
  createMsg(data: datatype) {
    return axios.post(`${this.baseurl}/messages/new`, data);
  }
  // getUsers() {
  //   return axios.get(`${this.baseurl}/users/sync`);
  // }
  // createUser(user: string) {
  //   return axios.post(`${this.baseurl}/users/new}`, { username: user });
  // }
}
export default new DataService();

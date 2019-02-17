import { apiURL } from "config/constants";
const axios = require("axios");

export default class BackendFactory {
  constructor(opts = {}) {
    const { csrf = "", timeout = 5000 } = opts;
    this.req = {
      timeout,
      headers: { _csrf: csrf }
    };
  }

  getRequest(options = {}) {
    const { resource = "", data = {} } = options;
    this.req.baseUrl = `${apiURL}/${resource}`;
    return axios.create(this.req).get(this.req.baseUrl).then(res => res.data)
  }

  postRequest(options = {}) {}

  deleteRequest(options = {}) {}

  putRequest(options = {}) {}
  optionRequest(options = {}) {}
}

const bf = new BackendFactory();

export function sendGet(Obj) {
  return bf.getRequest(Obj);
}

export function sendPost(Obj) {
  return bf.postRequest(Obj);
}

export function sendDelete(Obj) {
  return bf.deleteRequest(Obj);
}

export function sendPut(Obj) {
  return bf.putRequest(Obj);
}

export function sendOption(Obj) {
  return bf.optionRequest(Obj);
}

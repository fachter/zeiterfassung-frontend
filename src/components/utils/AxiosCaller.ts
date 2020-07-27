import axios from "axios";
import ApplicationState from "@/components/state/ApplicationState";

export default class AxiosCaller {

  config: object = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + ApplicationState.accountInfo.key
    }
  }

  public async asyncPostRequest(url: string, data: object = {}) {
    return await axios.post(url, data, this.config)
  }

  public postRequest(url: string, data: object|number = {}) {
    return axios.post(url, data, this.config);
  }
}
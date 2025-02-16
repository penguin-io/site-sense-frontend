import axios from "axios";
import { CREATE_ZONE } from "../../constants";

export const createZone = (data) => {
    return axios.post(CREATE_ZONE,data);
}
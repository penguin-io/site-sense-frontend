import axios from "axios";
import { CREATE_ZONE } from "../../constants";

export const deleteZone = (data) => {
    return axios.delete(CREATE_ZONE,data);
}
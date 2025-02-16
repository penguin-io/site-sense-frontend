import axios from "axios";
import { CREATE_ZONE } from "../../constants";

export const deleteZone = (zone_id) => {
    return axios.delete(CREATE_ZONE,{
        params : {
            zone_id
        }
    });
}
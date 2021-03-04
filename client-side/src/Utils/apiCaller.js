import api from "./axios";
import {ENDPOINT} from '../Utils/endpoint'
export default function callApi(endpoint, method, data = null) {
    return api({
        method: method,
        url: `${ENDPOINT}/${endpoint}`,
        data: data,
    }).catch((err) => {
        console.log(err);
    });
}
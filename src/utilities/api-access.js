import axios from "axios";

const URL = "http://localhost:3000/api";
const API_VERSION_1 = "v1";

export function getInterests() {
	return axios.get(`${URL}/${API_VERSION_1}/interests`);
}

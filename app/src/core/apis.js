import axios from "axios";
const url = "http://localhost:3000";

export function getJobs(page = 1) {
	return axios
		.get(`${url}/api/jobs?page=${page}`)
		.then(({ data }) => data);
}

export function deleteJob(id) {
	return axios.delete(`${url}/api/jobs/${id}`);
}


import axios from "axios";

const api = axios.create({
	//baseURL: `${import.meta.env.VITE_API_URL}/api`,
	baseURL: `http://localhost:8080/api`,
	withCredentials: true,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json'
	}
})

export default api
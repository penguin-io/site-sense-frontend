import axios from "axios"
import { store } from "../redux/store"
import { clearToken } from "src/utils/indexedDb"

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})

axiosPrivate.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const authToken = state.auth.authToken
    if (authToken) {
      config.headers["x-auth-token"] = authToken
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message === "Invalid or expired token"
    ) {
      clearToken()
    }
    return Promise.reject(error)
  }
)

export default axiosPrivate

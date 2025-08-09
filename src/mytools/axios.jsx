import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://assignment-11-server-liart-eta.vercel.app',
  withCredentials: true
});

let interceptorId = null;

export const setUserInterceptor = (user) => {
   console.log("setAxios= ", user);
  // Eject old interceptor if it exists
  if (interceptorId !== null) {
    axiosInstance.interceptors.request.eject(interceptorId);
  }

  // Add new interceptor
  interceptorId = axiosInstance.interceptors.request.use(
    (config) => {
      if (user) {
        config.headers['x-user'] = JSON.stringify(user);
      }else {
      delete config.headers['x-user']; // ❌ remove header if no user
    }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default axiosInstance;

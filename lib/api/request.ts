// import { mainUrl } from "@/constants";
// import store from "@/app/store/store";
// import axios from "axios";

// const getLocaleFromCookie = () => {
//   if (typeof document !== "undefined") {
//     const match = document.cookie.match(/(^| )NEXT_LOCALE=([^;]+)/);
//     return match ? match[2] : "en";
//   }
//   return "en";
// };

// const request = axios.create({
//   baseURL: mainUrl,
//   withCredentials: true,
// });

// console.log({ mainUrl });
// request.interceptors.request.use(
//   (config) => {
//     const state = store.getState();
//     const token =
//       state.auth?.token ||
//       (typeof window !== "undefined" ? localStorage.getItem("token") : null);

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     // config.headers["locale"] = getLocaleFromCookie();

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// request.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//     }
//     return Promise.reject(error);
//   }
// );

// export default request;

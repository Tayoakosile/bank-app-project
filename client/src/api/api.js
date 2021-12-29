import axiosAsync from "axios";

export const axios = axiosAsync.create({
  baseURL: "http://localhost:4000/user",
});

export const isUserEmailUnique = (url, mode, verify) => {
  const res = axios.post(url, null, {
    params:
      mode === "email" ? { email: `${verify}` } : { username: `${verify}` },
  });
  return res;
};

export const postRequestToServer = (url, pin) => {
  if (pin) {
    return axios.post(url, pin);
  } else {
    return axios.post(url);
  }
};

export const getDataFromServer = (url, data) => {
  if (data) {
    const res = axios.get(url, data);
    return res;
  } else {
    const res = axios.post(url);
    return res;
  }
};

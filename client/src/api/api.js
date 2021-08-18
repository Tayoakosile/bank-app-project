import axiosAsync from 'axios'
import { useForm } from 'react-hook-form'

export const axios = axiosAsync.create({
 baseURL: 'http://localhost:4000/user',
})

export const isUserEmailUnique = (url, mode, verify) => {
 const res = axios.post(url, null, {
  params: mode === 'email' ? { email: `${verify}` } : { username: `${verify}` },
 })
 return res
}

export const postRequestToServer = (url, pin) => {
 if (pin) {
  const data = axios.post(url, pin)
  return data
 } else {
  const res = axios.post(url)
  return res
 }
}

export const getDataFromServer = (url, data) => {
 if (data) {
  const res = axios.get(url, data)
  return res
 } else {
  const res = axios.post(url)
  return res
 }
}

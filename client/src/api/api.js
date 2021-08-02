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

export const createNewUser = (url, data) => {
 const res = axios.post(url, data)
 return res
}

export const logUserIn = (url, data) => {
 const res = axios.post(url, data)
 return res
}

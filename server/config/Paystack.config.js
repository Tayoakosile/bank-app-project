import request from 'request'

export const initializePayment = (form, mycallback) => {
    const SECRET_KEY = process.env.PAYSTACK_API_KEY_PRIVATE
 console.log(' Paystack secret key', SECRET_KEY,process.env.PAYSTACK_API_KEY_PRIVATE)
 const options = {
  url: 'https://api.paystack.co/transaction/initialize',
  headers: {
   authorization: `Bearer ${SECRET_KEY}`,
   'content-type': 'application/json',
   'cache-control': 'no-cache',
  },
  form,
 }
 const callback = (error, response, body) => {
  return mycallback(error, body, response)
 }
 request.post(options, callback)
}
export const verifyPayment = (ref, mycallback) => {
 const options = {
  url: `https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`,
  headers: {
   authorization: MySecretKey,
   'content-type': 'application/json',
   'cache-control': 'no-cache',
  },
 }
 const callback = (error, response, body) => {
  return mycallback(error, body)
 }
 request(options, callback)
 return { initializePayment, verifyPayment }
}

import { initializePayment } from '../../config/Paystack.config.js'

export const MakeTransaction = (req, res) => {
 const { amount, email, full_name } = req.body
 const form = { amount, email, full_name }
 form.metadata = {
  full_name: form.full_name,
 }
 form.amount *= 100
 initializePayment(form, (error, body) => {
  if (error) {
   //handle errors
   console.log(error)
   return
  }
  const response = JSON.parse(body)
  res.status(200).json({ success: true, response })
  console.log(body)
 })
}

export const VerifyTransaction = () => {}

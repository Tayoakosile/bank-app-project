import mailJet from 'node-mailjet'
import randomize from 'randomatic'
import Code from '../models/SecretCode.js'

export const sendMailToUser = (firstname, lastname, email, verification) => {
 const sendEmail = mailJet.connect(
  process.env.EMAIL_API_KEY_PUBLIC,
  process.env.EMAIL_API_KEY_PRIVATE
 )

 const request = sendEmail.post('send', { version: 'v3.1' }).request({
  Messages: [
   {
    From: {
     Email: 'oluwatayocodes@gmail.com',
     Name: 'Akosile from KweeqFundz',
    },
    To: [
     {
      Email: email,
      Name: firstname + '' + lastname,
     },
    ],
    Subject: `Hi ${firstname} ${lastname}`,
    TextPart: 'My first Mailjet email',
    HTMLPart: verification,
    CustomID: 'AppGettingStartedTest',
   },
  ],
 })
 return request
}
/* Generate random codes */
export const SecretCodeToUser = (random, length) => {
 return randomize(random, length)
}
export const NewSecretCode = (model, email) => {
 const newSecretCode = new model({
  email,
  secretCode: SecretCodeToUser('0as', 11),
 })

 return newSecretCode.save()
}

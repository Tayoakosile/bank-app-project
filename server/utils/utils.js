import mailJet from 'node-mailjet'
import randomize from 'randomatic'
import Code from '../Schema/SecretCode.js'

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
     Name: 'Akosile',
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

export const SecretCodeToUser = (random, length) => {
 return randomize(random, length)
}
export const NewSecretCode = (email) => {
 const newSecretCode = new Code({
  email,
  secretCode: SecretCodeToUser('0as', 12),
 })

 return newSecretCode.save()
}

import mailJet from 'node-mailjet'
import uniqid from 'uniqid'

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

export const SecretCodeToUser = () => {
 return uniqid()
}

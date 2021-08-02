export const SendMail = (email,firstname) => {
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
      Name: firstname.toUpperCase(),
     },
    ],
    Subject: `Hi ${firstname}`,
    TextPart: 'My first Mailjet email',
    HTMLPart: `<h3>Dear ${firstname}, Please Verify your account <a href='http://localhost:3000/verify/${_id}/${secretCode}'>Mailjet</a>!</h3><br />May the delivery force be with you!`,
    CustomID: 'AppGettingStartedTest',
   },
  ],
 })
 return request
}

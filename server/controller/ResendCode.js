import uniqid from 'uniqid'
import mailJet from 'node-mailjet'

export const ResendCode = async (req, res) => {
 try {
  const secretCode = uniqid()
  const { _id } = req.body

  const user = await User.find(Mongoose.Types.ObjectId(_id))

  console.log(user)
  if (!user) {
   res.status(400).json({ success: false })
  } else {
   Code.deleteMany({ email: user.email })
   const newCode = await new Code({
    code: secretCode,
    email: user.email,
   })
   await newCode.save()

   const sendEmail = mailJet.connect(
    process.env.EMAIL_API_KEY_PUBLIC,
    process.env.EMAIL_API_KEY_PRIVATE
   )
   const response = await sendEmail.post('send', { version: 'v3.1' }).request({
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

   console.log(response)
  }
 } catch (err) {
  console.log(err, 'Erorr on resending code')
 }
}

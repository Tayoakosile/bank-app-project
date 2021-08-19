import fs from 'fs'

export const StoreUserID = (req, res) => {
 const userId = JSON.stringify(req.params)
 console.log(req.params.id)
 fs.writeFile('userProfileImage.txt', userId, err => {
  if (err) {
   console.error(err)
   return res.status(400).json({ success: false })
  }

  return res.status(200).json({ success: true })

  //file written successfully
 })
}



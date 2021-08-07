import express from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import Route from './routes/route.js'
import User from './models/SignUp.js'
import transactionRoute from './routes/transactionRoute.js'

dotenv.config()
// App initialization

const app = express()
const port = process.env.PORT || 4000

//Default config
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Routes

// Mongoose Initialization
mongoose.connect(process.env.LOCALMONGOURI, {
 useNewUrlParser: true,
 useFindAndModify: true,
})

//mongoose Initialization
const db = mongoose.connection
db.once('open', () => {
 console.log('Database fully connected')
 app.use('/user', Route)
 app.use('/user', transactionRoute)
 app.get('/', (req, res) => {
  res.send('Hey there')
 })

 app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
 })
})

db.on('error', console.error.bind(console, 'connection error:'))

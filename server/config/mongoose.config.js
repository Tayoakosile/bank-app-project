import mongoose from 'mongoose'

// Mongoose Initialization
mongoose.connect(process.env.LOCALMONGOURI, {
 useNewUrlParser: true,
 useFindAndModify: true,
})

//mongoose Initialization\
export default mongoose

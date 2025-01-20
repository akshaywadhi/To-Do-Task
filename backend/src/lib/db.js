import mongoose from 'mongoose'


export const connectDB = async () => {

  try{
let connect = await mongoose.connect(process.env.MONGO_URI)
console.log(`Connected To Database ${connect.connection.host}`)

  }
  catch(err){
    console.log(`Something Went Wrong Connecting Database ${err}`)
  }
}
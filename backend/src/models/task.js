import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  userId : {
    type : String,
    required : true
  },
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  status : {
    type : String,
  required: true
  },
  createdOn : {
    type : String,
    required : true
  }
})


const taskModel = mongoose.model('Task', taskSchema)
export default taskModel
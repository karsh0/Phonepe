import mongoose, { model, Schema } from "mongoose"
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI || "")

const userSchema = new Schema({
    username: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}
})

const accountSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref:"User"},
    accountNumber: String,
    accountType: String,
})

const userModel = model('User', userSchema)
const accountModel = model('Account', accountSchema)

export { userModel, accountModel }
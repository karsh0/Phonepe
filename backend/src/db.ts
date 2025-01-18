import mongoose, { model, Schema } from "mongoose"
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI || "")

const userSchema = new Schema({
    username: {type:String},
    email: {type:String},
    password: {type:String}
})

const accountSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref:"User"},
    accountName: String,
    accountNumber: Number,
    accountType: String,
    balance: Number,
})

const userModel = model('User', userSchema)
const accountModel = model('Account', accountSchema)

export { userModel, accountModel }
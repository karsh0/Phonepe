import mongoose, { model, Schema } from "mongoose"
import { ScriptElementKindModifier } from "typescript"
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI || "")

const userSchema = new Schema({
    username: {type:String},
    password: {type:String}
})

const accountSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref:"User"},
    accountName: String,
    accountNumber: Number,
    accountType: String,
    balance: Number,
})

// rooms from websocket 

const roomSchema = new Schema({
    senderId: String,
    receiverId: String,
    roomId: String
})

const userModel = model('User', userSchema)
const accountModel = model('Account', accountSchema)
const roomModel = model('Room', roomSchema)

export { userModel, accountModel, roomModel}
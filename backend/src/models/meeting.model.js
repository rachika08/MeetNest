import mongoose from "mongoose";
import {Schema} from "mongoose";
const meetingSchema=new Schema({
    user_id:{
        type:String,
    },
    meetingCode:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
        default:Date.now(),
    }
})
const Meeting=mongoose.model("Meeting",meetingSchema);
export{Meeting};
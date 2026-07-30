import mongoose from "mongoose";
import { Schema } from "mongoose";


const transcriptSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        default:Date.now
    }
});


const meetingNotesSchema = new Schema({

    meetingCode:{
        type:String,
        required:true,
        unique:true
    },

    transcript:[
        transcriptSchema
    ],

    participants:[
        {
            type:String
        }
    ],

    aiNotes:{
        summary:{
            type:String,
            default:""
        },

        actionItems:[
            String
        ],

        keyPoints:[
            String
        ]
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});


const MeetingNotes = mongoose.model(
    "MeetingNotes",
    meetingNotesSchema
);


export {MeetingNotes};
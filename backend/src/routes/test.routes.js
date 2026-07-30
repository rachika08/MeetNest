import { Router } from "express";
import { MeetingNotes } from "../models/meetingNotes.js";
import { generateMeetingNotes } from "../services/gemini.js";
const router = Router();


router.post("/generate-notes/:meetingCode", async (req, res) => {

    try {

        const { meetingCode } = req.params;


        // get transcript from DB
        const meeting = await MeetingNotes.findOne({
            meetingCode
        });


        if (!meeting) {
            return res.status(404).json({
                message: "Meeting not found"
            });
        }


        // send transcript to Gemini
        const aiNotes = await generateMeetingNotes(
            meeting.transcript
        );


        // save AI response
        meeting.aiNotes = aiNotes;

        await meeting.save();



        res.json({
            message: "AI notes generated successfully",
            aiNotes
        });



    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});


export default router;
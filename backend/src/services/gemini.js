import { GoogleGenAI } from "@google/genai";


export const generateMeetingNotes = async (transcript) => {

    try {

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });


        const response = await ai.models.generateContent({

            model: "gemini-3-flash-preview",

            contents: `
            You are an AI meeting assistant.

            Analyze this meeting transcript.

            Generate:

            1. Summary
            2. Key points
            3. Action items

            Transcript:

            ${JSON.stringify(transcript)}

            Return only JSON:

            {
            "summary":"",
            "keyPoints":[],
            "actionItems":[]
            }

            `
        });


        return JSON.parse(response.text);


    } catch (error) {

        console.log("Gemini Error:", error);
        throw error;

    }

}
import {Server} from "socket.io";
import {MeetingNotes} from "../models/meetingNotes.js";
let connections={};
let messages={};
let timeOnline={};
let meetingTranscripts={};

export const connectToSocket=(server)=>{
    const io=new Server(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"],
            allowedHeaders:["*"],
            credentials:true
        }
    });
    io.on("connection",(socket)=>{
        console.log("something connected");
        socket.on("join-call",(path)=>{
            if(connections[path]===undefined){
                connections[path]=[];
            }
            connections[path].push(socket.id);
            timeOnline[socket.id]=new Date();
            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined",socket.id,connections[path]);
                
            }
            if(messages[path] !== undefined){
                for(let a = 0; a < messages[path].length; a++){
                    io.to(socket.id).emit("chat-message",messages[path][a]['data'],
                        messages[path][a]['sender'],messages[path][a]['socket-id-sender']
                    )
                }
            }
        })
        socket.on("signal",(toId,message)=>{
            io.to(toId).emit("signal",socket.id,message);
        })
        socket.on("chat-message",(data,sender)=>{
            const [matchingRoom,found]=Object.entries(connections).reduce(([room,isFound],[roomKey,roomValue])=>{
                if(!isFound && roomValue.includes(socket.id)){
                    return[roomKey,true];
                }
                return [room,isFound];
            },['',false]);
            if(found===true){
                if(messages[matchingRoom]===undefined){
                    messages[matchingRoom]=[];
                }
                messages[matchingRoom].push({'sender':sender,"data":data,"socket-id-sender":socket.id});
                console.log("message",matchingRoom,":",sender,data,socket.id);

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message",data,sender,socket.id);
                
                })
            }

        })
        socket.on("disconnect",()=>{
            var diffTime = Math.abs(timeOnline[socket.id]-new Date());
            var key;
            for(const [k,v] of JSON.parse(JSON.stringify(Object.entries(connections)))){
                for(let a=0;a<v.length;a++){
                    if(v[a]===socket.id){
                        key=k;
                        for(let a=0;a<connections[key].length;a++){
                            io.to(connections[key][a]).emit('user-left',socket.id);
                        }
                        var index=connections[key].indexOf(socket.id);
                        connections[key].splice(index,1);
                        if(connections[key].length===0){
                            delete connections[key];
                        }
                    }
                }
            }
        })
        
        socket.on("meeting-transcript", async(data)=>{
            console.log("EVENT RECEIVED FROM FRONTEND");
            console.log(data);
            const {
                meetingCode,
                username,
                text
            } = data;


            try{
                let meeting = await MeetingNotes.findOne({ meetingCode });

                if (!meeting) {
                    meeting = new MeetingNotes({
                        meetingCode,
                        participants: [username],
                        transcript: [
                            {
                                username,
                                text
                            }
                        ]
                    });
                } else {

                    if (!meeting.participants.includes(username)) {
                        meeting.participants.push(username);
                    }

                    const lastMessage =
                        meeting.transcript[meeting.transcript.length - 1];

                    if (
                        lastMessage &&
                        lastMessage.username === username
                    ) {
                        lastMessage.text += " " + text;
                    } else {
                        meeting.transcript.push({
                            username,
                            text
                        });
                    }
                }

                await meeting.save();

                

                


                console.log(
                    "Saved transcript:",
                    username,
                    text
                );


            }catch(error){

                console.log(
                    "Transcript save error:",
                    error
                );

            }

        });
    })
    return io;
}
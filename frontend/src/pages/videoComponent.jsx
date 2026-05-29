import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import {IconButton,TextField} from '@mui/material';
import Button from '@mui/material/Button';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import Badge from '@mui/material/Badge';
import ChatIcon from '@mui/icons-material/Chat';

import io from "socket.io-client";

import styles from "../styles/videoComponent.module.css";

import { color, height, width } from '@mui/system';
const server_url="http://localhost:8000";
var connections={};
const peerConfigConnections={
    "iceServers":[
        {
            "urls":"stun:stun.l.google.com:19302"
        }
    ]
}

export default function VideoComponent(){
    var socketRef=useRef();//👉 Stores your socket connection (like Socket.io) ✔ Used to send/receive signaling messages
    let socketIdRef=useRef();//👉 Stores your unique socket ID //Helps identify you among users
    let localVideoRef=useRef();//Reference to your own video element (camera stream) Used to attach webcam stream
    let [videoAvailable , setVideoAvailable]=useState(true);//Whether camera is available on device
    let [audioAvailable , setAudioAvailable]=useState(true);//Whether audio is available on device
    let [video , setVideo]=useState();//Is camera ON or OFF
    let [audio,setAudio]=useState();//Is audio ON or OFF
    let [screen , setScreen]= useState();//Is scren shar ON or OFF
    let [showModal,setShowModal]=useState(true);
    let [screenAvailable , setScreenAvailable]=useState();//Checks if screen sharing is supported in browser
    let [messages,setMessages]=useState([]);//Stores all chat messages
    let [message,setMessage]=useState("");//Current message being typed
    let [newMessages,setNewMessages]=useState(3);//Count of unread messages
    let [askForUsername,setAskForUsername]=useState(true);//Show username input modal or not
    let [username,setUsername]=useState("");//Stores user’s name
    const videoRef=useRef([]); //👉 Stores multiple video elements (other users)Used in group calls
    let [videos,setVideos]=useState([]);//Stores all active video streams (participants)


    const getPermission=async()=>{
        try {
            const videoPermission=await navigator.mediaDevices.getUserMedia({video:true});
            if(videoPermission){
                setVideoAvailable(true);
            }else{
                setVideoAvailable(false);
            }
            const audioPermission=await navigator.mediaDevices.getUserMedia({audio:true});
            if(audioPermission){
                setAudioAvailable(true);
            }else{
                setAudioAvailable(false);
            }
            if(navigator.mediaDevices.getDisplayMedia){
                setScreenAvailable(true);
            }else{
                setScreenAvailable(false);
            }

            if(videoAvailable || audioAvailable){
                const userMediaStream=await navigator.mediaDevices.getUserMedia({video:videoAvailable,audio:audioAvailable});
                if(userMediaStream){
                    window.localStream=userMediaStream;
                    if(localVideoRef.current){
                        localVideoRef.current.srcObject=userMediaStream; //localVideoRef is a <video> element This line shows your webcam video in UI
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(()=>{
        getPermission();

    },[]);
    let getUserMediaSuccess=(stream)=>{
        try {
            window.localStream.getTracks().forEach(track=>track.stop());
        } catch (e) {
            console.log(e);
        }
        window.localStream=stream;
        localVideoRef.current.srcObject=stream;
        for(let id in connections){
            if(id === socketIdRef.current) continue;
            connections[id].addStream(window.localStream)
            connections[id].createOffer().then((description)=>{
                connections[id].setLocalDescription(description)
                .then(()=>{
                    socketRef.current.emit("signal",id,JSON.stringify({"sdp":connections[id].localDescription}))
                })
                .catch(e=>console.log(e))
            })
        }
        stream.getTracks().forEach(track=>track.onended=()=>{
            setVideo(false);
            setAudio(false);
            try {
                let tracks=localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track=>track.stop())
            } catch (e) {
                console.log(e)
            }
            //blackSilence todo
            let blackSilence=(...args)=>new MediaStream([black(...args),silence()]);
            window.localStream=blackSilence();
            localVideoRef.current.srcObject=window.localStream;

            for(let id in connections){
                connections[id].addStream(window.localStream)
                connections[id].createOffer().then((description)=>{
                    connections[id].setLocalDescription(description)
                    .then(()=>{
                        socketRef.current.emit("signal",id,JSON.stringify({"sdp":connections[id].localDescription}))
                    }).catch(e=>console.log(e))
                })
            }
        })
    }
    let silence=()=>{
        let ctx=new AudioContext()
        let oscillator=ctx.createOscillator();

        let dst=oscillator.connect(ctx.createMediaStreamDestination());
        oscillator.start();
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0],{enabled:false})

    }

    let black=({width=640,height=480}={})=>{
        let canvas=Object.assign(document.createElement("canvas"),{width,height});
        canvas.getContext('2d').fillRect(0,0,width,height);
        let stream=canvas.captureStream();
        return Object.assign(stream.getVideoTracks()[0],{enabled:false});
    }

    let getUserMedia=()=>{
        if((video && videoAvailable) || (audio && audioAvailable)){
            navigator.mediaDevices.getUserMedia({video:video,audio:audio})
            .then(getUserMediaSuccess) //getusermediasuccee
            .then((stream)=>{ })
            .catch((error)=>console.log(error));
        }else{
            try {
                let tracks=localVideoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            } catch (error) {
                
            }
        }
    }

    useEffect(()=>{
        if(video !== undefined && audio !== undefined){
            getUserMedia();
        }
    },[audio,video]);
    
    let gotMessageFromServer=(fromId,message)=>{
        var signal=JSON.parse(message);
        if(fromId!== socketIdRef.current){ //this if means ki ye m nhi hu koi or user h
            if(signal.sdp){
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp))
                .then(()=>{
                    if(signal.sdp.type === "offer"){
                        connections[fromId].createAnswer().then((description)=>{
                            connections[fromId].setLocalDescription(description).then(()=>{
                                socketRef.current.emit("signal",fromId,JSON.stringify({"sdp":connections[fromId].localDescription}))
                            }).catch(e=>console.log(e))
                        }).catch(e=>console.log(e));
                    }
                }).catch(e=>console.log(e));
            }
            if(signal.ice){
                if(connections[fromId].remoteDescription){
                    connections[fromId]
                        .addIceCandidate(new RTCIceCandidate(signal.ice))
                        .catch(e=>console.log(e));

                }
                // connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e=>console.log(e))
            }

        }
    }
    let addMessage=(data,sender,socketIdSender)=>{
        setMessages((prevMessages)=>[
            ...prevMessages,{sender:sender,data:data}
        ]);

        if(socketIdSender !== socketIdRef.current){
            setNewMessages((prevMessages)=>prevMessages+1)
        }
    }
    let connectToSocketServer=()=>{
        socketRef.current=io.connect(server_url,{secure:false})
        socketRef.current.on('signal',gotMessageFromServer);
        socketRef.current.on("connect",()=>{
            socketRef.current.emit("join-call",window.location.href)
            socketIdRef.current=socketRef.current.id
            socketRef.current.on("chat-message",addMessage)
            socketRef.current.on("user-left",(id)=>{
                setVideos((videos)=>videos.filter((video)=>video.socketId !== id))
            })
            socketRef.current.on("user-joined",(id,clients)=>{
                clients.forEach((socketListedId)=>{
                    connections[socketListedId]=new RTCPeerConnection(peerConfigConnections)
                    connections[socketListedId].onicecandidate=(event)=>{
                        if(event.candidate != null){
                            socketRef.current.emit("signal",socketListedId,JSON.stringify({"ice":event.candidate}))
                        }
                    }
                    //talking about onaddstream
                    // 👉 This stream is:

                    //     Not yours
                    //     Coming from another peer
                    //     Used to render their video on your screen
                    connections[socketListedId].onaddstream=(event)=>{
                        let videoExists=videoRef.current.find(video=>video.socketId===socketListedId);
                        if(videoExists){
                            setVideos(videos=>{
                                const updatedVideos = videos.map(video=>
                                    video.socketId === socketListedId ? {...video,stream:event.stream}:video
                                );
                                videoRef.current=updatedVideos;
                                return updatedVideos;
                            })
                        }else{
                            let newVideo={
                                socketId:socketListedId,
                                stream:event.stream,
                                autoPlay:true,
                                playsinline:true
                            }
                            setVideos(videos=>{
                                const updatedVideos=[...videos,newVideo];
                                videoRef.current=updatedVideos;
                                return updatedVideos;
                            });
                        }
                    }
                    if(window.localStream !== undefined && window.localStream !== null){
                        connections[socketListedId].addStream(window.localStream);
                    }else{
                        //todo blcksilence
                        //let blackSilence
                        let blackSilence=(...args)=>new MediaStream([black(...args),silence()]);
                        window.localStream=blackSilence();
                        connections[socketListedId].addStream(window.localStream);
                    }
                })
                if(id === socketIdRef.current){
                    for (let id2 in connections){
                        if(id2 === socketIdRef.current) continue;
                        try {
                            connections[id2].addStream(window.localStream)
                        } catch (error) {}
                            
                        connections[id2].createOffer().then((description)=>{
                            connections[id2].setLocalDescription(description)
                            .then(()=>{
                                socketRef.current.emit("signal",id2,JSON.stringify({"sdp":connections[id2].localDescription}))
                            })
                            .catch(e=>console.log(e))
                        })
                        
                    }
                }
            })
        })
    
    
    
    
    }

    let getMedia=()=>{
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }

    let routeTo=useNavigate();

    let connect = () => {
        setAskForUsername(false);
        getMedia();
    }

    let handleVideo=()=>{
        setVideo(!video);
    }
    let handleAudio=()=>{
        setAudio(!audio);
    }

    let handleChat=()=>{
        setShowModal(!showModal);
    }

    let sendMessage=()=>{
        socketRef.current.emit("chat-message",message,username);
        setMessage("");
    }

    let getDsiplayMediaSuccess=(stream)=>{
        try {
            window.localStream.getTracks().forEach(track=>track.stop())
        } catch (error) {
            console.log(error);
        }
        window.localStream=stream;
        localVideoRef.current.srcObject=stream;

        for(let id in connections){
            if(id===socketIdRef.current) continue;

            connections[id].addStream(window.localStream)
            connections[id].createOffer().then((description)=[
                connections[id].setLocalDescription(description)
                .then(()=>{
                    socketRef.current.emit("signal",id,JSON.stringify({"sdp":connections[id].localDescription}))
                }).catch((e)=>console.log(e))
            ])
        }
        stream.getTracks().forEach(track=>track.onended=()=>{
            setScreen(false);
            try {
                let tracks=localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track=>track.stop())
            } catch (e) {
                console.log(e)
            }
            //blackSilence todo
            let blackSilence=(...args)=>new MediaStream([black(...args),silence()]);
            window.localStream=blackSilence();
            localVideoRef.current.srcObject=window.localStream;

            getUserMedia();
        })
    }

    let getDisplayMedia=()=>{
        if(screen) {
            if(navigator.mediaDevices.getDisplayMedia){
                navigator.mediaDevices.getDisplayMedia({video:true,audio:true})
                .then(getUserMediaSuccess)
                .then((stream)=>{})
                .catch((e)=>console.log(e))
            }
        }
    }

    useEffect(()=>{
        if(screen !== undefined){
            getDisplayMedia();
        }
    },[screen]);

    let handleScreen=()=>{
        setScreen(!screen)
    }
    let handleEndCall=()=>{
        try {
            let tracks=localVideoRef.current.srcObject.getTracks();
            tracks.forEach(track=> track.stop());
            

        } catch (error) {}
        routeTo("/home")
    }
    return (
        <div>
            {askForUsername === true ?
                <div>
                    <h2>Enter into lobby</h2>
                    <TextField 
                        id="outlined-basic" 
                        label="Username" 
                        value={username} 
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    <Button variant="contained" onClick={connect} >Connect</Button>
                <div>
                    <video ref={localVideoRef} autoPlay muted></video>
                </div>
                </div> :
                
                <div className={styles.meetVideoContainer}>
                    {showModal ?<div className={styles.chatRoom}>
                        <div className='chatContainer'>
                            <h1>Chat</h1>
                            <div className={styles.chattingDisplay}>
                            {messages.length > 0 ? messages.map((item,index)=>{
                                return(
                                    <div styel={{marginBottom:"20px"}}key={index}>
                                        <p style={{fontWeight:"bold"}}>{item.sender}</p>
                                        <p>{item.data}</p>
                                    </div>
                                )
                            }) :<p> No messages yet </p>}
                            </div>

                            <div className={styles.chattingArea}>
                                
                                <TextField value={message} onChange={(e)=> setMessage(e.target.value)} id="outlined-basic" label="Enter your chat" variant="outlined" />
                                <Button variant='contained'onClick={sendMessage}>send</Button>
                            </div>
                        </div>
                    </div>:<></>}
                    <div className={styles.buttonContainer}>
                        <IconButton onClick={handleVideo} style={{color:"white"}}>
                            {(video === true) ? <VideocamIcon/> :<VideocamOffIcon/>}

                        </IconButton>
                        <IconButton onClick={handleEndCall} style={{color:"red"}}>
                           <CallEndIcon/>
                        </IconButton>
                        <IconButton onClick={handleAudio} style={{color:"white"}}>
                            {(audio === true) ? <MicIcon/> :<MicOffIcon/>}

                        </IconButton>
                        {screenAvailable===true ?
                        <IconButton onClick={handleScreen} style={{color:"white"}}>
                            {screen===true ? <ScreenShareIcon/> : <StopScreenShareIcon/>}
                        </IconButton> : <></>}

                        <Badge badgeContent={newMessages} max={999} color='secondary'>
                            <IconButton onClick={handleChat} style={{color:"white"}}>
                                <ChatIcon/>
                            </IconButton>
                        </Badge>
                    </div>

                    <video className={styles.meetUserVideo} ref={localVideoRef} autoPlay muted></video>
                    <div  className={styles.conferenceView}>
                    {videos.map((video)=>(
                        <div key={video.socketId}>
                            {/* <h2>{video.socketId}</h2> */}
                            <video 
                                data-socket={video.socketId}
                                ref={ref=>{
                                    if(ref && video.stream){
                                        ref.srcObject=video.stream;
                                    }
                                }}
                                autoPlay
                            >
                                     
                            </video>
                        </div>
                    ))}
                    </div> 
                </div>
            }
        </div>
    )
}
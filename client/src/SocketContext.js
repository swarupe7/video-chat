
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

// const socket = io(');
const socket = io('https://video-chat-65z2.onrender.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    console.log(id);

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };


// import React, { createContext, useState, useRef, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';

// const SocketContext = createContext();

// const socket=io("http://localhost:5000");

//  const ContextProvider = ({ children }) => {
//     const [stream,setStream]=useState(null);

//     const [me,setMe]=useState('');
//     const connectionRef=useRef();
//     const myVideo=useRef();
//     const userVideo=useRef();
//     const [call,setCall]=useState({});
//     const [callAccepted,setCallAccepted]=useState(false);
//     const[callEnded,setCallEnded]=useState(false);
//     const [name,setName]=useState('');


//     useEffect(()=>{
//         navigator.mediaDevices.getUserMedia({video: true,audio: true})
//     }).then((currentStream) => {
//         setStream(currentStream);
//         myVideo.current.srcObject=currentStream;

//     });
//     socket.on('me',(id)=>setMe(id));
//     socket.on('callUser',({from,name:callerName,signal})=>
//     {
//         setCall({isReceivingCall:true,from,name:callerName,signal})
//     },[]);


//     const answerCall=()=>{
//         setCallAccepted(true);
//         const peer= new Peer({initiator:false,trickle:false,stream});
//         peer.on('signal',(data)=>{
//             socket.emit('answerCall',{to:call.from,signal:data})
//         })

//         peer.on('stream',(currentStream)=>{
//             userVideo.current.srcObject=currentStream;
//         })
//         peer.signal(call.signal);
//          connectionRef.current=peer;
//     }

//     const callUser=(id)=>{
//         setCallAccepted(true);
//         const peer= new Peer({initiator:true,trickle:false,stream});
//         peer.on('signal',(data)=>{
//             socket.emit('callUser',{userToCall:id,from:me,signalData:data,name})});

//             peer.on('stream',(currentStream)=>{
//                 userVideo.current.srcObject=currentStream;
//             })

//             socket.on('callAccepted',(signal)=>{
//                 setCallAccepted(true);
//                 peer.signal(signal);
               
//             })

//             connectionRef.current=peer;
//    }

//     const leaveCall=()=>{
//         setCallEnded(true);
//         connectionRef.current.destroy();
//         //connectionRef.current=null;
//         window.location.reload();
        
//     }

//   return (
//     <SocketContext.Provider value={{
//         call,callAccepted,myVideo,userVideo,stream,name,setName,callEnded,me,callUser,leaveCall,answerCall
//     }}>

//         {children}

//     </SocketContext.Provider>
//   );


   

// };

// export { ContextProvider, SocketContext };

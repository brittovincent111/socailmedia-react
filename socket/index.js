

const io = require('socket.io')(8800,{

    cors :{
        orgin : "http://localhost:3000"
    }
})

let activeUsers = []


io.on('connection',(socket)=>{

    // add new user 

    socket.on('new-user-add', (newUserId)=>{
        // if user is not added previously 

        if(!activeUsers.some((user)=> user.userId === newUserId))
        {
            activeUsers.push({
                userId: newUserId ,
                socketId : socket.id
            })
        }
        console.log(("Connected Users " , activeUsers));
        io.emit('get-user' , activeUsers)
    })

    // SEND MESSAGE 

    socket.on("send-message" , (data)=>{
        const {receiverId} = data
        const user = activeUsers.find((user)=> user.userId === receiverId)
        console.log("Sending from socket to " , receiverId)
        console.log(data)
        if(user){
            io.to(user.socketId).emit('receieve-message' , data)
        }
    })

     // SEND NOTIFICATION 
     socket.on("send-notification",(data)=>{
        console.log(data,'hii');
        const {recieverId,senderId,desc} = data
        const reciever = activeUsers.find((user)=>user.userId === recieverId)
        console.log(reciever,'noti reciever'); 
        io.to(reciever?.socketId).emit("getNotification",{ 
            senderId,
            desc,
        }) 
    })

    socket.on("disconnect" , ()=>{

        activeUsers = activeUsers.filter((user)=> user.socketId != socket.id)
        console.log("user disconnected");
        io.emit('get-user' , activeUsers)
    }) 
})


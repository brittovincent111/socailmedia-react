import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { newUserChat, userChats } from '../../API/chatRequest'
import Conversation from './Conversation'
import ChatBox from './ChatBox'
// import { io } from 'socket.io-client'
import { SocketContext } from '../../UpdationContext/Socket'

function Message() {

    // const socket = useRef()
    const socket = useContext(SocketContext)

    const userDetails = useSelector(state => state.user)
    const [chats, setChats] = useState([])
    const [currentChat, SetCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [reciveMessage, setReciveMessage] = useState(null)
    const [responsive, setResponsive] = useState(false)
    // const [currentChat, setCurrentChat] = useState(null)


    const { AnotherUserId } = useSelector(state => state.anotheruser)
    console.log(AnotherUserId, 'anananananaan');

    // SEND MESSAGE FROM SOCKET SERVER 

    useEffect(() => {
        if (sendMessage !== null) {
            socket.emit('send-message', sendMessage)
        }
    }, [sendMessage])


    /* -------------------------------- GET USER -------------------------------- */

    useEffect(() => {
        // socket.current = io('http://localhost:8800')
        // socket.emit("new-user-add", userDetails._id)
        socket.on('get-user', (users) => {
            setOnlineUsers(users)
            // console.log(onlineUsers(users))
        })
    }, [userDetails])


    /* ----------------------- RECIEVED MESAGE FROM SOCKET ---------------------- */

    useEffect(() => {
        socket.on("receieve-message", (data) => {
            setReciveMessage(data)
        })
    }, [])

    /* ------------------------------- DIRECT CHAT ------------------------------ */

    useEffect(() => {
        if (AnotherUserId) {
            const users = {
                senderId: userDetails._id,
                receivedId: AnotherUserId
            }
            console.log(users , 'userssssssssssssss');
           
               newUserChat(users).then((res) => {
                console.log(res , "ress")
                if (res.data) {
                    SetCurrentChat(res.data)
                    setResponsive(true)
                }
                console.log(res.data, 'ksksksksksksk');
            })
        }
    }, [])

    /* -------------------------------- GET CHAT -------------------------------- */
    useEffect(() => {
        const getChats = async () => {
            try {

                const { data } = await userChats(userDetails._id)
                setChats(data)

            } catch (error) {

                console.log(error)

            }
        }

        getChats()

    }, [userDetails])

    /* --------------------------- CHECK ONLINE USERS --------------------------- */

    const checkOnlineUsers = (chat) => {


        const chatMembers = chat.members.
            find((member) => member !== userDetails._id)

        const online = onlineUsers.
            find((user) => user.userId === chatMembers)

        return online ? true : false

    }


     console.log(userDetails._id , "eeeee")

    return (


        <div class="container mx-auto w-full ">
            <div class="min-w-full border rounded lg:grid lg:grid-cols-3">
                <div className={`${responsive ? 'hidden' : ""} md:block border-r border-gray-300 lg:col-span-1`}>
                    <div class="mx-3 my-3">
                        <div class="relative text-gray-600">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    viewBox="0 0 24 24" class="w-6 h-6 text-gray-300">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </span>
                            <input type="search" class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                                placeholder="Search" required />
                        </div>
                    </div>

                    <ul class="overflow-auto h-[32rem]">
                        <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                        <li>
                            {
                                chats.map((chat) => {

                                    return (

                                        <div onClick={() => {
                                            SetCurrentChat(chat)
                                            setResponsive(true)
                                        }}>

                                            <Conversation data={chat} currentUser={userDetails._id} online={checkOnlineUsers(chat)} />
                                        </div>


                                    )

                                })
                            }

                        </li>
                    </ul>
                </div>
                <div className={`${responsive ?  "" :"hidden"}    lg:col-span-2  `}>

                <ChatBox chat={currentChat} currentUser={userDetails._id} setSendMessage={setSendMessage} reciveMessage={reciveMessage} />
                </div>
            </div>
        </div>



    )
}

export default Message
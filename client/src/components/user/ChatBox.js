import React, { useEffect, useRef, useState } from 'react'
import { addMessage, getMessages } from '../../API/messageRequet'
import { getUser } from '../../API/User'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { io } from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'


function ChatBox({ chat, currentUser, setSendMessage, reciveMessage }) {

    const userDetails = useSelector(state => state.user)

    const [userData, SetUserData] = useState(null)
    const [messages, SetMessages] = useState([])
    const [newMessage, SetNewMessages] = useState("")

    const scroll = useRef()

/* ------------------------------- SET MESSAGE ------------------------------ */

    useEffect(() => {
        if (reciveMessage !== null && reciveMessage.chatId == chat._id)
            SetMessages([...messages, reciveMessage])

    }, [reciveMessage])


    /* ------------------------------ GET USER DATA ----------------------------- */

    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        const getUserData = async () => {

            try {
                const { data } = await getUser(userId)
                SetUserData(data)

            } catch (error) {

                console.log(error)

            }

        }
        if (chat !== null) getUserData()



    }, [chat, currentUser])

     

    /* ------------------------------ FETCH MESSAGE ----------------------------- */

    useEffect(() => {

        const fetchMessages = async () => {

            try {

                const { data } = await getMessages(chat._id)
                SetMessages(data)

            } catch (error) {


            }

        }
        if (chat !== null) fetchMessages()

    }, [chat])

    

    const handleEmojiChange = (newMessage) => {
        SetNewMessages(newMessage)


    }
  

    /* ------------------------------ SEND MESSAGE ------------------------------ */

    const handleSend = async (e) => {

        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id
        }

        try {
            const { data } = await addMessage(message)
            SetMessages([...messages, data])
            SetNewMessages("")

        } catch (error) {
            console.log(error)

        }

        const receiverId = chat.members.find((id) => id !== currentUser)
        setSendMessage({ ...message, receiverId })
    }

    /* ------------------------------- SET SCROLL ------------------------------- */
    
    useEffect(() => {

        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    return (

        <div className="hidden lg:col-span-2 lg:block">
            {chat ?
                <div className="w-full">
                    <div className="relative flex items-center p-3 border-b border-gray-300">
                        <img className="object-cover w-10 h-10 rounded-full"
                            src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
                        <span className="block ml-2 font-bold text-gray-600">{userData?.username}</span>
                        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                        </span>
                    </div>
                    <div className="relative w-full p-6 overflow-y-auto h-[28rem] no-scrollbar">
                        <ul className="space-y-2">
                            {
                                messages.map((message) => {

                                    return (
                                        <div ref={scroll}>
                                            {
                                                message.senderId != currentUser ?


                                                    <li class='flex justify-start' key={message._id}>
                                                        <div class='relative max-w-xl px-4 py-2 bg-cyan-100 rounded shadow'>
                                                            <span class='block'>{message.text}</span>
                                                            <span className="text-xs">{format(message.createdAt)}</span>
                                                        </div>
                                                    </li>
                                                    :
                                                    <li class="flex justify-end" key={message._id}>
                                                        <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-blue-200 rounded shadow">
                                                            <span class="block">{message.text}</span>
                                                            <span className="text-xs">{format(message.createdAt)}</span>
                                                        </div>
                                                    </li>

                                            }

                                        </div>



                                    )
                                })
                            }



                        </ul>
                    </div>

                    <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">



                        <InputEmoji
                            value={newMessage}
                            onChange={handleEmojiChange}
                        />

                        <button onClick={handleSend}>
                            <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                </div> :
                <div className='bg-grya-100 '>start conversation

                </div>}

        </div>

    )
}

export default ChatBox
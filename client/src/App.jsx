import { useEffect, useRef, useState } from "react"
import {io} from "socket.io-client"


function App(){
  const [userMessage,setUserMessage] = useState("")
  const [newestMessageArray,setNewestMessageArray] = useState([])

  const socket = useRef(null);
  useEffect(() =>{
    socket.current = io("http://127.0.0.1:5000")

    socket.current.on("newestMessageArray",newestMessage =>{
      console.log(newestMessage)
      setNewestMessageArray(prevArray =>[...prevArray,newestMessage])
    })
  },[])

  function sendMessage(event){
    event.preventDefault();
    socket.current.emit("newMessage",userMessage)
  }

  // Create a ref for the message container
  const messagesEndRef = useRef(null);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    const messageContainer = document.querySelector('.message-container'); // Add this class to your container
    if (messageContainer) {
        messageContainer.scrollTo({
            top:messageContainer.scrollHeight,
            behavior:"smooth"
        }) 
       }}

       useEffect(() => {
        scrollToBottom();
        }, [newestMessageArray]);

  return(
    <>
      <div className=" h-screen flex justify-center items-center">
        <form className="border-2 w-128 h-152 relative" onSubmit={sendMessage}>
            <div className="place-items-center gap-0 scrollable w-128 h-134 overflow-y-auto overflow-x-hidden message-container">
              {newestMessageArray.map((item,key) =>(
                <li key={key} className="grid grid-cols-1 border-2 rounded-lg right-0 justify-end max-w-[475px] h-auto justify-self-end p-3 mr-3 mt-2 mb-2 break-all">
                  {item}
                  <div ref={messagesEndRef}></div>
                </li>
              ))}
            </div>
            <div className="w-full absolute border-2 bottom-16"></div>
            <input 
              className="absolute bottom-2 w-[85%] left-2 h-12 rounded-2xl border-2 p-2"
              value={userMessage} onChange={(e) =>setUserMessage(e.target.value)}/>
            <button type="submit" className="border-2 absolute bottom-2 right-3  size-12 rounded-full hover:cursor-pointer"></button>
        </form>
      </div>
    </>
  )
}

export default App
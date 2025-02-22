import { useRef } from "react"
import {io} from "socket.io-client"


function App(){

  const socket = useRef(null);

  //socket.current = io("http://127.0.0.1:5000")

  socket.current.on("connected",(message) =>{
    console.log(message)
  })

  return(
    <>
      <div className=" h-screen flex justify-center items-center">
        <form className="border-2 w-128 h-152 relative">
            <div className="w-full absolute border-2 bottom-16"></div>
            <input className="absolute bottom-2 w-[85%] left-2 h-12 rounded-2xl border-2 p-2"/>
            <button className="border-2 absolute bottom-2  right-3  size-12 rounded-full"></button>
        </form>
      </div>
    </>
  )
}

export default App
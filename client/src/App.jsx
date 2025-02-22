import { useRef } from "react"
import {io} from "socket.io-client"


function App(){

  const socket = useRef(null);

  socket.current = io("http://127.0.0.1:5000")

  socket.current.on("connected",(message) =>{
    console.log(message)
  })

  return(
    <>
      <div className="border-2">
        
      </div>
    </>
  )
}

export default App
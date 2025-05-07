import { Divide, Loader2, LoaderCircle, RocketIcon } from 'lucide-react';
import React from 'react'

type props = {
    info : any;
}
const GameInfoOverlay = ({info} : props) => {
    const {isLoading , distance, isColliding , LivesRemainingState, isGameOver,  isDetected} = info
    const lives = [];
    for(let i = 0; i < LivesRemainingState; i++){
        lives.push(<RocketIcon size={20} key={i} className='fill-blue-600'/>)
    }
  return (
    <div className={`absolute w-30 h-screen z-30 w-screen flex items-center justify-center  ${isColliding && 'border-[20px] border-red-600'}` }>
      {isLoading && <LoaderCircle size= {80} className='animate-spin'/>}
      {!isLoading && !isDetected && !isGameOver && (
        
          <div className='flex text-white flex-col items-center mt-20 gap-2 animate-[pulse_1s_ease-in-out_infinite]'>
          <div className='text-2xl font-extrabold'>P A U S E D</div>
          <div className='text-sm font-light'>Show both of your hands to the camera to continue</div>
          <div className=' animate-ping mt-12 w-20 h-20  accent-red-800 '><img src="./car.png" alt=""  className="invert brightness-0" /></div>
        </div>
               
        
      )}      
      {isGameOver &&  <div className='text-2xl text-white animate-ping font-extrabold'> GAME OVER </div> }
      <div className=' text-white fixed top-6 right-7'>{`Distance: ${distance} `}</div>
      <div className=' text-white fixed top-12 right-7  flex flex-row mt-4 gap-2'>{lives}</div>
     

    </div>

  )
}

export default GameInfoOverlay

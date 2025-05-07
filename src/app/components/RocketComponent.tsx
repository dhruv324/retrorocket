import { RocketIcon } from 'lucide-react'
import React from 'react'

type Props = {
  degrees: number 
}
const RocketComponent = ({degrees} : Props) => {
  return (
    <div className='rocket-shadow'>
      <RocketIcon size={32} className= 'fill-red-600 text-gray-400' style={{
        transform: `rotate(${-45 - degrees/3}deg)`,
        transition : 'all',
        animationDuration: '10ms',
        border: 'white',
        
      }}/>
    </div>
  )
}

export default RocketComponent

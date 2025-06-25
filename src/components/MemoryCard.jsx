import React from 'react'
import { decode, decodeEntity } from 'html-entities';

const MemoryCard = ({ handleClick, data }) => {


  const emojiEl = data.map((emoji, index) => {
    return (<li key={index} className='card-item'>
      <button
        className='btn btn--emoji'
        onClick={()=>handleClick(emoji.name, index)} >

        {decode(emoji.htmlCode[0])}

      </button>
    </li>)
  })

  return (
    <ul className='card-container'>{emojiEl}</ul>
  )
}

export default MemoryCard
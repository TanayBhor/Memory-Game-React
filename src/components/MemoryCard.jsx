import React from 'react'
import { decode, decodeEntity } from 'html-entities';
import EmojiButton from './EmojiButton';

const MemoryCard = ({ handleClick, data, selectedCards, matchedCards }) => {

  const cardEl = data.map((emoji, index) => {

    const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)
    const matchedCardEntry = matchedCards.find(emoji => emoji.index === index)

    const cardStyle =
      matchedCardEntry ? "card-item--matched" :
        selectedCardEntry ? "card-item--selected" :
          ""


    return (<li key={index} className={`card-item ${cardStyle}`}>

      <EmojiButton
        content={decode(emoji.htmlCode[0])}
        style={'btn btn--emoji'}
        handleClick={() => handleClick(emoji.name, index)}
        selectedCardEntry={selectedCardEntry}
        matchedCardEntry={matchedCardEntry}
      />
    </li>)
  })

  return (
    <ul className='card-container'>{cardEl}</ul>
  )
}

export default MemoryCard
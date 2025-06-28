import React from 'react'

const EmojiButton = ({ content, style, handleClick, selectedCardEntry, matchedCardEntry }) => {

    const btnContent = selectedCardEntry || matchedCardEntry ? content : "?"

    const btnStyle =
        matchedCardEntry ? "btn--emoji__back--matched" :
            selectedCardEntry ? "btn--emoji__back--selected" :
                "btn--emoji__front"

                console.log(selectedCardEntry, 'selected');
    return (
        <button
            className={`btn btn--emoji ${btnStyle}`}
            onClick={handleClick}
        >
            {btnContent}
        </button>
    )
}

export default EmojiButton
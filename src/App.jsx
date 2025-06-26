import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  console.log(isGameOver);

  useEffect(() => {
    if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
      setMatchedCards(prev => [...prev, ...selectedCards])
    }
  }, [selectedCards])

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setIsGameOver(true)
    }
  }, [matchedCards])

  console.log(matchedCards, 'matched cards');

  async function startGame(e) {
    e.preventDefault()
    try {
      const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")

      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json();
      const dataSlice = getDataSlice(data)
      const emojisArray = getEmojisArray(dataSlice)


      setEmojisData(emojisArray)
      setIsGameOn(true)
    } catch (error) {
      console.log(error);
    }
  }

  function getDataSlice(data) {
    const dataSlice = []
    const randomIndices = getRandomIndices(data)

    randomIndices.map((i) => {
      dataSlice.push(data[i])
    })

    return dataSlice;
  }

  function getRandomIndices(data) {
    let randomIndicesArray = [];

    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * data.length)
      if (!randomIndicesArray.includes(randomNumber)) {
        randomIndicesArray.push(randomNumber)
      } else {
        i--
      }
    }
    return randomIndicesArray;
  }

  function getEmojisArray(data) {

    // const pairedEmojisArray = [...data, ...data].sort(()=>Math.random()-0.5)

    const pairedEmojisArray = [...data, ...data]


    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = pairedEmojisArray[i]
      pairedEmojisArray[i] = pairedEmojisArray[j]
      pairedEmojisArray[j] = temp
    }
    return pairedEmojisArray;
  }

  function turnCard(name, index) {

    if (matchedCards.find(card => card.index === index)) return;

    const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)

    if (!selectedCardEntry && selectedCards.length < 2) {
      setSelectedCards(prev => [...prev, { name, index }])
    } else if (!selectedCardEntry && selectedCards.length === 2) {
      setSelectedCards([{ name, index }])
    }
  }

  return (
    <>
      <main className='App'>
        <h1>Memory</h1>
        {!isGameOn && <Form handleSubmit={startGame} />}
        {isGameOn && <MemoryCard
          handleClick={turnCard}
          data={emojisData}
          selectedCards={selectedCards}
          matchedCards={matchedCards} />}
      </main>
    </>
  )
}

export default App

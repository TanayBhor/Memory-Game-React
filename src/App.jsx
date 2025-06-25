import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

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
    setSelectedCards([{name, index}])
  }
console.log(selectedCards);
  return (
    <>
      <main className='App'>
        <h1>Memory</h1>
        {!isGameOn && <Form handleSubmit={startGame} />}
        {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
      </main>
    </>
  )
}

export default App

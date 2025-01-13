import { Cell } from "../Cell/Cell"
import { getFiveLetterWord } from "../../utils/words"

import styles from "./MainPage.module.css"
import { Keyboard } from "../Keyboard/Keyboard"
import { useState } from "react"

type CellState = {
  value: string
  status: string
}

const createGrid = (n_rows: number, word_size: number) => {
  const grid: CellState[][] = []
  for (let i = 0; i < n_rows; i++) {
    grid[i] = []
    for (let j = 0; j < word_size; j++) {
      grid[i].push({ value: "", status: "" })
    }
  }
  return grid
}

export const MainPage = () => {
  const [solution, setSolution] = useState(getFiveLetterWord())
  const [wrongChar, setWrongChar] = useState<string[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [win, setWin] = useState(false)

  const n_rows = 6
  const word_size = 5

  const [tries, setTries] = useState<CellState[][]>(
    createGrid(n_rows, word_size)
  )
  const [activeRow, setActiveRow] = useState(0)
  const [activeColumn, setActiveColumn] = useState(0)

  const newGame = () => {
    setSolution(getFiveLetterWord())
    setTries(createGrid(n_rows, word_size))
    setActiveColumn(0)
    setActiveRow(0)
    setWrongChar([])
    setWin(false)
    setGameOver(false)
  }

  const addLetter = (value: string) => {
    if (activeRow >= n_rows || win) {
      return
    }

    if (activeColumn >= word_size) {
      return
    }
    setTries((prevMatrix) => {
      const updatedMatrix = [...prevMatrix]
      const updatedRow = [...updatedMatrix[activeRow]]
      updatedRow[activeColumn].value = value
      updatedMatrix[activeRow] = updatedRow
      return updatedMatrix
    })
    if (activeColumn < word_size) {
      setActiveColumn(activeColumn + 1)
    }
  }

  const removeLetter = () => {
    setTries((prevMatrix) => {
      const updatedMatrix = [...prevMatrix]
      const updatedRow = [...updatedMatrix[activeRow]]
      updatedRow[activeColumn - 1].value = ""
      updatedMatrix[activeRow] = updatedRow
      return updatedMatrix
    })
    setActiveColumn(activeColumn - 1)

    if (activeColumn <= 0) {
      setActiveColumn(0)
    }
  }

  const handleKeyboardButton = (value: string) => {
    if (value == "delete" || value == "del") {
      if (activeColumn != 0) {
        removeLetter()
      }
    } else if (value == "guess" || value == "check") {
      if (gameOver || win) {
        return
      }
      console.log("CHECKING")
      let word = ""

      const _tries = [...tries]

      _tries[activeRow].map((val) => {
        word = word + val.value
      })
      if (word.length >= word_size) {
        for (let i = 0; i < word_size; i++) {
          if (
            _tries[activeRow][i].value.toUpperCase() ==
            solution[i].toUpperCase()
          ) {
            _tries[activeRow][i].status = "correct"
          } else if (
            solution
              .toUpperCase()
              .includes(_tries[activeRow][i].value.toUpperCase())
          ) {
            _tries[activeRow][i].status = "included"
          } else {
            _tries[activeRow][i].status = "incorrect"
            setWrongChar((prev) =>
              !prev.includes(_tries[activeRow][i].value)
                ? [...prev, _tries[activeRow][i].value]
                : [...prev]
            )
          }
        }

        setTries(_tries)

        setActiveRow(activeRow + 1)
        setActiveColumn(0)

        if (word.toLocaleLowerCase() === solution.toLocaleLowerCase()) {
          setWin(true)
        } else if (activeRow >= n_rows - 1) {
          setGameOver(true)
        }
      }
    } else {
      addLetter(value)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Adivina la palabra</div>
      <div className={styles.words_grid}>
        {tries.map((item, i) => (
          <div key={i} className={styles.words_row}>
            {item.map((letter, j) => (
              <Cell key={j} letter={letter.value} status={letter.status} />
            ))}
          </div>
        ))}
      </div>
      {win ? <div>VICTORIA</div> : null}
      {!win && gameOver ? <div>DERROTA</div> : null}
      {win || gameOver ? <button onClick={newGame}>New Game</button> : null}
      <Keyboard
        handleKeyboardButton={handleKeyboardButton}
        wrongChar={wrongChar}
      />
    </div>
  )
}

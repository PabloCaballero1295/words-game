import { Cell } from "../Cell/Cell"

import styles from "./MainPage.module.css"
import { Keyboard } from "../Keyboard/Keyboard"
import { useState } from "react"

//const base_grid = ["     ", "     ", "     ", "     ", "     ", "     "]

const createGrid = (n_rows: number, word_size: number) => {
  const grid: string[][] = []
  for (let i = 0; i < n_rows; i++) {
    grid[i] = []
    for (let j = 0; j < word_size; j++) {
      grid[i].push("")
    }
  }
  return grid
}

export const MainPage = () => {
  const n_rows = 6
  const word_size = 5

  const [tries, setTries] = useState(createGrid(n_rows, word_size))
  const [activeRow, setActiveRow] = useState(0)
  const [activeColumn, setActiveColumn] = useState(0)

  const addLetter = (value: string) => {
    if (activeColumn >= word_size) {
      return
    }
    setTries((prevMatrix) => {
      const updatedMatrix = [...prevMatrix]
      const updatedRow = [...updatedMatrix[activeRow]]
      updatedRow[activeColumn] = value
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
      updatedRow[activeColumn - 1] = ""
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
      removeLetter()
    } else if (value == "guess" || value == "check") {
      console.log("CHECKING")
      let word = ""
      tries[activeRow].map((val) => {
        word = word + val
      })
      if (word.length >= word_size) {
        setActiveRow(activeRow + 1)
        setActiveColumn(0)
      } else {
        console.log("SHORT WORD")
      }
    } else {
      addLetter(value)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Words game</div>
      <div className={styles.words_grid}>
        {tries.map((item, i) => (
          <div key={i} className={styles.words_row}>
            {item.map((letter, j) => (
              <Cell key={j} letter={letter} />
            ))}
          </div>
        ))}
      </div>

      <Keyboard handleKeyboardButton={handleKeyboardButton} />
    </div>
  )
}

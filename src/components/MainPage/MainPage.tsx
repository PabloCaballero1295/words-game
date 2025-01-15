import { Cell } from "../Cell/Cell"
import {
  getFiveLetterWord,
  checkWordExists,
  countCharacter,
  CharCount,
} from "../../utils/words"

import styles from "./MainPage.module.css"
import { Keyboard } from "../Keyboard/Keyboard"
import { useState } from "react"
import { GameMessage } from "../GameMessage/GameMessage"
import { WordError } from "../WordError/WordError"

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
  const [correctChar, setCorrectChar] = useState<string[]>([])
  const [possibleChar, setPossibleChar] = useState<string[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [win, setWin] = useState(false)
  const [error, setError] = useState(false)

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
    setCorrectChar([])
    setPossibleChar([])
    setWin(false)
    setGameOver(false)
  }

  const updateCharacterCounter = (word: CharCount[], char: string) => {
    const aux = word
    const index = aux.findIndex((x) => x.letter == char)
    if (index != -1 && aux[index].count > 0) {
      aux[index].count = aux[index].count - 1
    }
    return aux
  }

  const getCharCount = (word: CharCount[], char: string) => {
    const index = word.findIndex((x) => x.letter == char)
    if (index != -1) {
      return word[index].count
    } else {
      return 0
    }
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
        setError(false)
      }
    } else if (value == "guess" || value == "check") {
      if (gameOver || win) {
        return
      }

      let word = ""

      const _tries = [...tries]

      _tries[activeRow].map((val) => {
        word = word + val.value
      })
      if (word.length >= word_size) {
        //If word dont exist on the list, display an error message
        if (!checkWordExists(word)) {
          setError(true)
          return
        }

        // In this variable is the data of the counter of each character
        let wordCounter = countCharacter(solution)

        /* Loop to check correct characters*/

        for (let i = 0; i < word_size; i++) {
          if (_tries[activeRow][i].value == solution[i]) {
            _tries[activeRow][i].status = "correct"
            setCorrectChar((prev) =>
              !prev.includes(_tries[activeRow][i].value)
                ? [...prev, _tries[activeRow][i].value]
                : [...prev]
            )
            wordCounter = updateCharacterCounter(
              wordCounter,
              _tries[activeRow][i].value
            )
          }
        }

        /* Loop to search included characters that are not in the correct position */
        for (let i = 0; i < word_size; i++) {
          if (solution.includes(_tries[activeRow][i].value)) {
            //Check the number of times the letter is in the word

            if (
              _tries[activeRow][i].status != "correct" &&
              getCharCount(wordCounter, _tries[activeRow][i].value) > 0
            ) {
              _tries[activeRow][i].status = "included"

              setPossibleChar((prev) =>
                !prev.includes(_tries[activeRow][i].value)
                  ? [...prev, _tries[activeRow][i].value]
                  : [...prev]
              )
              updateCharacterCounter(wordCounter, _tries[activeRow][i].value)
            } else if (_tries[activeRow][i].value != solution[i]) {
              _tries[activeRow][i].status = "incorrect"
            }
          }
        }

        /* Loop to search wrong characters */

        for (let i = 0; i < word_size; i++) {
          if (!solution.includes(_tries[activeRow][i].value)) {
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

        if (word === solution) {
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
              <Cell
                key={j}
                active={j == activeColumn && activeRow == i ? true : false}
                letter={letter.value}
                status={letter.status}
              />
            ))}
          </div>
        ))}
      </div>
      {error && <WordError />}
      {(win || gameOver) && <GameMessage victory={win} solution={solution} />}
      {(win || gameOver) && (
        <div className={styles.game_options}>
          <button className={styles.new_game_button} onClick={newGame}>
            Nuevo juego
          </button>
        </div>
      )}
      {solution}
      <div className={styles.keyboard_wrapper}>
        <Keyboard
          handleKeyboardButton={handleKeyboardButton}
          correctChar={correctChar}
          wrongChar={wrongChar}
          possibleChar={possibleChar}
        />
      </div>
    </div>
  )
}

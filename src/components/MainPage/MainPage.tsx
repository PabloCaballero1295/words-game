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

import { NotificationBox } from "../NotificationBox/NotificationBox"
import { Modal } from "../Modal/Modal"

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
  // State of the word solution
  const [solution, setSolution] = useState(getFiveLetterWord())
  // States Arrays to store characters that are wrong, are correct or are included in the word
  const [wrongChar, setWrongChar] = useState<string[]>([])
  const [correctChar, setCorrectChar] = useState<string[]>([])
  const [possibleChar, setPossibleChar] = useState<string[]>([])
  //States to control game state
  const [gameOver, setGameOver] = useState(false)
  const [win, setWin] = useState(false)
  // State to control the word length
  const [shortWord, setShortWord] = useState(true)
  // Used to store if the word is correct
  const [error, setError] = useState(false)
  //Variable to check if the shake animation should start playing
  const [shaking, setShaking] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const n_rows = 6
  const word_size = 5

  const [tries, setTries] = useState<CellState[][]>(
    createGrid(n_rows, word_size)
  )
  const [activeRow, setActiveRow] = useState(0)
  const [activeColumn, setActiveColumn] = useState(0)

  // Function to set to default values the game
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
    setShortWord(true)
    setShaking(false)
  }

  //Function to set the modal text when the game is finished
  const gameFinishMessage = () => {
    if (win) {
      return `Has resuelto la palabra oculta "${solution.toLocaleUpperCase()}" con ${
        activeRow + 1
      } intento${activeRow > 0 ? "s" : ""}`
    } else {
      return `No has podido resolver la palabra oculta "${solution.toLocaleUpperCase()}"`
    }
  }

  // Function to update the chracter counter
  const updateCharacterCounter = (word: CharCount[], char: string) => {
    const aux = word
    const index = aux.findIndex((x) => x.letter == char)
    if (index != -1 && aux[index].count > 0) {
      aux[index].count = aux[index].count - 1
    }
    return aux
  }

  // Function to check how many times an specefic character can be used in the word
  const getCharCount = (word: CharCount[], char: string) => {
    const index = word.findIndex((x) => x.letter == char)
    if (index != -1) {
      return word[index].count
    } else {
      return 0
    }
  }

  // Removes the last character of the word
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

  // Function to handle backspace button
  const handleBackspace = () => {
    if (activeColumn != 0) {
      removeLetter()
      setError(false)
    }
  }

  // Function to Check the word
  const handleCheckWordButton = () => {
    if (gameOver || win) {
      return
    }

    let word = ""

    const _tries = [...tries]

    _tries[activeRow].map((val) => {
      word = word + val.value
    })
    if (word.length == word_size && !error) {
      setShortWord(false)
      //If word dont exist on the list, display an error message
      if (!checkWordExists(word)) {
        setError(true)
        setShaking(true)
        setTimeout(() => {
          setShaking(false)
        }, 500)
        setTimeout(() => {
          setError(false)
        }, 2000)
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

      if (word === solution) {
        setWin(true)
        setTimeout(() => {
          setOpenModal(true)
        }, 2000)
      } else if (activeRow >= n_rows - 1) {
        setGameOver(true)
        setTimeout(() => {
          setOpenModal(true)
        }, 750)
      } else {
        setActiveRow(activeRow + 1)
        setActiveColumn(0)
      }
    } else if (word.length < word_size) {
      setShortWord(true)
      setError(true)
      setShaking(true)
      setTimeout(() => {
        setShaking(false)
      }, 500)
      setTimeout(() => {
        setError(false)
      }, 2000)
    }
  }

  // Function to handle letters pressed on keyboard
  const handleKeyboardButton = (value: string) => {
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Adivina la palabra</div>
      <div className={styles.words_grid}>
        {tries.map((item, i) => (
          <div
            key={i}
            className={`${styles.words_row} ${
              activeRow == i && shaking ? styles.shake : ""
            }`}
          >
            {item.map((letter, j) => (
              <Cell
                key={j}
                wordCorrect={win && activeRow == i ? true : false}
                active={j == activeColumn && activeRow == i ? true : false}
                letter={letter.value}
                status={letter.status}
                position={j}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.keyboard_wrapper}>
        <Keyboard
          handleCheckWordButton={handleCheckWordButton}
          handleKeyboardButton={handleKeyboardButton}
          handleBackspace={handleBackspace}
          correctChar={correctChar}
          wrongChar={wrongChar}
          possibleChar={possibleChar}
        />
      </div>

      <NotificationBox
        visible={error}
        text={`${
          shortWord
            ? "La palabra debe tener 5 caracteres"
            : "Esta palabra no está en la lista de posibles palabras"
        }`}
      />

      {openModal && (
        <Modal
          acceptButtonAction={newGame}
          closeModal={handleCloseModal}
          header={win ? "VICTORIA" : "DERROTA"}
          content={gameFinishMessage()}
          acceptButtonText="Jugar de nuevo"
          modalBackgroundColor={win ? "green" : "red"}
        />
      )}
    </div>
  )
}

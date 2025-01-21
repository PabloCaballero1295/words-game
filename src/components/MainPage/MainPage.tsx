import { Cell } from "../Cell/Cell"
import {
  getFiveLetterWord,
  checkWordExists,
  countCharacter,
  CharCount,
  createGrid,
} from "../../utils/words"

import styles from "./MainPage.module.css"
import { Keyboard } from "../Keyboard/Keyboard"
import { useEffect, useState } from "react"

import { NotificationBox } from "../NotificationBox/NotificationBox"
import { Modal } from "../Modal/Modal"
import useLocalStorageState from "../../hooks/hooks"
import { GameStatsHistory } from "../types/types"

const n_rows = 6
const word_size = 5

export const MainPage = () => {
  const [stats, setStats] = useLocalStorageState<GameStatsHistory>("stats", {
    games: 0,
    wins: 0,
    loses: 0,
    streak: 0,
    bestStreak: 0,
    triesStats: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, x: 0 },
  })

  // State of the word solution
  const [solution, setSolution] = useLocalStorageState(
    "solution",
    getFiveLetterWord()
  )
  // States Arrays to store characters that are wrong, are correct or are included in the word
  const [wrongChar, setWrongChar] = useLocalStorageState<string[]>(
    "wrongChar",
    []
  )
  const [correctChar, setCorrectChar] = useLocalStorageState<string[]>(
    "correctChar",
    []
  )
  const [possibleChar, setPossibleChar] = useLocalStorageState<string[]>(
    "possibleChar",
    []
  )
  //States to control game state
  const [gameOver, setGameOver] = useLocalStorageState("gameOver", false)
  const [win, setWin] = useLocalStorageState("win", false)
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

  const [grid, setGrid] = useLocalStorageState(
    "grid",
    createGrid(n_rows, word_size)
  )
  const [activeRow, setActiveRow] = useLocalStorageState("activeRow", 0)
  const [activeColumn, setActiveColumn] = useLocalStorageState(
    "activeColumn",
    0
  )

  useEffect(() => {
    if (win) {
      setTimeout(() => {
        setOpenModal(true)
      }, 2000)
    } else if (gameOver) {
      setTimeout(() => {
        setOpenModal(true)
      }, 750)
    }
  }, [win, gameOver])

  // Function to set to default values the game
  const newGame = () => {
    setSolution(getFiveLetterWord())
    setGrid(createGrid(n_rows, word_size))
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
    const updatedMatrix = [...grid]
    const updatedRow = [...updatedMatrix[activeRow]]

    if (activeColumn < 5 && updatedRow[activeColumn].value != "") {
      updatedRow[activeColumn].value = ""
    } else if (activeColumn > 0) {
      updatedRow[activeColumn - 1].value = ""
    } else {
      return
    }
    updatedMatrix[activeRow] = updatedRow

    setGrid(updatedMatrix)
    setActiveColumn((prevColumn) => Math.max(0, prevColumn - 1))
  }

  // Function to handle backspace button
  const handleBackspace = () => {
    if (gameOver || win) {
      return
    }
    removeLetter()
    setError(false)
  }

  // Function to Check the word
  const handleCheckWordButton = () => {
    if (gameOver || win) {
      return
    }

    let word = ""

    const _grid = [...grid]

    _grid[activeRow].map((val) => {
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
        if (_grid[activeRow][i].value == solution[i]) {
          _grid[activeRow][i].status = "correct"
          setCorrectChar((prev) =>
            !prev.includes(_grid[activeRow][i].value)
              ? [...prev, _grid[activeRow][i].value]
              : [...prev]
          )
          wordCounter = updateCharacterCounter(
            wordCounter,
            _grid[activeRow][i].value
          )
        }
      }

      /* Loop to search included characters that are not in the correct position */
      for (let i = 0; i < word_size; i++) {
        if (solution.includes(_grid[activeRow][i].value)) {
          //Check the number of times the letter is in the word

          if (
            _grid[activeRow][i].status != "correct" &&
            getCharCount(wordCounter, _grid[activeRow][i].value) > 0
          ) {
            _grid[activeRow][i].status = "included"

            setPossibleChar((prev) =>
              !prev.includes(_grid[activeRow][i].value)
                ? [...prev, _grid[activeRow][i].value]
                : [...prev]
            )
            updateCharacterCounter(wordCounter, _grid[activeRow][i].value)
          } else if (_grid[activeRow][i].value != solution[i]) {
            _grid[activeRow][i].status = "incorrect"
          }
        }
      }

      /* Loop to search wrong characters */

      for (let i = 0; i < word_size; i++) {
        if (!solution.includes(_grid[activeRow][i].value)) {
          _grid[activeRow][i].status = "incorrect"
          setWrongChar((prev) =>
            !prev.includes(_grid[activeRow][i].value)
              ? [...prev, _grid[activeRow][i].value]
              : [...prev]
          )
        }
      }

      setGrid(_grid)

      if (word === solution) {
        setWin(true)
        setStats((prev) => {
          return {
            ...prev,
            games: prev.games + 1,
            wins: prev.wins + 1,
            loses: prev.loses,
            streak: prev.streak + 1,
            bestStreak:
              prev.streak + 1 > prev.bestStreak
                ? prev.streak + 1
                : prev.bestStreak,
            triesStats: {
              ...prev.triesStats,
              [(activeRow + 1).toString()]:
                prev.triesStats[(activeRow + 1).toString()] + 1,
            },
          }
        })
      } else if (activeRow >= n_rows - 1) {
        setGameOver(true)
        setStats((prev) => {
          return {
            ...prev,
            games: prev.games + 1,
            wins: prev.wins,
            loses: prev.loses + 1,
            streak: 0,
            bestStreak: prev.bestStreak,
            triesStats: {
              ...prev.triesStats,
              ["x"]: prev.triesStats["x"] + 1,
            },
          }
        })
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
    if (gameOver || win) {
      return
    }

    if (activeRow >= n_rows || win) {
      return
    }

    if (activeColumn >= word_size) {
      return
    }
    setGrid((prevMatrix) => {
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

  const handleCellPress = (index: number) => {
    setActiveColumn(index)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Adivina la palabra</div>
      <div className={styles.words_grid}>
        {grid.map((item, i) => (
          <div
            key={i}
            className={`${styles.words_row} ${
              activeRow == i && shaking ? styles.shake : ""
            }`}
          >
            {item.map((letter, j) => (
              <Cell
                handleCellPress={handleCellPress}
                key={j}
                wordCorrect={win && activeRow == i ? true : false}
                active={j == activeColumn && activeRow == i ? true : false}
                clickable={activeRow == i ? true : false}
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
          stats={stats}
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

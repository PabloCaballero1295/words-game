import { BackspaceButton } from "../BackspaceButton/BackspaceButton"
import { CheckWordButton } from "../CheckWordButton/CheckWordButton"
import { KeyboardButton } from "../KeyboardButton/KeyboardButton"
import styles from "./Keyboard.module.css"

const keyboardRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
  ["check", "z", "x", "c", "v", "b", "n", "m", "del"],
]

interface KeyboardProps {
  wrongChar: string[]
  correctChar: string[]
  possibleChar: string[]
  handleCheckWordButton: () => void
  handleBackspace: () => void
  handleKeyboardButton: (value: string) => void
}

export const Keyboard = ({
  wrongChar,
  correctChar,
  possibleChar,
  handleCheckWordButton,
  handleBackspace,
  handleKeyboardButton,
}: KeyboardProps) => {
  return (
    <div className={styles.keyboard_wrapper}>
      {keyboardRows.map((row, i) => (
        <div className={styles.keyboard_row} key={i}>
          {row.map((letter, j) => {
            if (letter == "check") {
              return (
                <CheckWordButton
                  key={j}
                  handleCheckWordButton={handleCheckWordButton}
                />
              )
            } else if (letter == "del") {
              return (
                <BackspaceButton key={j} handleBackspace={handleBackspace} />
              )
            } else {
              return (
                <KeyboardButton
                  correct={correctChar.includes(letter) ? true : false}
                  wrong={wrongChar.includes(letter) ? true : false}
                  possible={possibleChar.includes(letter) ? true : false}
                  handleKeyboardButton={handleKeyboardButton}
                  key={j}
                  value={letter}
                />
              )
            }
          })}
        </div>
      ))}
    </div>
  )
}

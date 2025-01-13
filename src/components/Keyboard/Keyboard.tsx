import { KeyboardButton } from "../KeyboardButton/KeyboardButton"
import styles from "./Keyboard.module.css"

const row_1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
const row_2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"]
const row_3 = ["check", "z", "x", "c", "v", "b", "n", "m", "del"]

interface KeyboardProps {
  wrongChar: string[]
  correctChar: string[]
  possibleChar: string[]
  handleKeyboardButton: (value: string) => void
}

export const Keyboard = ({
  wrongChar,
  correctChar,
  possibleChar,
  handleKeyboardButton,
}: KeyboardProps) => {
  return (
    <div className={styles.keyboard_wrapper}>
      <div className={styles.keyboard_row}>
        {row_1.map((letter, i) => (
          <KeyboardButton
            correct={correctChar.includes(letter) ? true : false}
            enabled={!wrongChar.includes(letter) ? true : false}
            possible={possibleChar.includes(letter) ? true : false}
            handleKeyboardButton={handleKeyboardButton}
            key={i}
            value={letter}
          />
        ))}
      </div>
      <div className={styles.keyboard_row}>
        {row_2.map((letter, i) => (
          <KeyboardButton
            correct={correctChar.includes(letter) ? true : false}
            enabled={!wrongChar.includes(letter) ? true : false}
            possible={possibleChar.includes(letter) ? true : false}
            handleKeyboardButton={handleKeyboardButton}
            key={i}
            value={letter}
          />
        ))}
      </div>
      <div className={styles.keyboard_row}>
        {row_3.map((letter, i) => (
          <KeyboardButton
            correct={correctChar.includes(letter) ? true : false}
            enabled={!wrongChar.includes(letter) ? true : false}
            possible={possibleChar.includes(letter) ? true : false}
            handleKeyboardButton={handleKeyboardButton}
            key={i}
            value={letter}
          />
        ))}
      </div>
    </div>
  )
}

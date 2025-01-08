import { KeyboardButton } from "../KeyboardButton/KeyboardButton"
import styles from "./Keyboard.module.css"

const row_1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
const row_2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"]
const row_3 = ["¿", "z", "x", "c", "v", "b", "n", "m", "?"]

export const Keyboard = () => {
  return (
    <div className={styles.keyboard_wrapper}>
      <div className={styles.keyboard_row}>
        {row_1.map((letter, i) => (
          <KeyboardButton key={i} value={letter} />
        ))}
      </div>
      <div className={styles.keyboard_row}>
        {row_2.map((letter, i) => (
          <KeyboardButton key={i} value={letter} />
        ))}
      </div>
      <div className={styles.keyboard_row}>
        {row_3.map((letter, i) => (
          <KeyboardButton key={i} value={letter} />
        ))}
      </div>
    </div>
  )
}

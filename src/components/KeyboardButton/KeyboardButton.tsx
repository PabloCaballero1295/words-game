import styles from "./KeyboardButton.module.css"

interface KeyboardButtonProps {
  value: string
  correct: boolean
  possible: boolean
  wrong: boolean
  handleKeyboardButton: (value: string) => void
}

export const KeyboardButton = ({
  value,
  wrong,
  correct,
  possible,
  handleKeyboardButton,
}: KeyboardButtonProps) => {
  const getStyle = () => {
    let style = styles.wrapper

    if (wrong) {
      style += ` ${styles.wrong_button}`
    } else if (correct) {
      style += ` ${styles.correct_button}`
    } else if (possible) {
      style += ` ${styles.possible_button}`
    }

    return style
  }

  return (
    <div
      className={getStyle()}
      onClick={() => handleKeyboardButton(value.toLocaleLowerCase())}
    >
      <div className={styles.button_value}>{value}</div>
    </div>
  )
}

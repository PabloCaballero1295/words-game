import styles from "./KeyboardButton.module.css"

interface KeyboardButtonProps {
  value: string
  correct: boolean
  possible: boolean
  enabled: boolean
  handleKeyboardButton: (value: string) => void
}

export const KeyboardButton = ({
  value,
  enabled,
  correct,
  possible,
  handleKeyboardButton,
}: KeyboardButtonProps) => {
  const getStyle = () => {
    let style = styles.wrapper

    if (!enabled) {
      style += ` ${styles.disabled_button}`
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
      onClick={() => (enabled ? handleKeyboardButton(value) : null)}
    >
      <div className={styles.button_value}>{value}</div>
    </div>
  )
}

import styles from "./KeyboardButton.module.css"

interface KeyboardButtonProps {
  value: string
  handleKeyboardButton: (value: string) => void
}

export const KeyboardButton = ({
  value,
  handleKeyboardButton,
}: KeyboardButtonProps) => {
  return (
    <div className={styles.wrapper} onClick={() => handleKeyboardButton(value)}>
      <div className={styles.button_value}>{value}</div>
    </div>
  )
}

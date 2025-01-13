import styles from "./KeyboardButton.module.css"

interface KeyboardButtonProps {
  value: string
  enabled: boolean
  handleKeyboardButton: (value: string) => void
}

export const KeyboardButton = ({
  value,
  enabled,
  handleKeyboardButton,
}: KeyboardButtonProps) => {
  const getStyle = () => {
    let style = styles.wrapper

    if (!enabled) {
      style += ` ${styles.disabled_button}`
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

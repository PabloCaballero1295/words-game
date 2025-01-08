import styles from "./KeyboardButton.module.css"

interface KeyboardButtonProps {
  value: string
}

export const KeyboardButton = ({ value }: KeyboardButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.button_value}>{value}</div>
    </div>
  )
}

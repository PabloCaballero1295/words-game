import styles from "./NotificationBox.module.css"

interface Props {
  visible: boolean
  text: string
}

export const NotificationBox = ({ visible, text }: Props) => {
  if (!visible) {
    return <></>
  }

  return (
    <div className={styles.notification}>
      <div className={styles.content}>{text}</div>
    </div>
  )
}

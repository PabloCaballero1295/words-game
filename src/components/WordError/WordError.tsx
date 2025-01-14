import styles from "./WordError.module.css"

export const WordError = () => {
  return (
    <div className={`${styles.wrapper} ${styles.lose}`}>
      <div>La palabra no está en la lista</div>
    </div>
  )
}

import styles from "./GameMessage.module.css"

interface GameMessageProps {
  victory: boolean
  solution: string
}

export const GameMessage = ({ victory, solution }: GameMessageProps) => {
  if (victory) {
    return (
      <div className={`${styles.wrapper} ${styles.victory}`}>
        <div className={styles.title}>Victoria</div>
        <div>
          Solución: <span className={styles.solution}>{solution}</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`${styles.wrapper} ${styles.lose}`}>
        <div className={styles.title}>DERROTA</div>
        <div>
          Solución: <span className={styles.solution}>{solution}</span>
        </div>
      </div>
    )
  }
}

import { GameStatsHistory } from "../types/types"
import styles from "./Modal.module.css"

interface Props {
  header: string
  content: string
  acceptButtonText: string
  acceptButtonAction: () => void
  closeModal: () => void
  modalBackgroundColor: string
  stats: GameStatsHistory
}

export const Modal = ({
  header,
  content,
  acceptButtonText,
  acceptButtonAction,
  closeModal,
  modalBackgroundColor,
  stats,
}: Props) => {
  const handleAcceptButton = () => {
    closeModal()
    acceptButtonAction()
  }

  const getStatText = (index: string) => {
    return `${index == "x" ? "Derrotas" : index}: ${
      stats.triesStats[index]
    } (${((stats.triesStats[index] / stats.games) * 100).toFixed(2)}%)`
  }

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <div
          className={styles.modal_header}
          style={{ color: modalBackgroundColor }}
        >
          {header}
        </div>
        <div className={styles.modal_content}>{content}</div>
        <div className={styles.stats_container}>
          <div className={styles.stats_title}>Estadísticas</div>
          <div className={styles.stats_header_flex}>
            <div className={styles.stat_header_item}>
              <div className={styles.number}>{stats.games}</div>
              <div className={styles.text}>Partidas</div>
            </div>
            <div className={styles.stat_header_item}>
              <div className={styles.number}>{stats.wins}</div>
              <div className={styles.text}>Victorias</div>
            </div>
            <div className={styles.stat_header_item}>
              <div className={styles.number}>{stats.streak}</div>
              <div className={styles.text}>Racha actual</div>
            </div>
            <div className={styles.stat_header_item}>
              <div className={styles.number}>{stats.bestStreak}</div>
              <div className={styles.text}>Mejor Racha</div>
            </div>
          </div>

          <div className={styles.tries_title}>Aciertos por nº de intentos</div>
          <div className={styles.tries_wrapper}>
            <div>{getStatText("1")}</div>
            <div>{getStatText("2")}</div>
            <div>{getStatText("3")}</div>
            <div>{getStatText("4")}</div>
            <div>{getStatText("5")}</div>
            <div>{getStatText("6")}</div>
            <div>{getStatText("x")}</div>
          </div>
        </div>

        <div className={styles.modal_footer}>
          <button className={styles.accept_button} onClick={handleAcceptButton}>
            {acceptButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}

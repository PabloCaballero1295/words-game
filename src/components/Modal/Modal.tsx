import styles from "./Modal.module.css"

interface Props {
  header: string
  content: string
  acceptButtonText: string
  acceptButtonAction: () => void
  closeModal: () => void
  modalBackgroundColor: string
}

export const Modal = ({
  header,
  content,
  acceptButtonText,
  acceptButtonAction,
  closeModal,
  modalBackgroundColor,
}: Props) => {
  const handleAcceptButton = () => {
    closeModal()
    acceptButtonAction()
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
        <div className={styles.modal_footer}>
          <button className={styles.accept_button} onClick={handleAcceptButton}>
            {acceptButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}

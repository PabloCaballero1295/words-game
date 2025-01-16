import { FaCheck } from "react-icons/fa"

import styles from "./CheckWordButton.module.css"

interface CheckWordButtonProps {
  handleCheckWordButton: () => void
}

export const CheckWordButton = ({
  handleCheckWordButton,
}: CheckWordButtonProps) => {
  return (
    <div className={styles.wrapper} onClick={() => handleCheckWordButton()}>
      <FaCheck />
    </div>
  )
}

import { FaBackspace } from "react-icons/fa"

import styles from "./BackspaceButton.module.css"

interface BackspaceButtonProps {
  handleBackspace: () => void
}

export const BackspaceButton = ({ handleBackspace }: BackspaceButtonProps) => {
  return (
    <div className={styles.wrapper} onClick={() => handleBackspace()}>
      <FaBackspace />
    </div>
  )
}

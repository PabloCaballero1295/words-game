import { useState } from "react"
import styles from "./Cell.module.css"

interface CellProps {
  letter: string
}

export const Cell = ({ letter }: CellProps) => {
  const [value, setValue] = useState(letter)
  const [cellState, setCellState] = useState(" ")
  return (
    <div className={styles.cell}>
      <div className={styles.cell_value}>{value}</div>
    </div>
  )
}

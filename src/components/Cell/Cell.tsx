import { useEffect, useState } from "react"
import styles from "./Cell.module.css"

interface CellProps {
  letter: string
  status: string
  active: boolean
}

export const Cell = ({ letter, status, active }: CellProps) => {
  const [value, setValue] = useState(letter)

  useEffect(() => {
    setValue(letter)
  }, [letter])

  const getStyle = () => {
    let cell_style = styles.cell

    if (active) {
      cell_style += ` ${styles.active}`
    }

    if (status == "incorrect") {
      cell_style += ` ${styles.incorrect}`
    } else if (status == "correct") {
      cell_style += ` ${styles.correct}`
    } else if (status == "included") {
      cell_style += ` ${styles.included}`
    }

    return cell_style
  }

  return (
    <div className={getStyle()}>
      <div className={styles.cell_value}>{value}</div>
    </div>
  )
}

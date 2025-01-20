import { useEffect, useState } from "react"
import styles from "./Cell.module.css"

interface CellProps {
  letter: string
  status: string
  active: boolean
  position: number
  wordCorrect: boolean
}

export const Cell = ({
  letter,
  status,
  active,
  position,
  wordCorrect,
}: CellProps) => {
  const [value, setValue] = useState(letter)
  const [flipped, setFlipped] = useState(false)
  const [wordJump, setWordJump] = useState(false)

  useEffect(() => {
    setValue(letter)
  }, [letter])

  useEffect(() => {
    if (status != "") {
      setTimeout(() => {
        setFlipped(true)
      }, position * 50)
      if (wordCorrect) {
        setTimeout(() => {
          setWordJump(true)
        }, 750 + position * 200)
        setWordJump(false)
      }
    } else {
      setFlipped(false)
    }
  }, [status, position, wordCorrect])

  const getColor = () => {
    let cell_style = ""
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
    <div className={`${styles.cell_container} ${wordJump ? styles.jump : ""}`}>
      <div
        className={`${styles.cell} ${
          flipped ? styles.flipped : active ? styles.active : ""
        }`}
      >
        <div className={styles.cell_front}>
          <div className={styles.cell_value}>{value}</div>
        </div>
        <div className={`${styles.cell_back} ${getColor()}`}>
          <div className={styles.cell_value}>{value}</div>
        </div>
      </div>
    </div>
  )
}

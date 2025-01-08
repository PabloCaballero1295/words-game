import { useState } from "react"
import { Cell } from "../Cell/Cell"

import styles from "./MainPage.module.css"

export const MainPage = () => {
  const [word, setWord] = useState("Royal")
  const [guess, setGuess] = useState("")

  const tries: string[] = ["     ", "     ", "     ", "     ", "     ", "     "]

  const checkGuess = () => {
    if (word == guess) {
      console.log("good")
    } else {
      console.log("bad")
    }
  }

  return (
    <div className={styles.wrapper}>
      <div>Words game</div>
      <div className={styles.words_grid}>
        {tries.map((item, i) => (
          <div key={i} className={styles.words_row}>
            {Array.from(item).map((letter, j) => (
              <Cell key={j} letter={letter} />
            ))}
          </div>
        ))}
      </div>

      <input value={guess} onChange={(e) => setGuess(e.target.value)}></input>
      <button onClick={checkGuess}>asd</button>
    </div>
  )
}

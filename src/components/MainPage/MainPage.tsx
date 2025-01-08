import { Cell } from "../Cell/Cell"

import styles from "./MainPage.module.css"
import { Keyboard } from "../Keyboard/Keyboard"

export const MainPage = () => {
  const tries: string[] = ["     ", "     ", "     ", "     ", "     ", "     "]

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Words game</div>
      <div className={styles.words_grid}>
        {tries.map((item, i) => (
          <div key={i} className={styles.words_row}>
            {Array.from(item).map((letter, j) => (
              <Cell key={j} letter={letter} />
            ))}
          </div>
        ))}
      </div>
      <Keyboard></Keyboard>
    </div>
  )
}

import { WORDS_FIVE_LENGTH } from "../constants/words"

import { POSSIBLE_WORDS_5_LENGTH } from "../constants/possible_words"

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export const getFiveLetterWord = () => {
  const index = getRandomInt(WORDS_FIVE_LENGTH.length)

  return WORDS_FIVE_LENGTH[index].toLocaleLowerCase()
}

export type CharCount = {
  letter: string
  count: number
}

export const countCharacter = (word: string) => {
  const count: CharCount[] = []

  for (const char of word) {
    const index = count.findIndex((x) => x.letter == char)
    if (index === -1) {
      count.push({ letter: char, count: 1 })
    } else {
      count[index].count++
    }
  }

  return count
}

export const checkWordExists = (word: string) => {
  return POSSIBLE_WORDS_5_LENGTH.get(word[0])?.has(word) ? true : false
}

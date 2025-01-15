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
  console.log(word)
  const count: CharCount[] = []

  for (const char of word) {
    const index = count.findIndex((x) => x.letter == char)
    if (index === -1) {
      count.push({ letter: char, count: 1 })
    } else {
      count[index].count++
    }
  }

  console.log(count)

  return count
}

const getCharIndex = (char: string) => {
  switch (char) {
    case "a":
      return 0
    case "b":
      return 1
    case "c":
      return 2
    case "d":
      return 3
    case "e":
      return 4
    case "f":
      return 5
    case "g":
      return 6
    case "h":
      return 7
    case "i":
      return 8
    case "j":
      return 9
    case "k":
      return 10
    case "l":
      return 11
    case "m":
      return 12
    case "n":
      return 13
    case "o":
      return 14
    case "p":
      return 15
    case "q":
      return 16
    case "r":
      return 17
    case "s":
      return 18
    case "t":
      return 19
    case "u":
      return 20
    case "v":
      return 21
    case "w":
      return 22
    case "x":
      return 23
    case "y":
      return 24
    case "z":
      return 25
    default:
      return -1
  }
}

export const checkWordExists = (word: string) => {
  const firstChar = word[0]
  const wordIndex = getCharIndex(firstChar)
  if (wordIndex == -1) {
    return false
  }
  return POSSIBLE_WORDS_5_LENGTH[wordIndex].includes(word)
}

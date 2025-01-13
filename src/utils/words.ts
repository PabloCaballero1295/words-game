import {
  WORDS_FIVE_LENGTH,
  WORDS_SIX_LENGTH,
  WORDS_SEVEN_LENGTH,
} from "../constants/words"

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export const getFiveLetterWord = () => {
  const index = getRandomInt(WORDS_FIVE_LENGTH.length)

  return WORDS_FIVE_LENGTH[index]
}

export const getSixLetterWord = () => {
  const index = getRandomInt(WORDS_SIX_LENGTH.length)

  return WORDS_SIX_LENGTH[index]
}

export const getSevenLetterWord = () => {
  const index = getRandomInt(WORDS_FIVE_LENGTH.length)

  return WORDS_SEVEN_LENGTH[index]
}

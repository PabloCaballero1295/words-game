export type CellState = {
  value: string
  status: string
}

type GameTriesCounter = {
  [key: string]: number
}

export type GameStatsHistory = {
  games: number
  wins: number
  loses: number
  streak: number
  bestStreak: number
  triesStats: GameTriesCounter
}

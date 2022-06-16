export interface GameStats {
    difficulty: string,
    gameRunning: boolean,
    revealedCells: number, 
    totalCells: number,
    rowAmount: number,
    cellsPerRow: number,
    flagAmount: number,
    remainingFlags: number,
    bombAmount: number,
    remainingBombs: number, 
}
export interface GameStats {
    difficulty: string,
    revealedCells: number, 
    totalCells: number,
    rowAmount: number,
    cellsPerRow: number,
    flagAmount: number,
    remainingFlags: number,
    bombsAmount: number,
    remainingBombs: number, 
}
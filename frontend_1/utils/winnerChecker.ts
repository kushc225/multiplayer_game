export function findWinner(grid: string[]): string | null {
  const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]         
  ];

  // Check for a win
  for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
          return grid[a]; 
      }
  }

  if (grid.every(cell => cell !== '')) {
      return "DRAW"; 
  }

  return null; 
}

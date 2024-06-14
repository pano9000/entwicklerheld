/**
 * 
 * @param {[number, number]} range 
 * @param {number} ticketLength 
 * @returns 
 */
export function generateLotteryTicket(range = [1, 49], ticketLength = 6) {
  const numberPool = Array(range[1]);

  for (let i = range[0] - 1; i < range[1]; i++) {
    numberPool[i] = i + 1;
  }

  const lotteryTicket = new Set();
  for (let j = 0; j < ticketLength; j++) {
      const drawnNumber = Math.floor(Math.random() * numberPool.length);
      lotteryTicket.add(numberPool[drawnNumber])
      numberPool.splice(drawnNumber, 1);
  }

  return Array.from(lotteryTicket);
}

export function checkIfWinner(ticket, winningNumbers) {
  const ticketSet = new Set(ticket);
  return winningNumbers.reduce((matches, currentNumber) => (ticketSet.has(currentNumber)) ? ++matches : matches, 0);
}

/**
 * 
 * @param {number} numberOfDraws 
 * @returns 
 */
export function simulateLottery(numberOfDraws) {
  const userTicket = generateLotteryTicket();

  const draws = [];
  for (let i = 0; i < numberOfDraws; i++) {
      const currentDraw = generateLotteryTicket();
      const matches = checkIfWinner(userTicket, currentDraw);
      draws.push(getDrawResult(currentDraw, matches, i+1))
  }

  const totals = draws.reduce((totals, draw) => {
      totals.totalWinCount += (draw.matchCount >= 2) ? 1 : 0;
      totals.totalWinnings += draw.winAmount;
      return totals
  }, {totalWinCount: 0, totalWinnings: 0});

  return {
    userTicket: userTicket,
    totalWinCount: totals.totalWinCount,
    totalWinnings: totals.totalWinnings,
    draws: draws
  };

}

const winAmounts = new Map([
  [0, 0],
  [1, 0],
  [2, 10],
  [3, 50],
  [4, 100],
  [5, 10_000],
  [6, 1_000_000]
]);

function getDrawResult(winningTicket, matchCount, drawNumber) {
  return {
    drawNumber,
    winningTicket,
    matchCount,
    winAmount: winAmounts.get(matchCount)
  }
}


const bestSum = (target, coins, memo = {}) => {
  if (target in memo) return memo[target]
  if (target === 0) return [];
  if (target < 0) return null;

  let shortestComb = null;


  for (const num of coins) {
    const remainder = target - num;
    const remainderComb = bestSum(remainder, coins, memo);
    if (remainderComb !== null) {

      const currComb = [...remainderComb, num];
      if (shortestComb === null || currComb.length < shortestComb.length) {
        shortestComb = currComb
      }

    }
  }
  memo[target] = shortestComb
  return shortestComb
}

console.log(
  bestSum(94, [1, 2, 5, 10, 20, 50]),
  bestSum(94, [5, 10]),
  bestSum(999, [1, 2, 5, 10, 20, 50, 100])
)
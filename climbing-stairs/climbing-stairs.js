export function climbingStairs(numberOfStairs) {
  console.log("***start***", numberOfStairs)
  if (numberOfStairs === 0) return 0;

  const recurseStairs = (numberOfStairs) => {

      if (numberOfStairs === 0) return 1;
      if (numberOfStairs < 0) return 0;
      
      return recurseStairs(numberOfStairs - 1) + recurseStairs(numberOfStairs - 2);
  }

  return recurseStairs(numberOfStairs - 1) + recurseStairs(numberOfStairs - 2);

}
import Move from "./Move.js";

/**
 * @param {number} treeLayers
 * @param {string} sourceTreeStand
 * @param {string} destinationTreeStand
 * @param {string} auxiliaryTreeStand
 * @returns {Move[]}
 */
 export function christmasTreeOfHanoi(treeLayers, sourceTreeStand, destinationTreeStand, auxiliaryTreeStand) {

  function moveLayers(n, src, dst, aux, moves) {
    if (n === 0) return;
    moveLayers(n - 1, src, aux, dst, moves);
    moves.push(new Move(n, src, dst));
    moveLayers(n - 1, aux, dst, src, moves);
  }

  const moves = [];
  moveLayers(treeLayers, sourceTreeStand, destinationTreeStand, auxiliaryTreeStand, moves);
  return moves;
}
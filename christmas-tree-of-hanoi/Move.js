export default class Move {
    /**
     * @param {number} treeLayer
     * @param {string} fromStand
     * @param {string} toStand
     */
    constructor(treeLayer, fromStand, toStand) {
        this.treeLayers = treeLayer;
        this.fromTreeStand = fromStand;
        this.toTreeStand = toStand;
    }

    toString() {
        return "Move " + this.treeLayers + " from " + this.fromTreeStand + " to " + this.toTreeStand;
    }

    equals(o) {
        if((obj == null) || ! JSON.stringify(this) === JSON.stringify(obj)){
            return false;
        }
        let move = obj;
        return (this.treeLayers == move.treeLayers && this.fromTreeStand == move.fromTreeStand && this.toTreeStand == move.toTreeStand);
    }
}
import {CoupleSeat, Seat} from "./Seat";
import {CINEMA} from "./CinemaHall";

export function reserve(seat, alreadyReservedSeats, cinemaHall){
    
    // reserved = seat's part of the current user's selection
    // occupied = seat is part of the cinemaHall's seats that are occupied, i.e. not selectable

    const occupiedSeatsInCinemaHall = getOccupiedSeatsInCinemaHall(cinemaHall);

    const indexOfSeatInReserved = findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place);
    const indexOfSeatInOccupied = findIndexOfSeat(occupiedSeatsInCinemaHall, seat.row, seat.place);

    const edgePlacesOfRow = getEdgePlacesOfRow(cinemaHall[seat.row]);

    //console.log(visualizeSeatStatus(seat, [occupiedSeatsInCinemaHall, alreadyReservedSeats], cinemaHall))


    // seat is occupied, clicking on it gets ignored, return current user's previous selection instead
    if (indexOfSeatInOccupied !== -1) {
        return alreadyReservedSeats; 
    }

    // "selection" process
    if (indexOfSeatInReserved === -1) {

        const consecutiveReservedSeats = getConsecutiveReservedSeats(seat, alreadyReservedSeats);

        const occupiedAndReservedSeatsCombined = [...occupiedSeatsInCinemaHall, ...alreadyReservedSeats];
        const seatSurroundings = getSeatSurroundings(consecutiveReservedSeats, occupiedAndReservedSeatsCombined, cinemaHall, edgePlacesOfRow);

        seat.reserved = true;

        // CoupleSeats handling
        if (seat.connected !== undefined) {
            const seatConnected = new CoupleSeat(seat.connected.row, seat.connected.place, seat.reserved, {"row": seat.connected.row, "place": seat.place});
            console.log("couple seat, returns:", [ ...alreadyReservedSeats, seat, seatConnected ]);
            return [ ...alreadyReservedSeats, seat, seatConnected ];
        }

        const movedSeat = moveSeat(consecutiveReservedSeats, seatSurroundings, edgePlacesOfRow, alreadyReservedSeats);

        return movedSeat;
    }

    // "deselection" process
    if (indexOfSeatInReserved !== -1) {

        // If Middle Seat -> deselecting not allowed, so exit early and return existing selection
        if (isMiddleSeat(seat, alreadyReservedSeats)) {

            return alreadyReservedSeats;
        }

        // CoupleSeats handling
        if (seat.connected !== undefined) {
            alreadyReservedSeats.splice(indexOfSeatInReserved, 1);
            const indexOfSeatConnected = findIndexOfSeat(alreadyReservedSeats, seat.connected.row, seat.connected.place);
            alreadyReservedSeats.splice(indexOfSeatConnected, 1);

            return alreadyReservedSeats;
        }

        if (alreadyReservedSeats.length > 1) {

            // remove the seat from alreadyReserved and consecutiveReservedSeats to get the seatSurroundings result "after" the deselection happens
            alreadyReservedSeats.splice(indexOfSeatInReserved, 1);

            const consecutiveReservedSeats = getConsecutiveReservedSeats(seat, alreadyReservedSeats);

            const indexOfSeatInConsec = findIndexOfSeat(consecutiveReservedSeats, seat.row, seat.place);

            consecutiveReservedSeats.splice(indexOfSeatInConsec, 1);

            const occupiedAndReservedSeatsCombined = [...occupiedSeatsInCinemaHall, ...alreadyReservedSeats];
            const seatSurroundings = getSeatSurroundings(consecutiveReservedSeats, occupiedAndReservedSeatsCombined, cinemaHall, edgePlacesOfRow);

            const movedSeat = moveSeat(consecutiveReservedSeats, seatSurroundings, edgePlacesOfRow, alreadyReservedSeats);
            
            return movedSeat;
        }

        // remove seat from already reserved seats
        alreadyReservedSeats.splice(indexOfSeatInReserved, 1);

        return alreadyReservedSeats;
    }

}


/**
 * Returns an array of all the seats that are already occupied (i.e. another user bought tickets for these)
 * @param {Object} cinemaHall
 * @return {seats[]}
 */
function getOccupiedSeatsInCinemaHall(cinemaHall) {

    const occupiedSeatsInCinemaHall = [];
    
    for (const row in cinemaHall) {
        for (const place in cinemaHall[row]) {
            if (cinemaHall[row][place]["reserved"] === true) {
                occupiedSeatsInCinemaHall.push(cinemaHall[row][place]);
            }
        }
    }
    return occupiedSeatsInCinemaHall;

}


/**
 * Checks if the seat is a middle seat, surrounded by other seats in the current selection
 * @param {Object} seat - seat object
 * @param {Array<seats>} - array of already reserved seats
 * @return {boolean}
 */
function isMiddleSeat(seat, alreadyReservedSeats) {
    
    const indexSeat = findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place);

    if (indexSeat === -1) return false;
    if (seat.connected !== undefined) return false;

    //seat is part of the reserved seats, so check, if there are any seats left or right in the same row next to it
    const indexSeatBefore = findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place - 1);
    const indexSeatAfter = findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place + 1);

    return (indexSeatBefore !== -1 && indexSeatAfter !== -1) ? true : false;
}

/**
 * reusable sort function
 */
function sortByPlace(a, b) {
    if (a.place < b.place) return -1; 
    if (a.place > b.place) return 1; 
    if (a.place === b.place) return 0;
}

/**
 * Return an array with the first and last place of the supplied row
 * @param {number}  - Row number
 * @return 
 */
function getEdgePlacesOfRow(cinemaHallRow) {
    const placesInRow = Object.keys(cinemaHallRow)
                        .sort(sortByPlace);

    const firstPlaceOfRow = placesInRow[0] * 1;
    const lastPlaceOfRow = placesInRow[placesInRow.length-1] * 1;

    return [firstPlaceOfRow, lastPlaceOfRow];
}


/**
 * Returns the index of the seat (row and place) in the provided array, if the seat is not part of the array returns -1
 * @param {seats[]} array - The array of seats
 * @param {number} row - The Seat row to look for
 * @param {number} place - The Seat place to look for
 * @returns {number}
 */
function findIndexOfSeat(array, row, place) {
    return array.findIndex( seatInArray => (seatInArray.row === row && seatInArray.place === place) );
}

/**
 * Checks if the provided seat has an empty seat 1 or 2 seats to its left/right
 * @param {Object} seat - Seat object
 * @param {Array} seats - Array of Seats objects from Occupied and Reserved Seats 
 * @returns {Object}
 * 
 */
function getSeatSurroundings(consecSeats, occAndResSeats, cinemaHall, edgePlaces) {

    class SeatInfo {
        constructor(seat, seats, num) {

            // if seat is "out of bound" set to null (which makes comparison a bit easier than a string, due to type coercion)
            const checkedSeat = (seat.place + num >= edgePlaces[0] && seat.place + num <= edgePlaces[1]) ? 
                                seat.place + num : null;

            if (checkedSeat !== null) {
                
                this.place = checkedSeat;
                this.isEmpty = (findIndexOfSeat(seats, seat.row, this.place) === -1) ? true : false;
                this.edgePlace = ( this.place === edgePlaces[0] || this.place === edgePlaces[1] ) ? true : false;
                this.isCoupleSeat = (cinemaHall[seat.row][this.place]?.connected !== undefined ) ? true : false;
                this.isEdgeLeft = ( this.place === edgePlaces[0] ) ? true : false;
                this.isEdgeRight = ( this.place === edgePlaces[1] ) ? true : false;
                this.hasCoupleSeatBefore = ( this.place - 1 === cinemaHall[seat.row][this.place - 1]?.connected !== undefined) ? true : false;
                this.hasCoupleSeatAfter = ( this.place + 1 === cinemaHall[seat.row][this.place + 1]?.connected !== undefined) ? true : false;

            } else {
                [
                    "place", 
                    "isEmpty", 
                    "edgePlace",
                    "isCoupleSeat",
                    "isEdgeLeft",
                    "isEdgeRight",
                    "hasCoupleSeatBefore",
                    "hasCoupleSeatAfter"
                ].forEach(prop => {
                    this[prop] = null;
                });
            }
        }
    }

    class CheckResult {
        constructor(consecSeats, occAndResSeats) {

            const firstSeat = consecSeats[0];
            const lastSeat = consecSeats[consecSeats.length - 1];

            this.firstSeat = new SeatInfo(firstSeat, occAndResSeats, 0);
            this.oneBefore = new SeatInfo(firstSeat, occAndResSeats, -1);
            this.twoBefore = new SeatInfo(firstSeat, occAndResSeats, -2);
            this.lastSeat = new SeatInfo(lastSeat, occAndResSeats, 0);
            this.oneAfter = new SeatInfo(lastSeat, occAndResSeats, 1);
            this.twoAfter = new SeatInfo(lastSeat, occAndResSeats, 2);

            this.isGroupSelection = (this.firstSeat.place !== this.lastSeat.place) ? true : false;

            this.hasCoupleSeat = consecSeats.some( seat => seat.connected !== undefined ) ? true : false

            this.hasGapBefore = (
                (
                    this.oneBefore.isEmpty
                    && this.twoBefore.isEmpty === false
                    && this.twoBefore.isCoupleSeat === false
                ) ||
                (
                    this.oneBefore.isEmpty 
                    && this.twoBefore.isCoupleSeat
                )
            ) ? true : false;

            this.hasGapAfter = (
                (
                    this.oneAfter.isEmpty 
                    && this.twoAfter.isEmpty === false 
                    && this.twoAfter.isCoupleSeat === false
                ) ||
                (
                    this.oneAfter.isEmpty 
                    && this.twoAfter.isCoupleSeat
                )
            ) ? true : false;

            this.hasEdgeSeatBefore = (this.oneBefore.edgePlace && (this.oneBefore.isEmpty && this.oneAfter.isEmpty));

            this.hasEdgeSeatAfter = (this.oneAfter.edgePlace && (this.oneAfter.isEmpty && this.oneBefore.isEmpty));
        }
    }

    return new CheckResult(consecSeats, occAndResSeats);

}

/**
 * Get all consecutive seats from the current user's selected seat row
 * @param seat - Current Seat Object
 * @param alreadyReserved - Array of already reserved seats
 * @return array - array
 */
function getConsecutiveReservedSeats(seat, alreadyReserved) {

    if (alreadyReserved.length === 0) return [seat];

    const currentRowsReservedSeats = 
        [...alreadyReserved, seat]
        .filter(item => (item.row === seat.row))
        .sort(sortByPlace);

    const indexOfSeat = findIndexOfSeat(currentRowsReservedSeats, seat.row, seat.place);

    const findSeats = (seat, currentRowsReservedSeats, direction, indexOfSeat) => {
        
        const results = [];
        let incrementor = direction; 
        let currentIndex = indexOfSeat;
        let stopLoop = false;
        while (stopLoop === false) {

            let consecutiveSeat = (currentRowsReservedSeats[currentIndex + incrementor]?.place === currentRowsReservedSeats[currentIndex].place + incrementor);

            if (currentRowsReservedSeats[currentIndex + incrementor] === undefined || !consecutiveSeat) {
                stopLoop = true;
            }

            results.push(currentRowsReservedSeats[currentIndex]);
            currentIndex += incrementor;
        }

        return results;
    }

    const sorted = [
            ...findSeats(seat, currentRowsReservedSeats, -1, indexOfSeat),
            ...findSeats(seat, currentRowsReservedSeats, 1, indexOfSeat)        
        ]
        .sort(sortByPlace);

    // "Set" only used to remove duplicate entries -> check if there is a better/faster/cleaner way?
    const results = new Set(sorted);

    return Array.from(results);

}



/**
 * Move the seat if necessary to avoid single empty seats
 * @todo needs to support moving whole selection groups -> change to work with arrays 
 * -> seatsArray and seatSurroundings will be the arrays
 * @param seatsArray {Object[]}
 * @param seatSurroundingsResults {Object[]}
 * @param edgeSeatsOfRow {Number[]} - Place number of first and last seat of current selections row
 * @param alreadyReservedSeats {Object[]} - Array of all seats reserved by the user's previous selection
 * 
 * @return 
 */
function moveSeat(seatsArray, seatSurroundingsResult, edgePlacesOfRow, alreadyReservedSeats) {

    alreadyReservedSeats = Array.from( (alreadyReservedSeats === undefined) ? [] : alreadyReservedSeats );

    const createMapMoveFunction = (direction) => {
        const mapMoveFunction = (seat) => {
            const indexSeatInAlreadyReserved = findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place);

            if (indexSeatInAlreadyReserved > -1) {
                alreadyReservedSeats.splice(findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place), 1);
            }

            if ( seat.connected !== undefined ) {
                const coupleSeat = new CoupleSeat(seat.connected.row, seat.connected.place, seat.reserved, {"row": seat.connected.row, "place": seat.place});
                return coupleSeat;
            }

            const movedSeat = new Seat(seat.row, seat.place, seat.reserved);
            movedSeat.place = movedSeat.place + direction;
            return movedSeat;
        }
        return mapMoveFunction;
    }

    const movedSeats = ( () => {

        //TODO: destrucure seatSurroundingsResult dynamically?

        const {
            firstSeat,
            oneBefore,
            twoBefore,
            lastSeat,
            oneAfter,
            twoAfter,
            isGroupSelection,
            hasCoupleSeat,
            hasGapBefore,
            hasGapAfter,
            hasEdgeSeatAfter,
            hasEdgeSeatBefore
        } = seatSurroundingsResult;

        if (hasGapBefore && hasGapAfter) {
            const moveDirectionToCenter = (() => {
                const calculatedValue = getDirectionToCenter(seatsArray[0].place, edgePlacesOfRow[1]);
                return ( calculatedValue !== 0 ) ? calculatedValue : 1;
            })();

            return seatsArray.map(createMapMoveFunction(moveDirectionToCenter));
        }
 
        // move right
        const moveRightChecksArray = [
            (
                hasGapAfter
                && oneBefore.isEmpty
            ),

            (
                hasGapAfter
                && lastSeat.isEdgeLeft
            ),

            (
                isGroupSelection
                && oneAfter.isEdgeRight
                && oneAfter.isEmpty
                && oneBefore.isEmpty
            ),

            (
                isGroupSelection
                && firstSeat.isEdgeLeft
                && hasGapAfter
                && !hasCoupleSeat
            )
        ]

        if ( moveRightChecksArray.some( checkItem => checkItem === true ) ) {
            return seatsArray.map(createMapMoveFunction(1))
        }


        const moveLeftChecksArray = [
            (
                hasEdgeSeatBefore
                && oneBefore.isEmpty
            ),

            (
                hasEdgeSeatAfter 
                && oneAfter.isEmpty
            ),

            (
                hasGapBefore
                && firstSeat.isEdgeRight
            ),

            (
                hasGapBefore
                && oneAfter.isEmpty
                && oneBefore.isCoupleSeat === false
            )
        ]

        if ( moveLeftChecksArray.some( checkItem => checkItem === true ) ) {
            return seatsArray.map(createMapMoveFunction(-1))
        }

        // no reason to move found, so return untouched
        return seatsArray

    })();

    return [ ...movedSeats, ...alreadyReservedSeats ];
}

/**
 * Returns which direction to move to get closer to the center of the row
 * @return {1|-1|0}
 */
function getDirectionToCenter(seat, qtySeatsInRow) {
    const centerSeat = Math.floor(qtySeatsInRow / 2);
    if (seat < centerSeat) return 1;
    if (seat > centerSeat) return -1;
    if (seat === centerSeat) return 0;
}

/**
 * Helper function to visualize the seat status in the current seat's row
 * ▣ = currently selected seat
 * ■ = occupied seat (by other users e.g.)
 * x = already reserved seats from current user
 * □ = empty seat
 * @todo visualize reserved couple seats as well
 */
function visualizeSeatStatus(currentSeat, seatsArray, cinemaHall) {

    const placesInRow = Object.keys(cinemaHall[currentSeat.row])
                        .sort(sortByPlace);

    const visualization = placesInRow.map(place => {
        const indexOfSeatInOccupied = findIndexOfSeat(seatsArray[0], currentSeat.row, place*1);
        const indexOfSeatInReserved = findIndexOfSeat(seatsArray[1], currentSeat.row, place*1);
        if (indexOfSeatInOccupied !== -1) {
            if (seatsArray[0][indexOfSeatInOccupied]["reserved"] === false) return "□";  
            if (seatsArray[0][indexOfSeatInOccupied]["reserved"] === true) return "■";  
        }

        if (indexOfSeatInReserved !== -1) {
            if (seatsArray[1][indexOfSeatInReserved]["reserved"] === false) return "□";  
            if (seatsArray[1][indexOfSeatInReserved]["reserved"] === true) return "x";  
        }
        if (currentSeat.place === place*1) return "▣";
        if (cinemaHall[currentSeat.row][place]["connected"] !== undefined) {
            if (cinemaHall[currentSeat.row][place]["reserved"] === false) return "🄲"
            if (cinemaHall[currentSeat.row][place]["reserved"] === true) return "🅒";
            
        }
        if (cinemaHall[currentSeat.row][place]["reserved"] === false) return "□";
        //if (cinemaHall[currentSeat.row][place]["reserved"] === true) return "■";
    })

    return visualization.join(" ");

}

import {CoupleSeat, Seat} from "./Seat";
import {CINEMA} from "./CinemaHall";

export function reserve(seat, alreadyReservedSeats, cinemaHall){
    console.log("*****START****",
    "\nseat:", seat,
    "\nalreaRes:", alreadyReservedSeats);
    // reserved = seat's part of the current user's selection
    // occupied = seat is part of the cinemaHall's seats that are occupied, i.e. not selectable

    const occupiedSeatsInCinemaHall = getOccupiedSeatsInCinemaHall(cinemaHall);

    const occupiedAndReservedSeatsCombined = [...occupiedSeatsInCinemaHall, ...alreadyReservedSeats];

    const indexOfSeatInReserved = findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place);
    const indexOfSeatInOccupied = findIndexOfSeat(occupiedSeatsInCinemaHall, seat.row, seat.place);

    const edgePlacesOfRow = getEdgePlacesOfRow(cinemaHall[seat.row]);
    const [firstPlaceOfRow, lastPlaceOfRow] = edgePlacesOfRow;
    
    

    const seatSurroundings = getSeatSurroundings(seat, occupiedAndReservedSeatsCombined, cinemaHall);
    console.log("seatSurroundings before everything", seatSurroundings);
    
    // seat is occupied, clicking on it gets ignored, return current user's previous selection instead
    if (indexOfSeatInOccupied !== -1) {
        //console.log("trying to work with occupoied seat, exiting")
        return [ ...alreadyReservedSeats ] 
    }

    // "selection" process
    if (indexOfSeatInReserved === -1) {

        seat.reserved = true;

        // CoupleSeats handling
        if (seat.connected !== undefined) {
            const seatConnected = new CoupleSeat(seat.connected.row, seat.connected.place, seat.reserved, {"row": seat.connected.row, "place": seat.place});
            return [ ...alreadyReservedSeats, seat, seatConnected ];
        }


        // Single Place Handling -> needs refactoring, maybe move the conditions into the "moveSeat" function instead

        // handle groups
        if (alreadyReservedSeats.length > 0) {
            const consecutiveReservedSeats = getConsecutiveReservedSeats(seat, alreadyReservedSeats);
            console.log("cnsecSeats: ", consecutiveReservedSeats);
            let arr = consecutiveReservedSeats
            let first = getSeatSurroundings(arr[0], occupiedAndReservedSeatsCombined, cinemaHall);
            let last = getSeatSurroundings(arr[arr.length-1], occupiedAndReservedSeatsCombined, cinemaHall);
            console.log("first: ", first);
            console.log("last: ", last);
            console.log("consecutiveReservedSeats/arr length", arr.length)

            if (
                (first.hasGapBefore && !last.hasGapAfter && arr.length > 0) || 
                (last.hasGapAfter && !first.hasGapBefore && arr.length > 0)
                ) {
                    console.log("skipping, selection is already at a border")
                    console.log("sending into moveSeat:\n", 
                    arr, "\n", 
                    [first, last], "\n",
                    lastPlaceOfRow, "\n",
                    alreadyReservedSeats)
                    const movedSeat = moveSeat(arr, [first, last], edgePlacesOfRow, alreadyReservedSeats);
                    console.log("returning: ", [ ...movedSeat[0], ...movedSeat[1] ]);
                    return [ ...movedSeat[0], ...movedSeat[1] ];
                }
            if (
                seatSurroundings.oneBefore.status === -1 || 
                seatSurroundings.oneAfter.status === -1
                ) {

                    console.log("onebefore or oneAfter empty")
                    const movedSeat = moveSeat(arr, [first, last], edgePlacesOfRow, alreadyReservedSeats);
                    console.log("would be returning: ", [ ...movedSeat[0], ...movedSeat[1] ]);


            }
        }
        
        
        // oneBefore or oneAfter is an occupied or existing seat -> no need for moving
        if (seatSurroundings.oneBefore.status !== -1 || seatSurroundings.oneAfter.status !== -1) {
            return [ ...alreadyReservedSeats, seat ];
        }

        // if one before/after is empty
        if (seatSurroundings.oneBefore.status === -1 || seatSurroundings.oneAfter.status === -1) {
            //console.log(seat, seatSurroundings.oneBefore.status, seatSurroundings.oneAfter.status)


            if (seat.place === firstPlaceOfRow + 1 && seatSurroundings.oneBefore.status === -1) {
                seat.place = seat.place - 1;
                return [ ...alreadyReservedSeats, seat ];
    
            }

            if (seat.place === lastPlaceOfRow - 1 && seatSurroundings.oneAfter.status === -1 && seatSurroundings.oneBefore.status === -1) {
                seat.place = seat.place - 1;
                return [ ...alreadyReservedSeats, seat ];
            }
        }

        if ( seatSurroundings.hasGapBefore || seatSurroundings.hasGapAfter ) {
            console.log("two after/before is a seat, but one after/before is empty -> not allowed")
            const movedSeat = moveSeat([seat], seatSurroundings, edgePlacesOfRow, alreadyReservedSeats);
            return [ ...movedSeat[0], ...movedSeat[1] ];

        }
        console.log("skipped all if, returning: ", [ ...alreadyReservedSeats, seat ])
        return [ ...alreadyReservedSeats, seat ];

    }

    // "deselection" process
    if (indexOfSeatInReserved !== -1) {
       // console.log("trying to remove/deselect a seat")

        // If Middle Seat -> deselecting not allowed, so exit early and return existing selection
        if (isMiddleSeat(seat, alreadyReservedSeats) === true) {
            return [ ...alreadyReservedSeats];
        }

        // CoupleSeats handling
        if (seat.connected !== undefined) {
            alreadyReservedSeats.splice(indexOfSeatInReserved, 1);
            const indexOfSeatConnected = findIndexOfSeat(alreadyReservedSeats, seat.connected.row, seat.connected.place);
            alreadyReservedSeats.splice(indexOfSeatConnected, 1);
            return [ ...alreadyReservedSeats];

        }

        if (
            seatSurroundings.oneAfter.status !== -1 &&
            seatSurroundings.oneBefore.status !== -1
           ) {
            console.log("deselection caused empty seat")
            
            console.log("before", alreadyReservedSeats)
            alreadyReservedSeats.splice(indexOfSeatInReserved, 1);

            const consecutiveReservedSeats = getConsecutiveReservedSeats(seat, alreadyReservedSeats);
            console.log("consecresSeats", consecutiveReservedSeats)
            //TODO: there must be a cleaner way to do this?
            const occupiedAndReservedSeatsCombinedFiltered = occupiedAndReservedSeatsCombined
                                                            .filter(item => {
                                                                if (item.row !== seat.row) return true;
                                                                if (item.place !== seat.place) return true;
                                                                return false;
                                                            })
            let arr = consecutiveReservedSeats.filter(item => item.place !== seat.place)
            let first = getSeatSurroundings(arr[0], occupiedAndReservedSeatsCombinedFiltered, cinemaHall);
            let last = getSeatSurroundings(arr[arr.length-1], occupiedAndReservedSeatsCombinedFiltered, cinemaHall);

            console.log("first: ", first);
            console.log("last: ", last);
            console.log("occandreserved", occupiedAndReservedSeatsCombinedFiltered);
            console.log("consecutiveReservedSeats/arr length", arr.length);

            const movedSeat = moveSeat(arr, [first, last], edgePlacesOfRow, alreadyReservedSeats);
            console.log("movedSeat: ", movedSeat);
            console.log("returning deselec: ", [ ...movedSeat[0], ...movedSeat[1] ]);
            return [ ...movedSeat[0], ...movedSeat[1] ];

           }

        // Only splice if the seat to check is part of the array
        alreadyReservedSeats.splice(indexOfSeatInReserved, 1);
        console.log("after2", alreadyReservedSeats)

        console.log("returning: ", [ ...alreadyReservedSeats ])
        return [ ...alreadyReservedSeats ];

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
                occupiedSeatsInCinemaHall.push(cinemaHall[row][place])
            }
        }
    }
    return occupiedSeatsInCinemaHall;

}


/**
 * Checks if the seat is a middle seat, surrounded by other seats in the current selection
 * @return {boolean}
 */
function isMiddleSeat(seat, alreadyReservedSeats) {
    
    const indexSeat = findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place)

    // if seat is a connected Seat -> skip and exit early
    if (seat.connected !== undefined) return false;

    // seat is not part of reservedSeats, so return early
    if (indexSeat === -1) return false;

    //seat is part of the reserved seats, so check, if there are any seats left or right in the same row next to it
    const indexSeatBefore = findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place - 1);
    const indexSeatAfter = findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place + 1);

    if (indexSeatBefore !== -1 && indexSeatAfter !== -1) return true;
    return false;
}

function sortByPlace(a, b) {
    if (a.place < b.place) return -1; 
    if (a.place > b.place) return 1; 
    if (a.place === b.place) return 0;
}

function getEdgePlacesOfRow(cinemaHallRow) {

    const placesInRow = Object.keys(cinemaHallRow)
                        .sort(sortByPlace);

    //TODO: Check if maybe Math.min and Math.max might be even faster? 
    //-- funnily enough benchmarks seem to say "no" to that

    const firstPlaceOfRow = placesInRow[0];
    const lastPlaceOfRow = placesInRow[placesInRow.length-1];

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
 * @todo rename function name to more fitting name
 * @param {Object} seat - Seat object
 * @param {Array} seats - Array of Seats objects from Occupied and Reserved Seats 
 * @returns {Object}
 * 
 */
function getSeatSurroundings(seat, seats, cinemaHall) {

    class SeatInfo {
        constructor(seat, seats, num) {
            this.status = findIndexOfSeat(seats, seat.row, seat.place + num),
            this.type = (seat.place + num > 0) ?
                        ((cinemaHall[seat.row][seat.place + num]?.connected !== undefined ) ? "coupleSeat" : "regularSeat") :
                        "out of bound"            
        }
    }

    class CheckResult {
        constructor(seat, seats) {

            this.oneBefore = new SeatInfo(seat, seats, -1),
            this.twoBefore = new SeatInfo(seat, seats, -2),
            this.oneAfter = new SeatInfo(seat, seats, 1),
            this.twoAfter = new SeatInfo(seat, seats, 2),
            //TODO: properly format the thing below //TODO; decide which is more legible
            
            this.hasGapBefore = (
                this.oneBefore.status === -1 &&
                (
                    (
                        this.twoBefore.status > -1 &&
                        this.twoBefore.type !== "coupleSeat"
                    ) || 
                    (
                        this.twoBefore.type === "coupleSeat"
                    )
                )
            ) ? true: false; 

/*
            this.hasGapBefore = (
                (
                    this.oneBefore.status === -1 && 
                    this.twoBefore.status > -1 &&
                    this.twoBefore.type !== "coupleSeat"
                ) ||
                (
                    this.oneBefore.status === -1 && 
                    this.twoBefore.type === "coupleSeat"
                )
            ) ? true : false,
*/            
            this.hasGapAfter = (
                (
                    this.oneAfter.status === -1 && 
                    this.twoAfter.status > -1  &&
                    this.twoAfter.type !== "coupleSeat"
                ) ||
                (
                    this.oneAfter.status === -1 &&
                    this.twoAfter.type === "coupleSeat"
                )
            ) ? true: false
        }
    }
/* 
    if (this.oneBefore.status === empty && twoBefore is not empty && twoBefore is not coupleSeat -> has empty seat before)

*/
    return new CheckResult(seat, seats);

}



/**
 * Check if seat before/after is an edge seat
 */
function isEdgeSeat(seat) {

    console.log(seat)

}

/**
 * Get the current row's current alreadyReservedSeats seats that are connected to the current seat
 * @todo fix -> needs to still search for consecutive seats in the same row
 * @return <Set>
 */
function getConsecutiveReservedSeats(seat, alreadyReserved) {

    if (alreadyReserved.length === 0) {
        console.log("alrady reserved = empty, return only seat in array")
        return [seat];
    }

    const currentRowsReservedSeats = 
        [...alreadyReserved, seat]
        .filter(item => {
            if (item.row === seat.row) {
                  return true
                }
            })
        .sort(sortByPlace);

    const indexOfSeat = findIndexOfSeat(currentRowsReservedSeats, seat.row, seat.place);

    //TODO: rename to somethign more useful
    const doStuff = (seat, currentRowsReservedSeats, direction, indexOfSeat) => {
        
        const results = [];
        let incrementor = (direction === "before") ? -1 : 1; 
        let currentIndex = indexOfSeat
        let stopLoop = false;
        while (stopLoop === false) {

            let consecutiveSeat = (currentRowsReservedSeats[currentIndex + incrementor]?.place === currentRowsReservedSeats[currentIndex].place + incrementor);

            if (currentRowsReservedSeats[currentIndex + incrementor] === undefined || !consecutiveSeat) {
                stopLoop = true;
            }

            results.push(currentRowsReservedSeats[currentIndex])

            currentIndex += incrementor;
        }

        return results;
    }

    let sorted = [
        ...doStuff(seat, currentRowsReservedSeats, "before", indexOfSeat),
        ...doStuff(seat, currentRowsReservedSeats, "after", indexOfSeat)        
    ].sort(sortByPlace);

    // "Set" only used to remove duplicate entries -> check if there is a better/faster/cleaner way?
    let results = new Set(sorted);

//    console.log("results after: ", results)

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
function moveSeat(seatsArray, seatSurroundingsResults, edgePlacesOfRow, alreadyReservedSeats) {
    seatSurroundingsResults = (Array.isArray(seatSurroundingsResults)) ? seatSurroundingsResults : [seatSurroundingsResults];
    alreadyReservedSeats = Array.from( (alreadyReservedSeats === undefined) ? [] : alreadyReservedSeats );

    console.log("seatSurroundingsResults", seatSurroundingsResults)
    console.log("akreayreserved in moveseatFunc", alreadyReservedSeats)

    const [ firstPlaceOfRow, lastPlaceOfRow ] = edgePlacesOfRow;
    const [ firstSurroundingsResult, lastSurroundingsResult ] = seatSurroundingsResults;

    const checkResultToUse = (lastSurroundingsResult !== undefined && lastSurroundingsResult.hasGapAfter !== false) ? lastSurroundingsResult : firstSurroundingsResult;

    const movedSeats = seatsArray.map( seat => {
        let movedSeat = new Seat(seat.row, seat.place, seat.reserved);
        let indexSeatInAlreadyReserved = findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place);

        if (indexSeatInAlreadyReserved > -1) {
            alreadyReservedSeats.splice(findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place), 1);
        }


        //TODO: clean up this mess, can be definitely be made a bit less cluttered

/*
        if (
            seat.place === 2 && 
            ((firstSurroundingsResult.oneBefore.status === -1) || (lastSurroundingsResult.oneAfter.status === -1))
           ) {
               console.log("aaaa")
           movedSeat.place = seat.place - 1;
            return [ ...alreadyReservedSeats, movedSeat ];

        }

        if (
            seat.place === lastPlaceOfRow - 1 && 
            ((firstSurroundingsResult.oneBefore.status === -1) || (lastSurroundingsResult.oneAfter.status === -1))
           ) {
            console.log("bbbb")
           movedSeat.place = seat.place + 1;
            return [ ...alreadyReservedSeats, movedSeat ];

        }
*/

        if (
            (
                firstSurroundingsResult.hasGapBefore && 
                lastSurroundingsResult !== undefined && 
                !lastSurroundingsResult.hasGapAfter &&
                lastSurroundingsResult.oneAfter.status === -1 &&
                seat.place !== lastPlaceOfRow
            ) 
            || 
            (
                lastSurroundingsResult !== undefined && 
                lastSurroundingsResult.hasGapAfter && 
                !firstSurroundingsResult.hasGapBefore
            )
        ) {
            console.log("movedSeats case 0");
            movedSeat.place = movedSeat.place + 1;
            return movedSeat;

        }

        if (
            firstSurroundingsResult.hasGapBefore &&
            lastSurroundingsResult !== undefined && 
            !lastSurroundingsResult.hasGapAfter &&
            lastSurroundingsResult.oneAfter.status !== -1
        ) {
            return seat;
        }

        if (firstSurroundingsResult.hasGapBefore && lastSurroundingsResult !== undefined && lastSurroundingsResult.twoAfter.status !== -1) {
            console.log("movedSeats case 1: firstSurroundingsResult.hasEmptySeat + && lastSurroundingsResult.twoAfter !== -1 ")
            movedSeat.place = movedSeat.place + 1;
            return movedSeat;
        }

        if (firstSurroundingsResult.hasGapAfter && lastSurroundingsResult === undefined) {
            movedSeat.place = movedSeat.place + 1;
            return movedSeat;
        }

        if (checkResultToUse.hasGapBefore && seat.place === lastPlaceOfRow) {
            console.log("movedSeats case 2")
            movedSeat.place = movedSeat.place - 1;
            return movedSeat;
        }

        if (firstSurroundingsResult.hasGapBefore) {
            console.log("movedSeats case 3")
            movedSeat.place = movedSeat.place - 1;
            return movedSeat;
        }

        return seat;

    });

    console.log("returning: ", [ movedSeats, alreadyReservedSeats ])

    return [ movedSeats, alreadyReservedSeats ];
}

/**
 * @todo fix -seems to have some bug
 * @return {1|-1|0}
 */
function calculateWhichWayIsCloserToCenter(seat, qtySeatsInRow) {
    const centerSeat = Math.floor(qtySeatsInRow / 2);
    console.log("calculateWhichWayIsCloserToCenter", seat, qtySeatsInRow, centerSeat)
    let result;
    if (seat < centerSeat) result = 1 
    if (seat > centerSeat) result = -1
    if (seat === centerSeat) result = 0
    console.log(result)
    return result
}

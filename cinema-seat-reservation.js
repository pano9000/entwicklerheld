import {CoupleSeat, Seat} from "./Seat";
import {CINEMA} from "./CinemaHall";

export function reserve(seat, alreadyReservedSeats, cinemaHall){
    console.log("*****START****",
    "\nseat:", seat,
    "\nalreaRes:", alreadyReservedSeats);
    //reserved = seat's part of the current user's selection
    // occupied = seat is part of the cinemaHall's seats that are occupied, i.e. not selectable

    const occupiedSeatsInCinemaHall = getOccupiedSeatsInCinemaHall(cinemaHall);

    const indexOfSeatInReserved = findIndexOfSeat(alreadyReservedSeats, seat.row, seat.place);
    const indexofSeatInOccupied = findIndexOfSeat(occupiedSeatsInCinemaHall, seat.row, seat.place);

    const lastPlaceOfRow = getLastPlaceOfRow(seat, cinemaHall);
   // console.log("lastPlaceOfRow", lastPlaceOfRow)
    // seat is occupied, clicking on it gets ignored, return current user's previous selection instead
    if (indexofSeatInOccupied !== -1) {
        //console.log("trying to work with occupoied seat, exiting")
        return [ ...alreadyReservedSeats ] 
    }

    // "selection" process
    if (indexOfSeatInReserved === -1) {

        //console.log("trying to add/select a seat");

        seat.reserved = true;

        // CoupleSeats handling
        if (seat.connected !== undefined) {
            const seatConnected = new CoupleSeat(seat.connected.row, seat.connected.place, seat.reserved, {"row": seat.connected.row, "place": seat.place});
            return [ ...alreadyReservedSeats, seat, seatConnected ];
        }


        // Single Place Handling -> needs refactoring, maybe move the conditions into the "moveSeat" function instead
        const occupiedAndReservedSeatsCombined = [...occupiedSeatsInCinemaHall, ...alreadyReservedSeats];
        const checkIfSeatNeedsMovingResult = checkIfSeatNeedsMoving(seat, occupiedAndReservedSeatsCombined);
        //console.log("checkIfSeatNeedsMovingResult before everything", checkIfSeatNeedsMovingResult);
       
        //if (checkIfSeatNeedsMovingResult.hasEmptySeatAfter)
        
        if (alreadyReservedSeats.length > 0) {
            const consecutiveReservedSeats = getConsecutiveReservedSeats(seat, alreadyReservedSeats);
            console.log("cnsecSeats: ", consecutiveReservedSeats);
            let arr = Array.from(consecutiveReservedSeats)
            let first = checkIfSeatNeedsMoving(arr[0], occupiedAndReservedSeatsCombined);
            let last = checkIfSeatNeedsMoving(arr[arr.length-1], occupiedAndReservedSeatsCombined);
            console.log("first: ", first);
            console.log("last: ", last);
            console.log("consecutiveReservedSeats/arr length", arr.length)

            if (
                (first.hasEmptySeatBefore && !last.hasEmptySeatAfter && arr.length > 0) || 
                (last.hasEmptySeatAfter && !first.hasEmptySeatBefore && arr.length > 0)
                ) {
                    console.log("skipping, selection is already at a border")
                    console.log("sending into moveSeat:\n", 
                    arr, "\n", 
                    [first, last], "\n",
                    lastPlaceOfRow, "\n",
                    alreadyReservedSeats)
                    const movedSeat = moveSeat(arr, [first, last], lastPlaceOfRow, alreadyReservedSeats);
                    console.log("returning: ", [ ...movedSeat[0], ...movedSeat[1] ]);
                    return [ ...movedSeat[0], ...movedSeat[1] ];

    //            } else {
    //                console.log("hasempty seat before or after")
    //                const movedSeat = moveSeat(arr, [first, last], lastPlaceOfRow, alreadyReservedSeats);
    //                console.log("returning: ", [ ...movedSeat[0], ...movedSeat[1] ])
    //                return [ ...movedSeat[0], ...movedSeat[1] ];
                }
        }
        
        
        // oneBefore or oneAfter is an occupied or existing seat -> no need for moving
        if (checkIfSeatNeedsMovingResult.oneBefore !== -1 || checkIfSeatNeedsMovingResult.oneAfter !== -1) {
            return [ ...alreadyReservedSeats, seat ];
        }

        // if one before/after is empty
        if (checkIfSeatNeedsMovingResult.oneBefore === -1 || checkIfSeatNeedsMovingResult.oneAfter === -1) {
            //console.log(seat, checkIfSeatNeedsMovingResult.oneBefore, checkIfSeatNeedsMovingResult.oneAfter)


            if (seat.place === 2 && checkIfSeatNeedsMovingResult.oneBefore === -1) {
                seat.place = seat.place - 1;
                return [ ...alreadyReservedSeats, seat ];
    
            }

            if (seat.place === lastPlaceOfRow - 1 && checkIfSeatNeedsMovingResult.oneAfter === -1 && checkIfSeatNeedsMovingResult.oneBefore === -1) {
                seat.place = seat.place - 1;
                return [ ...alreadyReservedSeats, seat ];
            }
        }

        if ( checkIfSeatNeedsMovingResult.hasEmptySeatBefore || checkIfSeatNeedsMovingResult.hasEmptySeatAfter ) {
            console.log("two after/before is a seat, but one after/before is empty -> not allowed")
            const movedSeat = moveSeat([seat], checkIfSeatNeedsMovingResult, lastPlaceOfRow, alreadyReservedSeats);
//            return [ ...alreadyReservedSeats, ...movedSeat ];
            return [ ...movedSeat[0], ...movedSeat[1] ];

        }

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

        // Only splice if the seat to check is part of the array
        alreadyReservedSeats.splice(indexOfSeatInReserved, 1);
        return [ ...alreadyReservedSeats];

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


function getLastPlaceOfRow(seat, cinemaHall) {
    const placesInRow = Object.keys(cinemaHall[seat.row]);

    //todo: check if this is faster than sorting then taking the last/first of the array -> in theory it should be?
    // reduce and sort seem to be almost identical, but sort is easier to read -> change to using sort instead?
    const lastPlaceInRow = placesInRow.reduce( (accumulator, currentValue, currentIndex, array) => {

        if (currentValue > accumulator) {
            accumulator = currentValue
        }

        return accumulator;

    })
    return lastPlaceInRow*1;
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
//function hasEmptySeatNextToIt(seat, seats) {

function checkIfSeatNeedsMoving(seat, seats) {



    class CheckResult {
        constructor(seat, seats) {
            /*           this.oneBefore = {
                type: (seat.connected !== undefined) ? "coupleSeat" : "regularSeat", //regular or couple seat
                status: (findIndexOfSeat(seats, seat.row, seat.place - 1) > -1) ? "taken" : "empty"
            },
            */
            this.oneBefore = findIndexOfSeat(seats, seat.row, seat.place - 1),
            this.oneAfter = findIndexOfSeat(seats, seat.row, seat.place + 1),
            this.twoBefore = findIndexOfSeat(seats, seat.row, seat.place - 2), 
            this.twoAfter = findIndexOfSeat(seats, seat.row, seat.place + 2),
            this.hasEmptySeatBefore = (this.oneBefore === -1 && this.twoBefore !== -1) ? true : false,
            this.hasEmptySeatAfter = (this.oneAfter === -1 && this.twoAfter !== -1) ? true : false
        }
    }

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
        [...alreadyReserved, seat].filter(item => {
            if (item.row === seat.row) {
                return true
            }
        })
        .sort( (a, b) => {
            if (a.place < b.place) return -1; 
            if (a.place > b.place) return 1; 
            if (a.place === b.place) return 0;
        })
        ;

    const indexOfSeat = findIndexOfSeat(currentRowsReservedSeats, seat.row, seat.place);
    //console.log("currentRowsReservedSeats\n", currentRowsReservedSeats, "\nIndex Of Seat in there:", indexOfSeat);


    const doStuff = (seat, currentRowsReservedSeats, direction, indexOfSeat) => {
        //console.log("in dostuff --", direction);
        
        const results = [];
        let i = (direction === "before") ? -1 : 1; 
        let j = indexOfSeat
        let stopLoop = false;
        while (stopLoop === false) {

            let consecutiveSeat = (currentRowsReservedSeats[j + i]?.place === currentRowsReservedSeats[j].place + i);

       /*     console.log(
                "in while, j:", j, "i: ", i, "\n",
                `currentRowsReservedSeats [${j+i}] j+i:`,
                currentRowsReservedSeats[j + i], "\n",
                `currentRowsReservedSeats [${j}] j:`,
                currentRowsReservedSeats[j], "\n",
                "consecutve seat?:", consecutiveSeat
            )
            */

        //    if (currentRowsReservedSeats[j + i].place !== currentRowsReservedSeats[j].place + i) {
            if (currentRowsReservedSeats[j + i] === undefined) {
              //  console.log("stopping loop, no further seat before/after to check")
                stopLoop = true;
            }

            if (!consecutiveSeat) {
             //   console.log("stopping loop, not a consecutive seat")
                stopLoop = true;
            }

            results.push(currentRowsReservedSeats[j])
            

            j += i;
        }

       // console.log("results of the loop:", results)
        return results;
        // increments or decrements, depening on i
    }

    //console.log("index of seat in getCOns:", indexOfSeat)
    let sorted = [
        ...doStuff(seat, currentRowsReservedSeats, "before", indexOfSeat),
        ...doStuff(seat, currentRowsReservedSeats, "after", indexOfSeat)        
    ].sort( (a,b) => {
        if (a.place < b.place) return -1; 
        if (a.place > b.place) return 1; 
        if (a.place === b.place) return 0;
    });

    let results = new Set(sorted);
//    let beforeRes = doStuff(seat, currentRowsReservedSeats, "before", indexOfSeat)
//    let afterRes = doStuff(seat, currentRowsReservedSeats, "after", indexOfSeat)
//    console.log("results after: ", results)

    return results;

}


/**
 * Move the seat if necessary to avoid single empty seats
 * @todo needs to support moving whole selection groups -> change to work with arrays 
 * -> originalSeat and checkIfSeatNeedsMovingResult will be the arrays
 * @return {seat} movedSeat - the moved seat
 */
function moveSeat(originalSeat, checkIfSeatNeedsMovingResult, lastPlaceOfRow, alreadyReservedSeatsTmp) {
    //const movedSeat = new Seat(originalSeat.row, originalSeat.place, originalSeat.reserved)
    //console.log("moveSeat checkIfSeatNeedsMovingResult", checkIfSeatNeedsMovingResult)
    originalSeat = (Array.isArray(originalSeat)) ? originalSeat : [originalSeat];
    checkIfSeatNeedsMovingResult = (Array.isArray(checkIfSeatNeedsMovingResult)) ? checkIfSeatNeedsMovingResult : [checkIfSeatNeedsMovingResult];
    console.log("checkIfSeatNeedsMovingResult", checkIfSeatNeedsMovingResult)
//    const { hasEmptySeatAfter, hasEmptySeatBefore } = checkIfSeatNeedsMovingResult;
    console.log("akreayreserved in moveseatFunc before", alreadyReservedSeatsTmp)
    alreadyReservedSeatsTmp = Array.from( (alreadyReservedSeatsTmp === undefined) ? [] : Array.from(alreadyReservedSeatsTmp) );
    console.log("akreayreserved in moveseatFunc after", alreadyReservedSeatsTmp)
    const [ firstCheckResult, secondCheckResult ] = checkIfSeatNeedsMovingResult;

    const checkResultToUse = (secondCheckResult !== undefined && secondCheckResult.hasEmptySeatAfter !== false) ? secondCheckResult : firstCheckResult;

    const movedSeats = originalSeat.map( seat => {
        let movedSeat = new Seat(seat.row, seat.place, seat.reserved);
        let indexSeatInAlreadyReserved = findIndexOfSeat(alreadyReservedSeatsTmp, seat.row, seat.place);
        if (indexSeatInAlreadyReserved > -1) {
            alreadyReservedSeatsTmp.splice(findIndexOfSeat(alreadyReservedSeatsTmp, seat.row, seat.place), 1);
        }


        //TODO: clean up this mess, can be definitely be made a bit less cluttered

        if (
            (
                firstCheckResult.hasEmptySeatBefore && 
                secondCheckResult !== undefined && 
                !secondCheckResult.hasEmptySeatAfter &&
                secondCheckResult.oneAfter === -1 &&
                seat.place !== lastPlaceOfRow
            ) 
            || 
            (
                secondCheckResult !== undefined && 
                secondCheckResult.hasEmptySeatAfter && 
                !firstCheckResult.hasEmptySeatBefore
            )
        ) {
            console.log("movedSeats case 0");
            movedSeat.place = movedSeat.place + 1;
            return movedSeat;

        }

        if (
            firstCheckResult.hasEmptySeatBefore &&
            secondCheckResult !== undefined && 
            !secondCheckResult.hasEmptySeatAfter &&
            secondCheckResult.oneAfter !== -1
        ) {
            return seat;
        }

        if (firstCheckResult.hasEmptySeatBefore && secondCheckResult !== undefined && secondCheckResult.twoAfter !== -1) {
            console.log("movedSeats case 1: firstCheckResult.hasEmptySeat + && secondCheckResult.twoAfter !== -1 ")
            movedSeat.place = movedSeat.place + 1;
            return movedSeat;
        }

        if (firstCheckResult.hasEmptySeatAfter && secondCheckResult === undefined) {
            movedSeat.place = movedSeat.place + 1;
            return movedSeat;
        }

        if (checkResultToUse.hasEmptySeatBefore && seat.place === lastPlaceOfRow) {
            console.log("movedSeats case 2")
            movedSeat.place = movedSeat.place - 1;
            return movedSeat;
        }

        if (firstCheckResult.hasEmptySeatBefore) {
            console.log("movedSeats case 3")
            movedSeat.place = movedSeat.place - 1;
            return movedSeat;
        }

        return seat;

    });
    console.log(
        "MovedSeats:", "\n",
        movedSeats, "\n",
        "MovedSeats lgth:", "\n",
        movedSeats.length, "\n"
    )

    console.log("MovedSea: ", movedSeats)

    return [ movedSeats, alreadyReservedSeatsTmp ];
}

/**
 * @todo fix -seems to have some bug
 * @return {1|-1|0}
 */
function calculateWhichWayIsCloserToCenter(seat, qtySeatsInRow) {
    const middleSeat = Math.floor(qtySeatsInRow / 2);
    //console.log("calculateWhichWayIsCloserToCenter", seat, qtySeatsInRow, middleSeat)
    let result;
    if (seat < middleSeat) result = 1 
    if (seat > middleSeat) result = -1
    if (seat === middleSeat) result = 0
    console.log(result)
    return result
}

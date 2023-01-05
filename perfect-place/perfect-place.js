import City from "./City";
import Region from "./Region";

/**
 * @param {Region} region
 * @param {City} givenATM
 * @param {number} numberOfATMs
 * @returns {City[]}
 */
export function choseCenters(region, givenATM, numberOfATMs) {

    const newATMLocations = [];
    const tmpCityList = [...region.cityList];
    const saveAsResultArgs = [{}, tmpCityList, newATMLocations];

    //handle first, given ATM
    saveAsResultArgs[0] = givenATM;
    saveAsResult(...saveAsResultArgs)

    // handle remaining ATMs
    for (let remainingATMs = numberOfATMs - 1; remainingATMs > 0; remainingATMs--) {
        const cityDistancesFromGivenATM = getCityDistancesFromAllATMs(tmpCityList, newATMLocations);
        const highestLeastDistantCity = getHighestMinDistantCity(cityDistancesFromGivenATM)
        saveAsResultArgs[0] = highestLeastDistantCity.city;
        saveAsResult(...saveAsResultArgs)
    }

    return [...newATMLocations];
}


function calculateDistanceBetweenCities(city1, city2) {
    //Euclidean distance
    const a = city1.xCoordinate - city2.xCoordinate;
    const b = city1.yCoordinate - city2.yCoordinate;

    return Math.sqrt( a*a + b*b );
}


function getCityDistancesFromAllATMs(region, ATMLocations) {
    return region.map( city => {
        return ATMLocations.map( ATMLocation => {
            return {city, distance: calculateDistanceBetweenCities(city, ATMLocation)}
        })
    } )
}

function getMaxDistantCity(cityDistances) {
    return cityDistances.reduce( (accum, element) => {
        return (element.distance > accum.distance) ? element : accum;
    }, cityDistances[0]);
}

function getMinDistantCity(cityDistances) {
    return cityDistances.reduce( (accum, element) => {
        return (element.distance < accum.distance) ? element : accum;
    }, cityDistances[0]);
}

function getHighestMinDistantCity(cityDistancesFromAllATMs) {
    const minDistantCitys = cityDistancesFromAllATMs.map(element => getMinDistantCity(element));
    return getMaxDistantCity(minDistantCitys);
}

/**
 * 
 * @param {City} city 
 * @param {Array<{}>} cityList 
 * @param {Array<{}>} accumulator 
 */
function saveAsResult(city, cityList, accumulator) {
    accumulator.push(city);
    cityList.splice(cityList.indexOf(city), 1);
}
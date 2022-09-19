const MAX_BLOCK_SIZE = 32;

export function inSameSubnet(ipV4Addr1String, ipV4Addr2String, subnetMaskString) {
 
    // turn arguments object into an array,
    // then use map to split everything by "." into the different address blocks,
    // then use map on that to convert to Binary string, with convertOctStringToBinaryString(),
    // then join 
    // then desctructure the array

   const [ipV4Addr1BinaryString, ipV4Addr2BinaryString, subnetMaskBinaryString] = 
        Array.from(arguments)
        .map(argument => convertOctStringToBinaryString(argument));


    return (getNetworkPortion(ipV4Addr1BinaryString, subnetMaskBinaryString) === getNetworkPortion(ipV4Addr2BinaryString, subnetMaskBinaryString)) ?
        true :
        false;
}

export function calculateSubnetInfo(ipV4CIDRString) {

    const [ipV4Addr, cIDRNumber] = splitIpV4AndCidrString(ipV4CIDRString);

    const ipV4AddrAsBinaryStringArray = convertOctStringToBinaryString(ipV4Addr.join("."));
    const subnetMaskAsBinaryStringArray = convertCidrToBinaryStringArray(cIDRNumber).join("");

    //Get network and host portions of the IPV4 address
    const networkPortionBinaryString = getNetworkPortion(ipV4AddrAsBinaryStringArray, subnetMaskAsBinaryStringArray); 
    const hostPortionBinaryString = getHostPortion(ipV4AddrAsBinaryStringArray, subnetMaskAsBinaryStringArray); 

    const minHost = networkPortionBinaryString.padEnd(MAX_BLOCK_SIZE, "0");
    const maxHost = networkPortionBinaryString.padEnd(MAX_BLOCK_SIZE, "1");
    const minNetworkPortionBinaryStringArray = splitBinaryStringToArray(minHost);
    const maxNetworkPortionBinaryStringArray = splitBinaryStringToArray(maxHost);

    return {
        netId: convertBinaryStringArrayToOctArray(minNetworkPortionBinaryStringArray).join("."),
        first: (() => {
            const ip = convertBinaryStringArrayToOctArray(minNetworkPortionBinaryStringArray);
            ip[3] += 1;
            return ip.join(".");
        })(),

        last: (() => {
            const ip = convertBinaryStringArrayToOctArray(maxNetworkPortionBinaryStringArray);
            ip[3] -= 1;
            return ip.join(".");
        })(),
        broadcast: convertBinaryStringArrayToOctArray(maxNetworkPortionBinaryStringArray).join("."),
        subnetmask: convertBinaryStringArrayToOctArray(convertCidrToBinaryStringArray(cIDRNumber)).join("."),

        //remove 2, due to broadcast and network ID
        available: 2**hostPortionBinaryString.length-2
    }

}



export function calculateEqualSizedSubnets(ipV4CIDRString, numberOfSubnets) {

    const [ipV4Addr, cIDRNumber] = splitIpV4AndCidrString(ipV4CIDRString);
    const neededBitsForSubnets = calculateNeededBitsForSubnets(numberOfSubnets);

    // setup initial values for loop
    let ip = ipV4Addr.join(".");
    const cidr = +cIDRNumber + neededBitsForSubnets;
    const resultList = [];

    for (let i = 0; i < numberOfSubnets; i++) {        
        let tempResult = calculateSubnetInfo(`${ip}/${cidr}`);
        tempResult.number = i+1;

        ip = addBitToBinaryStringArray( convertOctStringToBinaryString(tempResult.broadcast));

        resultList.push(tempResult);
    }

    return resultList;

}

export function calculateVariableSizedSubnets(ipV4CIDRString, numberOfUserHosts) {

    const [ipV4Addr, cIDRNumber] = splitIpV4AndCidrString(ipV4CIDRString);
    const maxNumberOfAddresses = 2**(MAX_BLOCK_SIZE-cIDRNumber);

    //sort from highest to lowest, just in case
    numberOfUserHosts.sort( (a,b) => {
        if (a < b) return 1;
        if (a > b) return -1;
        if (a === b) return 0;
    })

    const subnetsArray = numberOfUserHosts.map( (item) => {
        
        return {
            requested: item,
            // function needs to return correct number of "usable" hosts,
            // and since each subnet apparently "loses" at least 1 IP to a router
            // need 
            nearest: (2**calculateNeededBitsForSubnets(item) - item > 2) ?
                        2**calculateNeededBitsForSubnets(item) :
                        2**(calculateNeededBitsForSubnets(item)+1),
        }
    })

    const results = [];
    let ip = ipV4Addr.join(".");
    let counter = 1;

    subnetsArray.forEach( (item) => {
        let newCIDRNumber = +cIDRNumber + Math.log2(maxNumberOfAddresses/item.nearest);
        let [tempResult] = calculateEqualSizedSubnets(`${ip}/${newCIDRNumber}`, 1);

        tempResult.requested = item.requested;
        tempResult.number = counter;
        results.push(tempResult);

        ip = addBitToBinaryStringArray( convertOctStringToBinaryString(tempResult.broadcast));
        counter++;
    })

    return results;
}




/**
 * Takes a 32 character long "binary string", and splits it up into an array of 4 chunks
 * @param {string}
 * @returns {array}
 */
function splitBinaryStringToArray(binaryString) {
    return [
        Array.from(binaryString.slice(0, 8)).join(""),
        Array.from(binaryString.slice(8, 16)).join(""),
        Array.from(binaryString.slice(16, 24)).join(""),
        Array.from(binaryString.slice(24, 32)).join("")
    ]
}

/**
 * takes a string of an octet block (e.g. 192) and return an 8 character long binary string representation of it
 */
function convertSingleOctStringToBinaryString(octNum) {
    return (+octNum).toString(2).padStart(8, "0");
}


/**
 * takes a octet string, e.g. "192.168.0.1", returns it as a 32 bit binary string 
 * e.g. "11000000101010000000000001111111"
 */
function convertOctStringToBinaryString(octNum) {
    return octNum
            .split(".")
            .map(octBlock => (+octBlock).toString(2).padStart(8,"0")).join("");
}

// Convert CIDR Integer to a binary String -> subnet mas in binary form
// takes a number, e.g. 24, and returns an array of 4 block of binary strings
function convertCidrToBinaryStringArray(cidrInt) {
    let subnetMaskBinaryString = "";

    // Create a string of 1, with the length as defined by the CIDR Integer (e.g. 24)
    for (let i = 1; i <= cidrInt; i++) { 
        subnetMaskBinaryString += "1";
    };
    // the string'S full length needs to be 32, so pad up the rest, then return
    subnetMaskBinaryString = subnetMaskBinaryString.padEnd(MAX_BLOCK_SIZE, "0");

    return splitBinaryStringToArray(subnetMaskBinaryString);
}


/**
 * takes in an unsplit binaryString, and returns a 2 digit CIDR Int
 */
function convertBinaryStringToCidr(subnetBinaryString) {
    // Create an Array 
    //const subnetBinaryStringArray = Array.from(subnetBinaryString);
    const hostPartIndexStart = subnetBinaryString.indexOf("0");
    //console.log("in bintoCIDR", subnetBinaryString, subnetBinaryString.slice(0, hostPartIndexStart))
    return subnetBinaryString.slice(0, hostPartIndexStart).length
}

/**
 * take 4x 8 characters long binary number array and convert to a Oct array
 * e.g. in: ['11111111', '11111111', '11111111', '00000000'] out [255, 255, 255, 0]
 */
function convertBinaryStringArrayToOctArray(binaryStringArray) {
    return binaryStringArray.map( block => parseInt(block, 2));
}

//create helper function to get the Network portions of the ipV4 addresses

// subnet/ip consists of network and host portion, all the bits which are "1" in the subnet -> network portion -> the remaining bits are host portion
// so we only need to check if the network portion is the same

// look for the first 0 -> this is where the host portion of the subnetwork begins, this means everything before that is network portion
//const subnetHostPortionStartIndex = subnetMaskBinaryString.indexOf(0);
function getNetworkPortion(ipV4AddrBinaryString, subnetMaskBinaryString) {
    const subnetHostPortionStartIndex = subnetMaskBinaryString.indexOf(0);
    return ipV4AddrBinaryString.slice(0, subnetHostPortionStartIndex);
}

function getSubnetPortion(ipV4AddrBinaryString, subnetMaskBinaryString, numberOfBitsNeeded) {
    const subnetHostPortionStartIndex = subnetMaskBinaryString.indexOf(0); //index
    return ipV4AddrBinaryString.slice(subnetHostPortionStartIndex, subnetHostPortionStartIndex+numberOfBitsNeeded) // slice -> end index needs to start from 0;
}

function getHostPortion(ipV4AddrBinaryString, subnetMaskBinaryString) {
    const subnetHostPortionStartIndex = subnetMaskBinaryString.indexOf(0);
    return ipV4AddrBinaryString.slice(subnetHostPortionStartIndex);
}

function calculateNeededBitsForSubnets(numberOfRequiredSubnets) {
        // 2**bit-ids = how many networks will be available
        // 2**X = subnetsNumber
        // Math.log2(number)
        //since bits are either 0 or 1 -> power of of 2
        // calculates -> 2**x = numba
        // then ceils it since we need to have "full" numbers

    return Math.ceil(Math.log2(numberOfRequiredSubnets));
    
}

/**
 * takes an ipV4CidrString and splits it up returning the netId as split up in octet blocks and CIDR number
 * @param {string} - ipV4CidrString 
 * @return <Array>
 */
function splitIpV4AndCidrString(ipV4CidrString) {
    // split the ipV4CIDRString into two chunks, the ip and the CIDR part
    // then use map to split the ip part into blocks and run another map on it to convert the strings to a Int
    return ipV4CidrString
            .split("/")
            .map( element => element.split(".").map(block => +block));
}



function addBitToBinaryStringArray(binaryStringArray) {
    // a bit primitive way of working with bits?
    // searches for last zero in the binary string, then copies everything before it
    // into a new string, inserts a "1" and copies everything after that as well
    console.log(binaryStringArray)
    const indexOfLastZero = binaryStringArray.lastIndexOf("0");
    let partBefore = binaryStringArray.slice(0,indexOfLastZero);
    let padLength = binaryStringArray.slice(indexOfLastZero+1).length;
    let partAfter = "".padStart(padLength, "0");
 
    let newString = splitBinaryStringToArray(`${partBefore}1${partAfter}`)
   
    return convertBinaryStringArrayToOctArray(newString).join(".")

}

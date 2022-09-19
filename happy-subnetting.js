export function inSameSubnet(ipV4Addr1String, ipV4Addr2String, subnetMaskString) {

   const [ipV4Addr1BinaryString, ipV4Addr2BinaryString, subnetMaskBinaryString] = 
        Array.from(arguments)
        .map(argument => convertOctStringToBinaryString(argument));

    return (getNetworkPortion(ipV4Addr1BinaryString, subnetMaskBinaryString) === getNetworkPortion(ipV4Addr2BinaryString, subnetMaskBinaryString)) ?
            true :
            false;
}

export function calculateSubnetInfo(ipV4CIDRString) {

    const [ipV4Addr, cIDRNumber] = ipV4CIDRString.split("/");
    
    const ipV4AddrAsBinaryString = convertOctStringToBinaryString(ipV4Addr);
    const subnetMaskAsBinaryString = convertCidrToBinaryStringArray(cIDRNumber).join("");

    //Get network and host portions of the IPV4 address
    const networkPortionBinaryString = getNetworkPortion(ipV4AddrAsBinaryString, subnetMaskAsBinaryString); 
    const hostPortionBinaryString = getHostPortion(ipV4AddrAsBinaryString, subnetMaskAsBinaryString); 

    const minHost = networkPortionBinaryString.padEnd(32, "0");
    const maxHost = networkPortionBinaryString.padEnd(32, "1");
    const minNetworkPortionBinaryStringArray = splitBinaryStringToArray(minHost);
    const maxNetworkPortionBinaryStringArray = splitBinaryStringToArray(maxHost);

    return {
        netId: convertBinaryStringArrayToOctString(minNetworkPortionBinaryStringArray),
        first: addBitToBinaryString(minNetworkPortionBinaryStringArray.join("")),

        last: (() => {
            const ip = convertBinaryStringArrayToOctString(maxNetworkPortionBinaryStringArray).split(".");
            ip[3] -= 1;
            return ip.join(".");
        })(),

        broadcast: convertBinaryStringArrayToOctString(maxNetworkPortionBinaryStringArray),
        subnetmask: convertBinaryStringArrayToOctString(convertCidrToBinaryStringArray(cIDRNumber)),

        //remove 2, due to broadcast and network ID
        available: 2**hostPortionBinaryString.length-2
    }

}

export function calculateEqualSizedSubnets(ipV4CIDRString, numberOfSubnets) {

    const [ipV4Addr, cIDRNumber] = ipV4CIDRString.split("/");
    const neededBitsForSubnets = calculateNeededBitsForSubnets(numberOfSubnets);

    // setup initial values for loop
    let ip = ipV4Addr;
    const cidr = +cIDRNumber + neededBitsForSubnets;
    const resultList = [];

    for (let i = 0; i < numberOfSubnets; i++) {        
        let tempResult = calculateSubnetInfo(`${ip}/${cidr}`);
        tempResult.number = i+1;
        ip = addBitToBinaryString( convertOctStringToBinaryString(tempResult.broadcast));

        resultList.push(tempResult);
    }

    return resultList;

}

export function calculateVariableSizedSubnets(ipV4CIDRString, numberOfUserHosts) {

    const [ipV4Addr, cIDRNumber] = ipV4CIDRString.split("/");
    const maxNumberOfAddresses = 2**(32-cIDRNumber);

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
            // need to jump to the "next" power, if necessary 
            nearest: (2**calculateNeededBitsForSubnets(item) - item > 2) ?
                        2**calculateNeededBitsForSubnets(item) :
                        2**(calculateNeededBitsForSubnets(item)+1),
        }
    })

    const results = [];
    let ip = ipV4Addr;
    let counter = 1;

    subnetsArray.forEach( (item) => {
        let newCIDRNumber = +cIDRNumber + Math.log2(maxNumberOfAddresses/item.nearest);
        let [tempResult] = calculateEqualSizedSubnets(`${ip}/${newCIDRNumber}`, 1);

        tempResult.requested = item.requested;
        tempResult.number = counter;
        results.push(tempResult);

        ip = addBitToBinaryString( convertOctStringToBinaryString(tempResult.broadcast));
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
 * takes a octet string, e.g. "192.168.0.1", returns it as a 32 bit binary string 
 * e.g. "11000000101010000000000001111111"
 */
function convertOctStringToBinaryString(octNum) {
    return octNum
            .split(".")
            .map(octBlock => (+octBlock).toString(2).padStart(8,"0"))
            .join("");
}


/**
 * Convert CIDR Integer to a binary string array
 */
function convertCidrToBinaryStringArray(cidrInt) {
    const subnetMaskBinaryString = "".padStart(cidrInt, "1").padEnd(32, "0");
    return splitBinaryStringToArray(subnetMaskBinaryString);
}


/**
 * takes in an unsplit binaryString, and returns a 2 digit CIDR Int
 */
function convertBinaryStringToCidr(subnetBinaryString) {
    // Create an Array 
    //const subnetBinaryStringArray = Array.from(subnetBinaryString);
    const hostPartIndexStart = subnetBinaryString.indexOf("0");
    return subnetBinaryString.slice(0, hostPartIndexStart).length
}

/**
 * take 4x 8 characters long binary number array and converts to an Oct string
 * e.g. in: ['11111111', '11111111', '11111111', '00000000'] out "255.255.255.0"
 */
function convertBinaryStringArrayToOctString(binaryStringArray) {
    return binaryStringArray.map( block => parseInt(block, 2)).join(".");
}


//create helper function to get the Network portions of the ipV4 addresses
// subnet/ip consists of network and host portion, all the bits which are "1" in the subnet -> network portion -> the remaining bits are host portion
// look for the first 0 -> this is where the host portion of the subnetwork begins, this means everything before that is network portion

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
 * Takes a binary string, and adds 1 bit to it and then returns 
 */
function addBitToBinaryString(binaryString) {
    // a bit primitive way of working with bits?
    // searches for last zero in the binary string, then copies everything before it
    // into a new string, inserts a "1" and copies everything after that as well

    const indexOfLastZero = binaryString.lastIndexOf("0");
    let partBefore = binaryString.slice(0,indexOfLastZero);
    let padLength = binaryString.slice(indexOfLastZero+1).length;
    let partAfter = "".padStart(padLength, "0");
 
    let newString = splitBinaryStringToArray(`${partBefore}1${partAfter}`)
   
    return convertBinaryStringArrayToOctString(newString)
}

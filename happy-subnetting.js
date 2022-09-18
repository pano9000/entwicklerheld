const OCT_CHART = [128, 64, 32, 16, 8, 4, 2, 1];
const MAX_BLOCK_SIZE = 32;
const MAX_BLOCK_VALUE = 256; //including the "0" 

export function inSameSubnet(ipV4Addr1String, ipV4Addr2String, subnetMaskString) {
 
    // turn arguments object into an array,
    // then use map to split everything by "." into the different address blocks,
    // then use map on that to convert to Binary string, with convertOctStringToBinaryString(),
    // then join 
    // then desctructure the array
    const [ipV4Addr1BinaryString, ipV4Addr2BinaryString, subnetMaskBinaryString] = Array.from(arguments).map(argument => {
        return argument.split(".").map(block => convertOctStringToBinaryString(block)).join("")
        }
    );

    if ( (getNetworkPortion(ipV4Addr1BinaryString, subnetMaskBinaryString)) === (getNetworkPortion(ipV4Addr2BinaryString, subnetMaskBinaryString))) {
        return true;
    } else {
        return false;
    }
}

export function calculateSubnetInfo(ipV4CIDRString) {

    const subnetInfoObject = {}

    const [ipV4Addr, cIDRNumber] = splitIpV4AndCidrString(ipV4CIDRString);

    const ipV4AddrAsBinaryStringArray = convertOctStringToBinaryStringArray(ipV4Addr.join("."))
    const subnetMaskAsBinaryStringArray = convertCidrToBinaryStringArray(cIDRNumber)

    //Get network and host portions of the IPV4 address
    const networkPortionBinaryString = getNetworkPortion(ipV4AddrAsBinaryStringArray.join(""), subnetMaskAsBinaryStringArray.join("")); 
    const hostPortionBinaryString = getHostPortion(ipV4AddrAsBinaryStringArray.join(""), subnetMaskAsBinaryStringArray.join("")); 

    const minHost = networkPortionBinaryString.padEnd(MAX_BLOCK_SIZE, "0");
    const maxHost = networkPortionBinaryString.padEnd(MAX_BLOCK_SIZE, "1");
    const minNetworkPortionBinaryStringArray = splitBinaryStringToArray(minHost);
    const maxNetworkPortionBinaryStringArray = splitBinaryStringToArray(maxHost);

    subnetInfoObject.netId = convertBinaryStringArrayToOctArray(minNetworkPortionBinaryStringArray).join(".");

    subnetInfoObject.first = (() => {
        const ip = convertBinaryStringArrayToOctArray(minNetworkPortionBinaryStringArray)
        ip[3] += 1
        return ip.join(".")
        })();

    subnetInfoObject.last = (() => {
        const ip = convertBinaryStringArrayToOctArray(maxNetworkPortionBinaryStringArray);
        ip[3] -= 1
        return ip.join(".")
        })();

    subnetInfoObject.broadcast = convertBinaryStringArrayToOctArray(maxNetworkPortionBinaryStringArray).join(".")

    subnetInfoObject.subnetmask = convertBinaryStringArrayToOctArray(convertCidrToBinaryStringArray(cIDRNumber)).join(".");

    //remove 2, due to broadcast and network ID
    subnetInfoObject.available = 2**hostPortionBinaryString.length-2;

    return subnetInfoObject;
}



export function calculateEqualSizedSubnets(ipV4CIDRString, numberOfSubnets) {
    // scenario 3

    const [ipV4Addr, cIDRNumber] = splitIpV4AndCidrString(ipV4CIDRString);
    const neededBitsForSubnets = calculateNeededBitsForSubnets(numberOfSubnets);

    // setup initial values for loop
    let ip = ipV4Addr.join(".")
    const cidr = +cIDRNumber + neededBitsForSubnets
    const resultList = [];

    for (let i = 0; i < numberOfSubnets; i++) {        
        let tempResult = calculateSubnetInfo(`${ip}/${cidr}`);
   /*     console.log(
            "\n-----",
            "\ninside i:", i, 
            "\ncidr: ", cidr,
            "\nip: ", ip,
            "\ntempresult:", tempResult,
            "\n-----"
        );
        */
        tempResult.number = i+1;

        ip = additionForBinaryStringArray( convertOctStringToBinaryStringArray(tempResult.broadcast), 1 );
        
        //console.log("new ip", ip)
        
        resultList.push(tempResult)
    }

   // console.log("\n----\nresultList:", resultList, "\n----")
    return resultList;

}

export function calculateVariableSizedSubnets(ipV4CIDRString, numberOfUserHosts) {
    console.log("******* start***** calculateVariableSizedSubnets \n");
    console.log(
        "ipV4CIDRString: ", ipV4CIDRString,
        "\nnumberOfUserHosts: ", numberOfUserHosts
    );

    const [ipV4Addr, cIDRNumber] = splitIpV4AndCidrString(ipV4CIDRString);
    const maxNumberOfAddresses = 2**(32-cIDRNumber)
  //  console.log(maxNumberOfAddresses)
    numberOfUserHosts.sort( (a,b) => {
        if (a < b) return 1 
        if (a > b) return -1
        if (a === b) return 0
    })

    //create subblock -> subblock needs to be a power of two

    const subnetsArray = numberOfUserHosts.map( (item) => {
        console.log("-----\n",
            "nearest", 2**calculateNeededBitsForSubnets(item),
            "\n", "requested:", item,
            "\n", "nearest-requested", 2**calculateNeededBitsForSubnets(item) - item,
            "\n", "next power: ", 2**(calculateNeededBitsForSubnets(item)+1),
            "\n-----"
        )
        return {
            requested: item,
            nearest: (2**calculateNeededBitsForSubnets(item) - item > 2) ?
                        2**calculateNeededBitsForSubnets(item) :
                        2**(calculateNeededBitsForSubnets(item)+1),
        }
    })

    console.log(numberOfUserHosts, "\n", subnetsArray, )
    const results = [];
    let ip = ipV4Addr.join(".");
    let i = 1;
    subnetsArray.forEach( (item, index) => {
        let newCIDRNumber = +cIDRNumber + Math.log2(maxNumberOfAddresses/item.nearest);
        console.log(ip, newCIDRNumber)
        let tempResult = calculateEqualSizedSubnets(`${ip}/${newCIDRNumber}`, 1);

        tempResult[0].requested = item.requested;
        tempResult[0].number = i;
        if (i === 3 || i===4) {
            console.log("inside foreach: ", i, "\n", tempResult)
        }
        results.push(tempResult[0]);
        ip = additionForBinaryStringArray( convertOctStringToBinaryStringArray(tempResult[0].broadcast), 1 )
        i++;
    })

    // // originalsubnet + log2(Total / Subblock)
    //console.log("results", results)
/*    console.log(
        "cidr", +cIDRNumber,
        "\n log2(Total / Subblock):", Math.log2(maxNumberOfAddresses/subnetsArray[0]),
        "\n equals=", +cIDRNumber + Math.log2(maxNumberOfAddresses/subnetsArray[0]),
        calculateEqualSizedSubnets(
            `${ipV4Addr.join(".")}/${+cIDRNumber + Math.log2(maxNumberOfAddresses/subnetsArray[0])}`, 1)

    )
*/
    // scenario 4
    const subnets = [];
    // Your implementation should go here.
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
function convertOctStringToBinaryString(octNum) {
    let accumulatorOctNum = octNum;
    //potentially easier/better with "reduce"?
    const binaryNumString = OCT_CHART.map( octValue => {
        if ((accumulatorOctNum - octValue) >= 0) {
            accumulatorOctNum -= octValue;
            return 1;
        }
        else {
            return 0;
        }
    })
    return binaryNumString.join("");
}

// takes a string, e.g. "192.168.0.1" and returns the binary representation as a split array e.g.
/**
 * takes a octet string, e.g. "192.168.0.1", returns an array of that in binary strings, 
 * e.g. ['11000000', '10101000', '00000000', '01111111']
 */
function convertOctStringToBinaryStringArray(octNum) {
    return octNum
            .split(".")
            .map(octBlock => (+octBlock).toString(2).padStart(8,"0"));
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
    return ipV4CidrString.split("/").map( element => element.split(".").map(block => block*1));
}



function additionForBinaryStringArray(binaryStringArray, numberToAdd) {
  /*  console.log(
        "in additionForBinaryStringArray---\n",
        "binaryStringArray before:\n", binaryStringArray
    )*/

    //TODO: clean up the mess below, rename variables to better names
    const indexOfLastZero = binaryStringArray.join("").lastIndexOf("0");
    let newString = binaryStringArray.join("").slice(0,indexOfLastZero) + "1";

    let lastPart = binaryStringArray.join("").slice(indexOfLastZero+1).length;

    let lastPart2 = "".padStart(lastPart.length, "0"); // does not seem to work for some reason

    // todo: find a nicer, better way instead of looping
    let abc="";
    for (let m = 1; m <= lastPart; m++) {
        abc += "0";

    }

    newString = splitBinaryStringToArray(newString+abc)
  //  console.log("\nnewString:\n", newString);

    newString = convertBinaryStringArrayToOctArray(newString).join(".")
  //  console.log("\nnewString:\n", newString,
//            "\n----");

    return newString
}

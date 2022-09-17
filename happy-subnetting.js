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
    console.log("******* start***** \n");

    // O convert IP to Binary String ___-> const originalIpV4AddrAsBinaryStringArray 
    // O convert CIDR to Binary String Subnet Mask ___-> const originalSubnetMaskAsBinaryStringArray
    // O define original host part and network part, before subnetting ___-> const binaryStringArrayPortions array -> index 0 = network -> index 1 = host 
    // O get number of equal subnets needed and calculate how many bits to borrow from host part for subnetting ___-> calculateNeededBitsForSubnets()
    // O remove these bits from the "host part" array
    // Loop A
        // O calculate the netId (all host bits = 0) and the broadcast IP (all host bits = 1) for subnet 1 ___->netIdOfSubnet + broadcastOfSubnet
        // O calculate the subnetmask for subnet 1 ___-> subnetMaskOfSubnet
        // add/remove 1 bit to the subnet part and  go to Loop A again, until we have created all subnets we needed
    // return the object in an array like in scenario2, but add a "number" key with the current iteration as value

    console.log("arguments:\n IP-CIDR String:", ipV4CIDRString, "\n", "numberOfSubnets:", numberOfSubnets)

    const [ipV4Addr, cIDRNumber] = splitIpV4AndCidrString(ipV4CIDRString);

    const originalSubnetMaskAsBinaryStringArray = convertCidrToBinaryStringArray(cIDRNumber);
    const originalIpV4AddrAsBinaryStringArray = convertOctStringToBinaryStringArray(ipV4Addr.join("."));

    //console.log("originalSubnetMaskAsBinaryStringArray", originalSubnetMaskAsBinaryStringArray, "networkPortionBinaryString", networkPortionBinaryString)
    const neededBitsForSubnets = calculateNeededBitsForSubnets(numberOfSubnets);

    // 0 -> Network Portion, 1 -> Subnet Portion, 2 -> Host Portion
    const binaryStringArrayPortions = [];

    //push network, subnet portion
    binaryStringArrayPortions.push(getNetworkPortion(originalIpV4AddrAsBinaryStringArray.join(""), originalSubnetMaskAsBinaryStringArray.join("")));
    binaryStringArrayPortions.push(neededBitsForSubnets);
    //push host portion - with the number of bits for the subnet part removed
    binaryStringArrayPortions.push(getHostPortion(originalIpV4AddrAsBinaryStringArray.join(""), originalSubnetMaskAsBinaryStringArray.join("")).substring(neededBitsForSubnets.length));


/* is this unsused - seems like it
    const netIdOfSubnet = () => {
        const netIdCopyOfBinaryStringArrayPortions = [...binaryStringArrayPortions]
        netIdCopyOfBinaryStringArrayPortions[2] = "0".repeat(netIdCopyOfBinaryStringArrayPortions[2].length)
        return netIdCopyOfBinaryStringArrayPortions
    }

    const broadcastOfSubnet = () => {
        const netIdCopyOfBinaryStringArrayPortions = [...binaryStringArrayPortions]
        netIdCopyOfBinaryStringArrayPortions[2] = "1".repeat(netIdCopyOfBinaryStringArrayPortions[2].length)
        return netIdCopyOfBinaryStringArrayPortions
    }
*/
    const subnetMaskOfSubnet = () => {
        const netIdCopyOfBinaryStringArrayPortions = [...binaryStringArrayPortions]
        netIdCopyOfBinaryStringArrayPortions[0] = "1".repeat(netIdCopyOfBinaryStringArrayPortions[0].length)
        netIdCopyOfBinaryStringArrayPortions[1] = "0".repeat(netIdCopyOfBinaryStringArrayPortions[1].length)
        netIdCopyOfBinaryStringArrayPortions[2] = "0".repeat(netIdCopyOfBinaryStringArrayPortions[2].length)
        return netIdCopyOfBinaryStringArrayPortions
    }

    //console.log(subnetMaskOfSubnet()[1].join^subnetMaskOfSubnet()[1])

    console.log(
//        "---\nnetIdOfSubnet: ", netIdOfSubnet(),
//        "\nbroadcastofsubnet: ", broadcastOfSubnet(), 
        "\nneededBitsForSubnets (bits, not qty): ", neededBitsForSubnets, 
//        "\nbinaryStringArrayPortions: ", binaryStringArrayPortions, 
        "\ngetHostPortion(originalIpV4AddrAsBinaryStringArray.join(''): ", getHostPortion(originalIpV4AddrAsBinaryStringArray.join(""), 
        `\noriginalSubnetMaskAsBinaryStringArray.join("")).substring(neededBitsForSubnets.length):`, originalSubnetMaskAsBinaryStringArray.join("")).substring(neededBitsForSubnets.length),
//        "\ncalculateSubnetInfo: cidr25", calculateSubnetInfo("192.168.0.0/25"),
//        "\ncalculateSubnetInfo: ", calculateSubnetInfo("192.168.0.0/24"),
        "\n---");


/*
- calc how many additional bits you need for subnet
- loop that many times and do:
- calculateSubnetInfo(original iP, CIDR+i)
- take from that the broadcast ip, add 1 to it -> octet stuff will be the issue
- run calculateSubnetInfo again 

*/

    neededBitsForSubnets.length
    let ip = ipV4Addr.join(".")
    let cidr = +cIDRNumber + neededBitsForSubnets.length
    const resultList = []; //todo rename
    for (let i = 0; i <= neededBitsForSubnets.length; i++) {
        let tempResult = calculateSubnetInfo(`${ip}/${cidr}`);
        console.log(
            "\n-----",
            "\ninside i:", i, 
            "\ncidr: ", cidr,
            "\nip: ", ip,
            "\ntempresult:", tempResult,
            "\n convertOctStringToBinaryStringArray broadcast", convertOctStringToBinaryStringArray(tempResult.broadcast),
            "\n-----"
        );
        tempResult.number = i+1;
        resultList.push(tempResult)
        ip = tempResult.broadcast+1; // do binary addition, that "bleeds" over into the next octet block

    }

    console.log("\n----\nresultList:", resultList, "\n----")
    return resultList;

    let a = convertBinaryStringArrayToOctArray(
                splitBinaryStringToArray(
                    subnetMaskOfSubnet().join("")
                )
            );

   // console.log("subnet", a)
   // console.log("cidr", convertBinaryStringToCidr(subnetMaskOfSubnet().join("")))
    const cidrForSubnet = convertBinaryStringToCidr(subnetMaskOfSubnet().join(""))

    const subnetInfoObjectArray = [];
    subnetInfoObjectArray.push(calculateSubnetInfo(`${ipV4Addr.join(".")}/${cidrForSubnet}`));

    console.log(ipV4Addr, subnetInfoObjectArray)

    const expandSubnetBits = (subnetsNumber) => {
        const subnets = [];
        let ip = ipV4Addr.join(".");

        for (let i=1; i<=numberOfSubnets; i++) {

            // 2**bit-ids = how many networks will be available
            // 2**X = subnetsNumber
            // TODO: check if this can be solved by some logarithmic operation directly, instead of looping through each step
            // TODO: fix loop returning 1 bit too much
            
            let result = 0;
            let numberOfBitsNeeded = 0;
            let numberOfBitsArray = []
            for (numberOfBitsNeeded; result<subnetsNumber; numberOfBitsNeeded++) {
                result = 2**numberOfBitsNeeded;
                //console.log(result, `2**${numberOfBitsNeeded}`)
                numberOfBitsArray.push("1")
            }
            numberOfBitsArray.pop()
            // numberOfBitsArray -> how many bits we need to borrow from the host portion

            //console.log(result, `Number of Bits Needed ${numberOfBitsNeeded-1}`, "after", [...numberOfBitsArray])
            // join the originalSubnetMaskAsBinaryStringArray which is split in 4 blocks to a single string,
            // then split that string into an Array single "digits", which will let us use Array functions and change us specific indices
            let newSubnetMaskAsBinaryStringArray = originalSubnetMaskAsBinaryStringArray.join("").split("");

            // find first 0 in the subnetMask to determin where the host part starts
            let indexToStartChange = newSubnetMaskAsBinaryStringArray.findIndex(element => element === "0");
        //    console.log("subnetmask:", splitBinaryStringToArray(newSubnetMaskAsBinaryStringArray.join("")), "\n", indexToStartChange, numberOfBitsArray, numberOfBitsNeeded)
        //    console.log(newSubnetMaskAsBinaryStringArray.splice(indexToStartChange, numberOfBitsNeeded, numberOfBitsArray.join("")))
            // subnet portion = > indexToStartChange and numberOfBitsNeeded
            //let subnetPortion = 



            newSubnetMaskAsBinaryStringArray.splice(indexToStartChange, numberOfBitsNeeded, numberOfBitsArray.join(""))
            
            let neededCIDR = convertBinaryStringToCidr(newSubnetMaskAsBinaryStringArray.join(""));
        //    console.log("neededCIDR", neededCIDR)


            let networkPortionBinaryString = getNetworkPortion(originalIpV4AddrAsBinaryStringArray.join(""), originalSubnetMaskAsBinaryStringArray.join("")); 
            //TODO: find subnet part as well
            let subnetPortionBinaryString = getSubnetPortion(originalIpV4AddrAsBinaryStringArray.join(""), newSubnetMaskAsBinaryStringArray.join(""), numberOfBitsNeeded)
            let hostPortionBinaryString = getHostPortion(originalIpV4AddrAsBinaryStringArray.join(""), newSubnetMaskAsBinaryStringArray.join(""));
            let oi = `${networkPortionBinaryString}${subnetPortionBinaryString}${hostPortionBinaryString}`
            let subnetId = `${networkPortionBinaryString}${subnetPortionBinaryString}${Array.from(hostPortionBinaryString).map(bit => bit = 0).join("")}`
            let broadcastId = `${networkPortionBinaryString}${subnetPortionBinaryString}${Array.from(hostPortionBinaryString).map(bit => bit = 1)}`

            let moi = convertBinaryStringArrayToOctArray(splitBinaryStringToArray(oi));
            let noi = convertBinaryStringArrayToOctArray(splitBinaryStringToArray(subnetId))
        //    console.log("oi", oi, "moi", moi, "noi", noi, subnetId)
       //     console.log("subnetport", subnetPortionBinaryString)
        //    console.log(ip, "ipv4", originalIpV4AddrAsBinaryStringArray, "Networkport", networkPortionBinaryString, "hostport", hostPortionBinaryString)


        //    console.log("before", subnetIpV4CIDRString)
            let subnetIpV4CIDRString = `${ip}/${neededCIDR}`
        //    console.log("after", subnetIpV4CIDRString)


            let b = calculateSubnetInfo(subnetIpV4CIDRString);
            b.number = i;
            subnets.push(b)
            ip = (() => {
                let newIp = b.broadcast.split(".");
        //        console.log("newip", newIp)
                let newIpBinaryStringArray = convertOctStringToBinaryStringArray(newIp.join("."));
                let w = getHostPortion(newIpBinaryStringArray.join(""), newSubnetMaskAsBinaryStringArray.join(""));
                let e = getNetworkPortion(newIpBinaryStringArray.join(""), newSubnetMaskAsBinaryStringArray.join(""));
        //        console.log("new", newIpBinaryStringArray, "networ", e, "host", w)
                //TODO: Fix the renumbering below, it should take into consideration, when the number reaches 255 
                newIp[3] = (Number(newIp[3])+1); //since we are returning it as joined String later on, no need to turn to String here as well
                return newIp.join(".");
            })();
        //    console.log(ip)
        //    console.log("subnet", subnetIpV4CIDRString, b, ip)
            //console.log("inside", subnets);
        }

        return subnets;
    };

   // console.log(expandSubnetBits(2))

    console.log("\n", "******** end *****")

    return expandSubnetBits(numberOfSubnets);
}

export function calculateVariableSizedSubnets(ipV4CIDRString, numberOfUserHosts) {
    // scenario 4
    const subnets = [];
    // Your implementation should go here.
    return subnets;
}

// does this make anything easier or not?
const convert = {
    octStringToBinaryString: (octNum) => {
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
function convertOctStringToBinaryStringArray(octNum) {
    const octStringArray = octNum.split(".")

    let a = octStringArray.map( octBlock => {
        let accumulatorOctNum = octBlock;
        return OCT_CHART.map( octValue => {
        if ((accumulatorOctNum - octValue) >= 0) {
            accumulatorOctNum -= octValue;
            return 1;
        }
        else {
            return 0;
        }
        }).join("")


    })
    return a;
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

/*    return binaryStringArray.map( block => {
        return Array.from(block).reduce( (accumulator, bit, index) => {
            if (bit === "1") {
                accumulator += Number(OCT_CHART[index]);
            }
            return accumulator;
        }, 0)
    })
*/

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
  //  console.log("in getsubnet", ipV4AddrBinaryString, subnetMaskBinaryString, numberOfBitsNeeded, subnetHostPortionStartIndex, "slice", ipV4AddrBinaryString.slice(subnetHostPortionStartIndex, numberOfBitsNeeded) )
  //  console.log( ipV4AddrBinaryString[25], ipV4AddrBinaryString[25+numberOfBitsNeeded] )
    return ipV4AddrBinaryString.slice(subnetHostPortionStartIndex, subnetHostPortionStartIndex+numberOfBitsNeeded) // slice -> end index needs to start from 0;
}

function getHostPortion(ipV4AddrBinaryString, subnetMaskBinaryString) {
    const subnetHostPortionStartIndex = subnetMaskBinaryString.indexOf(0);
    return ipV4AddrBinaryString.slice(subnetHostPortionStartIndex);
}

function broadcastBinaryArray(ipBinaryArray, subnetBinaryArray) {
    return subnetBinaryArray.map( (subnetBlock, index) => {
        // if 255
        if (subnetBlock === "11111111") {
            return ipBinaryArray[index]
        }
        if (subnetBlock === "00000000") {
            return "11111111"
        }
        //else TODO: change this to calculate in binary form
        let o = convertBinaryStringArrayToOctArray([subnetBlock]);
        let c = convertBinaryStringArrayToOctArray([ipBinaryArray[index]])
        let multiplier = MAX_BLOCK_VALUE - o;
        let sum = 0;
        for (let i=1; sum<=c; i++) {
            sum += multiplier;
        } // change to while -> we don't use the "i" variable
        //console.log(o, c, "multi:", multiplier, "sum:", sum, convertOctStringToBinaryStringArray(sum.toString()))
        //console.log(convertOctStringToBinaryStringArray(sum.toString()))
        return convertOctStringToBinaryStringArray(sum.toString())[0]
    })
}

function calculateNeededBitsForSubnets(numberOfRequiredSubnets) {
        // 2**bit-ids = how many networks will be available
        // 2**X = subnetsNumber
        // Math.log2(number)
        //since bits are either 0 or 1 -> power of of 2
        // calculates -> 2**x = numba
        // then ceils it since we need to have "full" numbers

    const numberOfBitsNeeded = Math.ceil(Math.log2(numberOfRequiredSubnets));
    // return an empty string padded with "1" for the required length
    return "".padStart(numberOfBitsNeeded, "1")

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

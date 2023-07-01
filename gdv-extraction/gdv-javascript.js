import {Client} from "./models";
import { readFileSync } from "fs";

export class GDVExtractor {
    constructor(gdvFilePath) {
        const fileContent = readFileSync(gdvFilePath, 'latin1');
        this.gdvFile = fileContent.split(/\r?\n/);
        this.policies = [];
    }

    getPolicyNumbers() {
        // Scenario 1: Get all policy numbers
        //console.log(JSON.stringify(this.gdvFile))
        const policyNumbers = new Set();
        const result = this.gdvFile.reduce( (results, currentLine) => {

            const currentSatzart = currentLine.slice(0,4);

            if (["0001", "9999"].includes(currentSatzart) === true) {
                return policyNumbers
            };

            const currentPolicyNumber = currentLine.slice(13,30).trim();
            if (currentPolicyNumber !== "") {
                policyNumbers.add(currentPolicyNumber);
            }

            return policyNumbers

        }, policyNumbers);

        //test expect an Array, so turn the Set into an array
        return Array.from(result);
    }

    getClients() {
        // Scenario 2: Get all clients

        
        const byClientId = {}
        const groupyByClientId = this.gdvFile.reduce( (accum, currLine, currIndex) => {
            if (currLine.slice(0,0+4) != "0100") { return accum };
            //if (currLine.slice(255,255+1) != "2") { return accum };

            const policyNumber = currLine.slice(13, 13+17).trim();

            if (currLine.slice(255,255+1) != "2") {

                if (accum[policyNumber] === undefined) {
                    accum[policyNumber] = [];
                }
                accum[policyNumber].push(currLine)

            } else {                
                const clientNumber =  currLine.slice(42,42+17).trim()
                if (byClientId[clientNumber] === undefined) {
                    byClientId[clientNumber] = {};
                }
                accum[policyNumber].push(currLine)
                byClientId[clientNumber][policyNumber] = accum[policyNumber];
                
            }

            return accum

        }, {})

        //console.log(groupyByClientId)
        console.log(byClientId)
/*

        const grouped =  this.gdvFile.reduce( (accum, line) => {
            if (line.slice(0,0+4) != "0100") {
                return accum;
            }
            const policyNumber = line.slice(13, 13+17).trim();
            const currentPage = line.slice(255,255+1);
            if (accum[policyNumber] === undefined) {
                accum[policyNumber] = [];
            }

            accum[policyNumber].push(line)

            return accum

        }, {});
        //console.log(grouped)
*/
        const extractedArr = []
        for (const clientId in byClientId) {
            const currClient = byClientId[clientId];
            //console.log(Object.keys(currClient)[0])

            const result2 = currClient[Object.keys(currClient)[0]].reduce( (accum, line, currIndex) => {
                //TODO refactor, DRY 
                if (currIndex == 0) {
                    accum.firstName = line.slice(43, 43+30).trim(),
                    accum.secondName = line.slice(73, 73+30).trim(),
                    accum.thirdName = line.slice(103,103+30).trim(),
                    accum.address = line.slice(187,187+30).trim()
                    accum.postalCode = line.slice(156,156+6).trim()
                    accum.city = line.slice(162,162+25).trim()
                    accum.country = line.slice(153,153+3).trim()
                    accum.birthDate = this.#gdvDateToJsDate(line.slice(225,225+8).trim())
                }

                if (currIndex == 1) {
                    accum.clientNumber =  line.slice(42,42+17).trim()
                }

                return accum

            }, {})
            extractedArr.push(new Client(...Object.values(result2)))
            console.log("res", result2)
            

        }

        return extractedArr
/*        for (const policy in grouped) {
            //console.log(grouped[policy])
            const currentPolicy = grouped[policy];

            const result = currentPolicy.reduce( (accum, line, currIndex) => {
                //TODO refactor, DRY 
                if (currIndex == 0) {
                    accum.firstName = line.slice(43, 43+30).trim(),
                    accum.secondName = line.slice(73, 73+30).trim(),
                    accum.thirdName = line.slice(103,103+30).trim(),
                    accum.address = line.slice(187,187+30).trim()
                    accum.postalCode = line.slice(156,156+6).trim()
                    accum.city = line.slice(162,162+25).trim()
                    accum.country = line.slice(153,153+3).trim()
                    accum.birthDate = this.#gdvDateToJsDate(line.slice(225,225+8).trim())
                }

                if (currIndex == 1) {
                    accum.clientNumber =  line.slice(42,42+17).trim()
                }

                return accum

            }, {})

            extractedArr.push(result);
    
        }


        const cli = new Client(...Object.values(result))
        extractedArr.push(cli);
        console.log(extractedArr)



        return extractedArr;*/
    }

    #gdvDateToJsDate(gdvDate) {

        const dateparts = [
            gdvDate.slice(4, 4+4),
            gdvDate.slice(2, 2+2),
            gdvDate.slice(0, 0+2)
        ]
        const date = (new Date(dateparts.join("-")))    
        return date
    }

    getSatzart() {

    }

}
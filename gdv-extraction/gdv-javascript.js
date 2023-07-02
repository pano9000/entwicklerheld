import {Client} from "./models";
import { readFileSync } from "fs";

export class GDVExtractor {

    #satzarten;
    #dataPositions;
    constructor(gdvFilePath) {
        const fileContent = readFileSync(gdvFilePath, 'latin1');
        this.gdvFile = fileContent.split(/\r?\n/);
        this.policies = [];

        // usually this should be a full list of Satzarten, but since this task only cares about "0100", 
        // let's concentrate on just a select few for demonstration purposes
        this.#satzarten = ["0001", "0100", "9999"];

        /**
         * {[StartPos, Lenght]}
         */
        this.#dataPositions = {
            satzArt: [0, 4],
            policyNumber: [13, 17],
            satzNumber: [255, 1],
            clientNumber: [42, 17],
            clientNameA: [43, 30],
            clientNameB: [73, 30],
            clientNameC: [103, 30],
            clientAddress: [187, 30],
            clientPostalCode: [156, 6],
            clientCity: [162, 25],
            clientCountry: [153, 3],
            clientBirthdate: [225, 8]
        }
    }

    getPolicyNumbers() {
        const partnerDataLines = this.#getLinesBySatzart("0100");
        const result = partnerDataLines.reduce( (policyNumbers, currentLine) => {

            const currentPolicyNumber = this.#getFromLine(currentLine, "policyNumber");
            policyNumbers.add(currentPolicyNumber);
            return policyNumbers

        }, new Set());

        //test expect an Array, so turn the Set into an array
        return Array.from(result);
    }

    getClients() {
        
        const byClientId = this.#getPolicyLinesGroupedByClientId();

        const clients = []
        for (const clientId in byClientId) {
            const currentClient = byClientId[clientId];
            const currentClientPolicyNumbers = Object.keys(currentClient);
            const clientData = currentClient[currentClientPolicyNumbers[0]].reduce( (accum, currentLine, currIndex) => {

                if (currIndex == 0) {
                    accum.firstName     = this.#getFromLine(currentLine, "clientNameA");
                    accum.secondName    = this.#getFromLine(currentLine, "clientNameB");
                    accum.thirdName     = this.#getFromLine(currentLine, "clientNameC");
                    accum.address       = this.#getFromLine(currentLine, "clientAddress");
                    accum.postalCode    = this.#getFromLine(currentLine, "clientPostalCode");
                    accum.city          = this.#getFromLine(currentLine, "clientCity");
                    accum.country       = this.#getFromLine(currentLine, "clientCountry");
                    accum.birthDate     = this.#gdvDateToJsDate(this.#getFromLine(currentLine, "clientBirthdate"));
                }

                if (currIndex == 1) {
                    accum.clientNumber =  this.#getFromLine(currentLine, "clientNumber");
                }

                return accum

            }, {})

            // personally I would edit the Client class to accept an object instead of each parameter as string
            // but since this is not possible in the environment here
            // using spread operator, because we are too lazy to write out the arguments manually
            clients.push(new Client(...Object.values(clientData)))
        }

        return clients
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

    #getLinesBySatzart(satzart) {
        if (this.#satzarten.includes(satzart) === false) {
            throw new Error(`Invalid Satzart provided: '${satzart}'`);
        }
        const satzartPosition = [0, 4]
        return this.gdvFile.filter( line => line.slice(...satzartPosition) === satzart)
    }

    #getDataPosition(position) {
        if (this.#dataPositions[position] === undefined) {
            throw new Error(`Invalid Position provided: '${position}`);
        }
        return this.#dataPositions[position]
    }

    #sliceLine(line, dataPosition) {
        return line.slice(dataPosition[0], dataPosition[0] + dataPosition[1]).trim();
    }

    #getFromLine(line, position) {
        const dataPosition = this.#getDataPosition(position);
        return this.#sliceLine(line, dataPosition);
    }

    #getPolicyLinesGroupedByClientId() {

        const partnerDataLines = this.#getLinesBySatzart("0100");

        const byClientId = {}
        const groupyByClientId = partnerDataLines.reduce( (accum, currentLine, currIndex) => {
            if (this.#getFromLine(currentLine, "satzArt") != "0100") { return accum };

            const policyNumber = this.#getFromLine(currentLine, "policyNumber");

            if (this.#getFromLine(currentLine, "satzNumber") != "2") {

                if (accum[policyNumber] === undefined) {
                    accum[policyNumber] = [];
                }
                accum[policyNumber].push(currentLine)

            } else {                
                const clientNumber =  this.#getFromLine(currentLine, "clientNumber");
                if (byClientId[clientNumber] === undefined) {
                    byClientId[clientNumber] = {};
                }
                accum[policyNumber].push(currentLine)
                byClientId[clientNumber][policyNumber] = accum[policyNumber];
                
            }

            return accum

        }, {})

        return byClientId
    }


}
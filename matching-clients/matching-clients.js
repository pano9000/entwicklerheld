import { ClientDatabase } from "./client_database"

export class ClientService {
    static addClient(client) {
        const clientSearchResultByClientId = ClientDatabase.findClients(undefined, undefined, undefined, undefined, undefined, undefined, undefined, client.clientId)

        /**
         * Takes a clientId and updates the entry in the ClientDatabase, if necessary handling "otherIds"
         * @param {string} clientIdToUpdate - string of the clientId that will be updated
         */
        const updateExistingClient = (clientIdToUpdate) => {
            const indexOfIdToUpdate = ClientDatabase.getAllClients().findIndex( clientElement => clientElement.clientId === clientIdToUpdate);
            const clientRefToUpdate = ClientDatabase.getAllClients()[indexOfIdToUpdate];

            for (const property in clientRefToUpdate) {
                if (clientIdToUpdate !== client.clientId) {
                    if (property !== "clientId") {
                        if (property === "otherIds") {
                            clientRefToUpdate[property].push(client.clientId)
                        } else {
                            clientRefToUpdate[property] = client[property]
                        }
                    }

                } else {
                    clientRefToUpdate[property] = client[property]
                }
            }
        }


        /** 
         * Create a new ClientCheckResult object, that checks if the provided data 
         * can be matched to a known client in the database. If >= 2 of the checks match,
         * we are assuming the client is already present in the database.
         * 
         * @param {array} clientSearchResultsArray - an array of client objects resulting
         */
        const getClientCheckResult  = (clientSearchResults) => {

            class ClientCheckResult {
                constructor(clientSearchResults) {
                    this.results = clientSearchResults;
                    this.clientId = this.results.map(clientArray => (clientArray === undefined) ? undefined : clientArray.clientId).find(clientId => clientId !== undefined);
                    this.passedMap = this.results.map(clientArray => (clientArray === undefined) ? 0 : 1);
                    this.passedQty = this.passedMap.reduce((accumVal, curVal) => accumVal + curVal, 0);
                    this.passedBool = (this.passedQty >= 2) ? true : false;
                }
            }

            return new ClientCheckResult(clientSearchResults);
        }

        /**
         * Create a "cleansed" client object copy, to make it easier to match against the database
         * @param {object} clientObject - a client object
         */
        const createCleansedClient = (clientObject) => {
            //set up some regexp to be reused
            const regexStripSpace = /\s|[-\._\/]/g
            const regexMatchStreet = /(Strasse)$|(Straße)$|(Str?\.)$/i
            const regexStripBracketContent = /\(.*\)$/g
            const regexStripDoubleNames = /(-| ).*$/
            
            const cleansedClientObject = {}
            for (let property in clientObject) {
                if (property !== "otherIds") {
                    cleansedClientObject[property] = clientObject[property]

                    switch (property) {
                        case "phoneNumber":
                            cleansedClientObject[property] = cleansedClientObject[property]
                                                            .replace(/^(\+49)/,"0");
                            break;
                        case "street":
                            cleansedClientObject[property] = cleansedClientObject[property]
                                                            .replace(regexMatchStreet, "str");
                            break;
                        case "firstName":
                            cleansedClientObject[property] = cleansedClientObject[property]
                                                            .replace(regexStripDoubleNames, "");
                            break;
                    }

                    cleansedClientObject[property] = cleansedClientObject[property]
                                                    .toLowerCase()
                                                    .replace(regexStripSpace, "")
                                                    .replace(regexStripBracketContent, "");
                }
            }

            return cleansedClientObject
        }

        /**
         * creates a "cleansed" copy of the clientdatabase, that makes it easier to do all of these softmatching tasks, if necessary
         * @returns {Array.<ClientObject>} - array of client objects
         */
        const getCleansedDatabaseClients = () => ClientDatabase.getAllClients().map(dbClient => createCleansedClient(dbClient))
        // initialize as empty "global" array -> to run the processing only once, when required
        // we don't need to run/save the getCleansedDatabaseClients() for every call, only for the ones requiring softMatching/typoMatching
        let cleansedDatabase = []; 
        

        const simpleClientMatching = () => {
            const clientSearchResultsArray = [
                // by Full Name
                ClientDatabase.findClients(client.firstName.trim(), client.lastName.trim(), undefined, undefined, undefined, undefined, undefined, undefined)[0],
                // by Phone Number
                ClientDatabase.findClients(undefined, undefined, client.phoneNumber.replace(/\s|\//, ""), undefined, undefined, undefined, undefined, undefined)[0],
                // by Address
                ClientDatabase.findClients(undefined, undefined, undefined, client.street.replace(/\s|\//, ""), client.houseNumber.trim(), client.postcode.trim(), client.city.trim(), undefined)[0]
            ];

            return getClientCheckResult(clientSearchResultsArray);
        }

        const softClientMatching = () => {
            const cleansedClient = createCleansedClient(client);
            cleansedDatabase = getCleansedDatabaseClients();

            // prepare the array for 
            const byName = cleansedDatabase.filter(dbClient => dbClient.firstName === cleansedClient.firstName && dbClient.lastName === cleansedClient.lastName)
            const byPhone = cleansedDatabase.filter(dbClient => dbClient.phoneNumber === cleansedClient.phoneNumber)
            const byAddress = cleansedDatabase.filter(dbClient => {
                if (dbClient.street === cleansedClient.street &&
                    dbClient.houseNumber === cleansedClient.houseNumber &&
                    dbClient.postcode === cleansedClient.postcode) {
                        return true;
                    }
                })

            const clientSearchResultsArray = [byName[0], byPhone[0], byAddress[0]]

            return getClientCheckResult(clientSearchResultsArray);
        }

        /**
         * Use Levenshtein Distance algorithm to check for simple typo in either the name or the address:
         * If the distance is 2, it means there likely is just a letter switcheroo in the name
         * @param {object} client - client object
         * @param {string} mode - what to check for: "name" or "address"
         * @returns {string|undefined} clientId - matched clientId
         */
        const typoClientMatching = ( clientObject, mode ) => {

            /**
             * instead of reinventing the wheel, use the levenshtein function implementation from here:
             * - https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#JavaScript / https://gist.github.com/andrei-m/982927
             * - usually would import this as separate module to keep things clean, 
             * but since this is not possible on this platform, let's paste it in here
             */
            const getLevenshteinDistance = (a, b) => {
                if (a.length === 0) return b.length; 
                if (b.length === 0) return a.length;

                const matrix = [];

                // increment along the first column of each row
                let i;
                for (i = 0; i <= b.length; i++) {
                    matrix[i] = [i];
                }

                // increment each column in the first row
                let j;
                for (j = 0; j <= a.length; j++) {
                    matrix[0][j] = j;
                }

                // Fill in the rest of the matrix
                for (i = 1; i <= b.length; i++) {
                    for (j = 1; j <= a.length; j++) {
                        if (b.charAt(i-1) == a.charAt(j-1)) {
                            matrix[i][j] = matrix[i-1][j-1];
                        } else {
                            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                                    Math.min(matrix[i][j-1] + 1, // insertion
                                                            matrix[i-1][j] + 1)); // deletion
                        }
                    }
                }

                return matrix[b.length][a.length];
            };

            const fullName = (object) => `${object.firstName}${object.lastName}`
            const modePropName = (mode === "address") ? "street" : "lastName"

            // using template literals not really necessary, but I feel it makes it easier to read distinguish/read the ternary operation inside the callback functions
            return cleansedDatabase
                    .filter(dbClient => dbClient[modePropName][0] === clientObject[modePropName][0])
                    .map(dbClient => [`${(modePropName === "address") ? dbClient[modePropName] : fullName(dbClient)}`, dbClient.clientId])
                    .filter(dbClient => getLevenshteinDistance(dbClient[0], `${(modePropName === "address") ? clientObject[modePropName] : fullName(clientObject)}` ) <= 2)
                    .find(dbClient => dbClient[1] === clientObject.clientId)[1]
        }


        if (clientSearchResultByClientId.length === 1) {
            const jsonClientSearchResult = JSON.stringify(clientSearchResultByClientId[0]);
            const jsonClient = JSON.stringify(client);

            if (jsonClientSearchResult !== jsonClient) {
                updateExistingClient(client.clientId);
                return true;
            }
        }

        if (clientSearchResultByClientId.length === 0) {


            const simpleClientMatchingCheckResult = simpleClientMatching();
            if (simpleClientMatchingCheckResult.passedBool === true) {
                updateExistingClient(simpleClientMatchingCheckResult.clientId);
                return true;
            }


            const softClientMatchingCheckResult = softClientMatching();
            if (softClientMatchingCheckResult.passedBool === true) {
                updateExistingClient(softClientMatchingCheckResult.clientId);
                return true;
            }
            
            if (softClientMatchingCheckResult.passedQty > 0) {
                const typoClientMatchingResult = (softClientMatchingCheckResult.passedMap[0] === 1) ? 
                                                typoClientMatching(softClientMatchingCheckResult.results[0], "address") :
                                                (softClientMatchingCheckResult.passedMap[2] === 1) ?
                                                typoClientMatching(softClientMatchingCheckResult.results[2], "name") : 
                                                undefined;

                if (typoClientMatchingResult !== undefined) {
                    updateExistingClient(typoClientMatchingResult);
                    return true;
                }
            }

            ClientDatabase.addClient(client);
            return true;
        }

    }
}
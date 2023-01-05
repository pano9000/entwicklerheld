// provided by the challenge, not my solution

export class ClientDatabase {
  _client_database = []

  static getAllClients() {
      return ClientDatabase._client_database;
  }

  static getClientByFirstName(firstName) {
      let result = []
      for (let client of ClientDatabase._client_database) {
          if (client.firstName === firstName) {
              result.push(client)
          }
      }

      return result
  }

  static getClientByLastName(lastName) {
      let result = []
      for (let client of ClientDatabase._client_database) {
          if (client.lastName === lastName) {
              result.push(client)
          }
      }

      return result
  }

  static findClients(firstName, lastName, phoneNumber, street, houseNumber, postcode, city, clientId) {
      let result = []
      for (let client of ClientDatabase._client_database) {
          if (firstName !== undefined && client.firstName != firstName) {
              continue
          }

          if (lastName !== undefined && client.lastName !== lastName) {
              continue
          }

          if (phoneNumber !== undefined && client.phoneNumber !== phoneNumber) {
              continue
          }

          if (street !== undefined && client.street !== street) {
              continue
          }

          if (houseNumber !== undefined && client.houseNumber !== houseNumber) {
              continue
          }

          if (postcode !== undefined && client.postcode !== postcode) {
              continue
          }

          if (city !== undefined && client.city !== city) {
              continue
          }

          if (clientId !== undefined && client.clientId != clientId) {
              continue
          }

          result.push(client)
      }

      return result
  }

  static addClient(client) {
      ClientDatabase._client_database.push(client)
  }

  static addClients(clients) {
      ClientDatabase._client_database.push(...clients)
  }


  static flushDatabase() {
      ClientDatabase._client_database = []
  }

}
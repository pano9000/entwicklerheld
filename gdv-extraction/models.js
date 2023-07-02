export class Client {
  /**
   *
   * @param firstName string
   * @param secondName string
   * @param thirdName  string
   * @param address string
   * @param postalCode string
   * @param city string
   * @param country string
   * @param birthDate Date
   * @param clientNumber string
   */
  constructor(firstName, secondName, thirdName, address, postalCode, city, country, birthDate, clientNumber) {
      this.firstName = firstName;
      this.secondName = secondName;
      this.thirdName = thirdName;
      this.address = address;
      this.postalCode = postalCode;
      this.city = city;
      this.country = country;
      this.birthDate = birthDate;
      this.clientNumber = clientNumber;
  }

  isEqual(other) {
      return JSON.stringify(this) === JSON.stringify(other);
  }

  toString() {
      if (this.birthDate) {
          return `Client{firstName=${this.firstName}, secondName=${this.secondName}, thirdName=${this.thirdName}, address=${this.address}, postalCode=${this.postalCode}, city=${this.city}, country=${this.country}, birthDate=${this.birthDate.toISOString()}, clientNumber=${this.clientNumber}}`;
      } else {
          return `Client{firstName=${this.firstName}, secondName=${this.secondName}, thirdName=${this.thirdName}, address=${this.address}, postalCode=${this.postalCode}, city=${this.city}, country=${this.country}, birthDate=null, clientNumber=${this.clientNumber}}`;
      }
  }
}

export class Police {
  constructor(policeNumber, client) {
      this.policeNumber = policeNumber;
      this.client = client;
  }

  toString() {
      return `Police{policeNumber=${this.policeNumber}, client=${this.client}}`;
  }

  equals(obj) {
      if (obj == null || this.constructor !== obj.constructor) {
          return false;
      }
      const other = obj;
      return this.policeNumber === other.policeNumber && this.client.isEqual(other.client);
  }
}

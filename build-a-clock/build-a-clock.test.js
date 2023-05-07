import { Clock } from "./build-a-clock.js";
import { expect } from "chai";

describe('Clock', () => {
  describe('Creating a new clock with an initial time', () => {
    it('Creation tests', () => {
      expect(new Clock(8).toString(), "Expected new Clock(8).toString() to return '08:00'").to.equal('08:00');
      expect(new Clock(11, 9).toString(), "Expected new Clock(11, 9).toString() to return '11:09'").to.equal('11:09');
      expect(new Clock(24, 0).toString(), "Expected new Clock(24, 0).toString() to return '00:00'").to.equal('00:00');
      expect(new Clock(25, 0).toString(), "Expected new Clock(25, 0).toString() to return '01:00'").to.equal('01:00');
      expect(new Clock(100, 0).toString(), "Expected new Clock(100, 0).toString() to return '04:00'").to.equal('04:00');
      expect(new Clock(1, 60).toString(), "Expected new Clock(1, 60).toString() to return '02:00'").to.equal('02:00');
      expect(new Clock(0, 160).toString(), "Expected new Clock(0, 160).toString() to return '02:40'").to.equal('02:40');
      expect(new Clock(0, 1723).toString(), "Expected new Clock(0, 1723).toString() to return '04:43'").to.equal('04:43');
      expect(new Clock(25, 160).toString(), "Expected new Clock(25, 160).toString() to return '03:40'").to.equal('03:40');
      expect(new Clock(201, 3001).toString(), "Expected new Clock(201, 3001).toString() to return '11:01'").to.equal('11:01');
      expect(new Clock(72, 8640).toString(), "Expected new Clock(72, 8640).toString() to return '00:00'").to.equal('00:00');
      expect(new Clock(-1, 15).toString(), "Expected new Clock(-1, 15).toString() to return '23:15'").to.equal('23:15');
      expect(new Clock(-25, 0).toString(), "Expected new Clock(-25, 0).toString() to return '23:00'").to.equal('23:00');
      expect(new Clock(-91, 0).toString(), "Expected new Clock(-91, 0).toString() to return '05:00'").to.equal('05:00');
      expect(new Clock(1, -40).toString(), "Expected new Clock(1, -40).toString() to return '00:20'").to.equal('00:20');
      expect(new Clock(1, -160).toString(), "Expected new Clock(1, -160).toString() to return '22:20'").to.equal('22:20');
      expect(new Clock(1, -4820).toString(), "Expected new Clock(1, -4820).toString() to return '16:40'").to.equal('16:40');
      expect(new Clock(2, -60).toString(), "Expected new Clock(2, -60).toString() to return '01:00'").to.equal('01:00');
      expect(new Clock(-25, -160).toString(), "Expected new Clock(-25, -160).toString() to return '20:20'").to.equal('20:20');
      expect(new Clock(-121, -5810).toString(), "Expected new Clock(-121, -5810).toString() to return '22:10'").to.equal('22:10');
    });
  });

  describe('Adding minutes', () => {
    it('add minutes', () => {
      expect(new Clock(10, 0).plus(3).toString()   , "Expected new Clock(10, 0).plus(3).toString() to return '10:03'").to.equal('10:03');
      expect(new Clock(6, 41).plus(0).toString()   , "Expected new Clock(6, 41).plus(0).toString() to return '06:41'").to.equal('06:41');
      expect(new Clock(0, 45).plus(40).toString()  , "Expected new Clock(0, 45).plus(40).toString() to return '01:25'").to.equal('01:25');
      expect(new Clock(10, 0).plus(61).toString()  , "Expected new Clock(10, 0).plus(61).toString() to return '11:01'").to.equal('11:01');
      expect(new Clock(0, 45).plus(160).toString() , "Expected new Clock(0, 45).plus(160).toString() to return '03:25'").to.equal('03:25');
      expect(new Clock(23, 59).plus(2).toString()  , "Expected new Clock(23, 59).plus(2).toString() to return '00:01'").to.equal('00:01');
      expect(new Clock(5, 32).plus(1500).toString(), "Expected new Clock(5, 32).plus(1500).toString() to return '06:32'").to.equal('06:32');
      expect(new Clock(1, 1).plus(3500).toString() , "Expected new Clock(1, 1).plus(3500).toString() to return '11:21'").to.equal('11:21');
    });
  });

  describe('Subtract minutes', () => {
    it('subtract minutes', () => {
      expect(new Clock(10, 3).minus(3).toString(),"Expected new Clock(10, 3).minus(3).toString() to return '10:00'").to.equal('10:00');
      expect(new Clock(10, 3).minus(30).toString(),"Expected new Clock(10, 3).minus(30).toString() to return '09:33'").to.equal('09:33');
      expect(new Clock(10, 3).minus(70).toString(),"Expected new Clock(10, 3).minus(70).toString() to return '08:53'").to.equal('08:53');
      expect(new Clock(0, 3).minus(4).toString(),"Expected new Clock(0, 3).minus(4).toString() to return '23:59'").to.equal('23:59');
      expect(new Clock(0, 0).minus(160).toString(),"Expected new Clock(0, 0).minus(160).toString() to return '21:20'").to.equal('21:20');
      expect(new Clock(6, 15).minus(160).toString(),"Expected new Clock(6, 15).minus(160).toString() to return '03:35'").to.equal('03:35');
      expect(new Clock(5, 32).minus(1500).toString(),"Expected new Clock(5, 32).minus(1500).toString() to return '04:32'").to.equal('04:32');
      expect(new Clock(2, 20).minus(3000).toString(),"Expected new Clock(2, 20).minus(3000).toString() to return '00:20'").to.equal('00:20');
    });
  });

  describe('Compare two clocks for equality', () => {
    it('Compare two clocks for equality', () => {
      expect(new Clock(15, 37).equals(new Clock(15, 37)), "Expected new Clock(15, 37).equals(new Clock(15, 37)) to return true").to.equal(true);
      expect(new Clock(15, 36).equals(new Clock(15, 37)), "Expected new Clock(15, 36).equals(new Clock(15, 37)) to return false").to.equal(false);
      expect(new Clock(14, 37).equals(new Clock(15, 37)), "Expected new Clock(14, 37).equals(new Clock(15, 37)) to return false").to.equal(false);
      expect(new Clock(10, 37).equals(new Clock(34, 37)), "Expected new Clock(10, 37).equals(new Clock(34, 37)) to return true").to.equal(true);
      expect(new Clock(3, 11).equals(new Clock(99, 11)), "Expected new Clock(3, 11).equals(new Clock(99, 11)) to return true").to.equal(true);
      expect(new Clock(22, 40).equals(new Clock(-2, 40)), "Expected new Clock(22, 40).equals(new Clock(-2, 40)) to return true").to.equal(true);
      expect(new Clock(17, 3).equals(new Clock(-31, 3)), "Expected new Clock(17, 3).equals(new Clock(-31, 3)) to return true").to.equal(true);
      expect(new Clock(13, 49).equals(new Clock(-83, 49)), "Expected new Clock(13, 49).equals(new Clock(-83, 49)) to return true").to.equal(true);
      expect(new Clock(0, 1).equals(new Clock(0, 1441)), "Expected new Clock(0, 1).equals(new Clock(0, 1441)) to return true").to.equal(true);
      expect(new Clock(2, 2).equals(new Clock(2, 4322)), "Expected new Clock(2, 2).equals(new Clock(2, 4322)) to return true").to.equal(true);
      expect(new Clock(2, 40).equals(new Clock(3, -20)), "Expected new Clock(2, 40).equals(new Clock(3, -20)) to return true").to.equal(true);
      expect(new Clock(4, 10).equals(new Clock(5, -1490)), "Expected new Clock(4, 10).equals(new Clock(5, -1490)) to return true").to.equal(true);
      expect(new Clock(6, 15).equals(new Clock(6, -4305)), "Expected new Clock(6, 15).equals(new Clock(6, -4305)) to return true").to.equal(true);
      expect(new Clock(7, 32).equals(new Clock(-12, -268)), "Expected new Clock(7, 32).equals(new Clock(-12, -268)) to return true").to.equal(true);
      expect(new Clock(18, 7).equals(new Clock(-54, -11513)), "Expected new Clock(18, 7).equals(new Clock(-54, -11513)) to return true").to.equal(true);
      expect(new Clock(24, 0).equals(new Clock(0, 0)), "Expected new Clock(24, 0).equals(new Clock(0, 0)) to return true").to.equal(true);
    });
  });
});
package de.entwicklerheld.sensorBytesJava;


public class SensorService {
    static public byte[] toBytes(SensorAction sensorAction) {

        byte[] byteArr = { (byte) 0xFF, (byte) 0x00 };

        switch(sensorAction) {
            case START:
                byteArr[1] = (byte) 0x01;
                break;
            case STOP:
                byteArr[1] = (byte) 0x02;
                break;
            case RESET:
                byteArr[1] = (byte) 0x03;
                break;
          }

        return byteArr;
    }

    static public MeasureValue fromBytes(byte[] bytes) {

        switch(bytes[1]) {

            case ((byte) 0x01):
                int tempValue = getIntFromBytesArray(bytes, 2, 1);
                return new Temperature(tempValue, Temperature.Scale.CELSIUS);

            case((byte) 0x02):

                if ((bytes[0] != (byte) 0x00) && (bytes[0] != (byte) 0x01)) {
                    throw new Error("Received unexpected first byte");
                }

                int payloadLength = (bytes[0] == (byte) 0x01) ? 4 : 2;

                int pressureValue = getIntFromBytesArray(bytes, 2, payloadLength);
                return new Pressure(pressureValue, Pressure.Scale.PASCAL);

            default:
                throw new Error("Received unexpected byte");
        }
    }


    static private Integer getIntFromBytesArray(byte[] bytes, int start, int payloadLength) {
        if (start + payloadLength > bytes.length) {
            throw new Error("The given start and length values are out of bound for the provided bytes array");
        }

        int startIn = bytes[start];
        for (int i = 1; i <= payloadLength - 1; i++) {
            startIn = ((startIn & 0xFF) << 8 | (bytes[start+i] & 0xFF));
        }
        return startIn;

    }
}
package de.entwicklerheld.sensorBytesJava;

import org.junit.*;


import static org.junit.Assert.*;


public class SensorServiceTest {
    @Test
    public void testToBytesScenario1() {
        // start
        byte[] bytes = SensorService.toBytes(SensorAction.START);
        assertNotNull("Bytes should not be null", bytes);
        byte[] expectedBytes = {(byte) 0xFF, 0x01};
        assertArrayEquals("for SensorAction.START we expect the return value {0xFF, 0x01}, but was " + byteArrayToString(bytes), expectedBytes, bytes);

        // stop
        byte[] bytes2 = SensorService.toBytes(SensorAction.STOP);
        assertNotNull("Bytes should not be null", bytes2);
        byte[] expectedBytes2 = {(byte) 0xFF, 0x02};
        assertArrayEquals("for SensorAction.STOP we expect the return value {0xFF, 0x02}, but was " + byteArrayToString(bytes2), expectedBytes2, bytes2);

        // reset
        byte[] bytes3 = SensorService.toBytes(SensorAction.RESET);
        assertNotNull("Bytes should not be null", bytes3);
        byte[] expectedBytes3 = {(byte) 0xFF, 0x03};
        assertArrayEquals("for SensorAction.START we expect the return value {0xFF, 0x01}, but was " + byteArrayToString(bytes3), expectedBytes3, bytes3);
    }

    @Test
    public void testFromBytesScenario2() {
        // Temperature 1 Byte
        byte[] bytes = {0x00, 0x01, 0x23};
        MeasureValue sensorData = SensorService.fromBytes(bytes);
        assertNotNull("SensorData should not be null", sensorData);
        assertEquals("0x00 0x01 should create an object of type Temperature", sensorData.getClass(), Temperature.class);
        assertEquals("0x23 should be 35 binary: (0010 0011), but was " + sensorData.getValue(), new Temperature(35, Temperature.Scale.CELSIUS), sensorData);

        // Temperature 1 Byte
        byte[] bytes2 = {0x00, 0x01, (byte) 0x81};
        MeasureValue sensorData2 = SensorService.fromBytes(bytes2);
        assertNotNull("SensorData should not be null", sensorData2);
        assertEquals("0x00 0x01 should create an object of type Temperature", sensorData2.getClass(), Temperature.class);
        assertEquals("0x81 should be -127 but was " + sensorData.getValue() + ", because the first bit shows that it is a negative number (signed integer). binary: (1111 1111 1111 1111 1111 1111 1000 0001)", new Temperature(-127, Temperature.Scale.CELSIUS), sensorData2);

        // Pressure 2 Byte
        byte[] bytes3 = {0x00, 0x02, (byte) 0x87, 0x65};
        MeasureValue sensorData3 = SensorService.fromBytes(bytes3);
        assertNotNull("SensorData should not be null", sensorData3);
        assertEquals("0x00 0x02 should create an object of type Pressure", sensorData3.getClass(), Pressure.class);
        assertEquals("{0x87, 0x65} should be 34661 but was " + sensorData3.getValue() + ". Pressure are unsigned integer. binary: (0000 ... 1000 0111 0110 0101)", new Pressure(34661, Pressure.Scale.PASCAL), sensorData3);

        // Pressure 4 Bytes
        byte[] bytes5 = {0x01, 0x02, 0x00, 0x00, (byte) 0xFC, 0x65};
        MeasureValue sensorData5 = SensorService.fromBytes(bytes5);
        assertNotNull("SensorData should not be null", sensorData5);
        assertEquals("0x01 0x02 should create an object of type Pressure", sensorData5.getClass(), Pressure.class);
        assertEquals("{0x00, 0x00, 0xFC, 0x65} should be 64613 but was " + sensorData5.getValue() + ". Temperature are unsigned integer. binary: (0000 ... 1111 1100 0110 0101)", new Pressure(64613, Pressure.Scale.PASCAL), sensorData5);
    }

    @Test
    public void testFromBytesRandom() {
        // Temperature 1 Byte
        byte[] bytes0 = {0x00, 0x01, 0x00};
        MeasureValue sensorData0 = SensorService.fromBytes(bytes0);
        assertNotNull("SensorData should not be null", sensorData0);
        assertEquals("0x00 0x01 should create an object of type Temperature", sensorData0.getClass(), Temperature.class);
        assertEquals("0x00 should be 0, binary: (0000 0000) but was " + sensorData0.getValue(), new Temperature(0, Temperature.Scale.CELSIUS), sensorData0);

        // Temperature 1 Byte
        byte[] bytes = {0x00, 0x01, 0x19};
        MeasureValue sensorData = SensorService.fromBytes(bytes);
        assertNotNull("SensorData should not be null", sensorData);
        assertEquals("0x00 0x01 should create an object of type Temperature", sensorData.getClass(), Temperature.class);
        assertEquals("0x19 should be 25 binary: (0001 1001) but was " + sensorData.getValue(), new Temperature(25, Temperature.Scale.CELSIUS), sensorData);

        // Temperature 1 Byte
        byte[] bytes1 = {0x00, 0x01, (byte) 0x92};
        MeasureValue sensorData1 = SensorService.fromBytes(bytes1);
        assertNotNull("SensorData should not be null", sensorData1);
        assertEquals("0x00 0x01 should create an object of type Temperature", sensorData1.getClass(), Temperature.class);
        assertEquals("0x92 should be -110 binary: (1111 1111 1111 1111 1111 1111 1001 0010), but was " + sensorData1.getValue(), new Temperature(-110, Temperature.Scale.CELSIUS), sensorData1);

        // temperature 1 Byte (negative)
        byte[] bytes2 = {0x00, 0x01, (byte) 0xFF};
        MeasureValue sensorData2 = SensorService.fromBytes(bytes2);
        assertNotNull("SensorData should not be null", sensorData2);
        assertEquals("0x00 0x01 should create an object of type Temperature", sensorData2.getClass(), Temperature.class);
        assertEquals("0x81 should be -1 binary: (1111 1111) but was " + sensorData2.getValue() + ". The sign bit 1 says that the value is negative and because in java we need 32 bit for an Integer the binary code would be (1111 1111 1111 1111 1111 1111 1111 1111)", new Temperature(-1, Temperature.Scale.CELSIUS), sensorData2);

        // Temperature 1 Bytes
        byte[] bytes3 = {0x00, 0x01, (byte) 0xF1};
        MeasureValue sensorData3 = SensorService.fromBytes(bytes3);
        assertNotNull("SensorData should not be null", sensorData3);
        assertEquals("0x00 0x01 should create an object of type Temperature", sensorData3.getClass(), Temperature.class);
        assertEquals("0xF1 should be -15 (but was " + sensorData3.getValue() + "), because the first bit shows that it is a negative number (signed integer). binary: (1111 1111 1111 1111 1111 1111 1111 0001)", new Temperature(-15, Temperature.Scale.CELSIUS), sensorData3);

        // Pressure 2 Byte
        byte[] bytes4 = {0x00, 0x02, 0x75, 0x65};
        MeasureValue sensorData4 = SensorService.fromBytes(bytes4);
        assertNotNull("SensorData should not be null", sensorData4);
        assertEquals("0x00 0x02 should create an object of type Pressure", sensorData4.getClass(), Pressure.class);
        assertEquals("0x75 0x65 should be 30053. binary: 0000... 0111 0101 0110 0101, but was " + sensorData4.getValue(), new Pressure(30053, Pressure.Scale.PASCAL), sensorData4);

        // Pressure 2 Byte
        byte[] bytes5 = {0x00, 0x02, 0x00, 0x00};
        MeasureValue sensorData5 = SensorService.fromBytes(bytes5);
        assertNotNull("SensorData should not be null", sensorData5);
        assertEquals("0x00 0x02 should create an object of type Pressure", sensorData5.getClass(), Pressure.class);
        assertEquals("0x00 0x00 should be 0. binary: 0000... 0000 0000 0000 0000, but was " + sensorData5.getValue(), new Pressure(0, Pressure.Scale.PASCAL), sensorData5);

        // Pressure 4 Bytes
        byte[] bytes6 = {0x01, 0x02, 0x00, 0x00, (byte) 0x87, 0x65};
        MeasureValue sensorData6 = SensorService.fromBytes(bytes6);
        assertNotNull("SensorData should not be null", sensorData6);
        assertEquals("0x01 0x02 should create an object of type Pressure", sensorData6.getClass(), Pressure.class);
        assertEquals("0x00 0x00 0x87 0x65 should be 34661. binary: 0000... 1000 0111 0110 0101, but was " + sensorData6.getValue(), new Pressure(34661, Pressure.Scale.PASCAL), sensorData6);
    }

    public String byteArrayToString(byte[] bytes) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("{");
        for (byte b : bytes) {
            // if last
            if (b == bytes[bytes.length - 1]) {
                stringBuilder.append(String.format("0x%02X", b));
                break;
            } else {
                stringBuilder.append(String.format("0x%02X, ", b));
            }
        }
        stringBuilder.append("}");
        return stringBuilder.toString();
    }

    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();
}
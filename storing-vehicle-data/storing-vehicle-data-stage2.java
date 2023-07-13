package de.entwicklerheld.sqlfinchallenge.challenge.stage2;

import de.entwicklerheld.sqlfinchallenge.challenge.IDatabaseProvider;

import java.sql.*;
import java.util.HashMap;

public class OptimizedDatabaseProvider extends DatabaseProvider implements IDatabaseProvider {

    //as there is no way to do BidiMap in standard Java, let's create two maps
    private static HashMap<Character, Integer> encodeCharToIntMap = new HashMap<Character, Integer>();
    private static HashMap<Integer, Character> encodeIntToCharMap = new HashMap<Integer, Character>();

    static {
        initEncodeMaps();

    }

    static private void initEncodeMaps() {
        // Also possible solution: encode values with Huffman

        // create 'custom ' character encoding map, with 0-9, and A-Z, minus I, O, Q - which are not used with VINs
        encodeCharToIntMap.put('0', 0);
        encodeCharToIntMap.put('1', 1);
        encodeCharToIntMap.put('2', 2);
        encodeCharToIntMap.put('3', 3);
        encodeCharToIntMap.put('4', 4);
        encodeCharToIntMap.put('5', 5);
        encodeCharToIntMap.put('6', 6);
        encodeCharToIntMap.put('7', 7);
        encodeCharToIntMap.put('8', 8);
        encodeCharToIntMap.put('9', 9);
        encodeCharToIntMap.put('Z', 10);
        encodeCharToIntMap.put('Y', 11);
        encodeCharToIntMap.put('X', 12);
        encodeCharToIntMap.put('W', 13);
        encodeCharToIntMap.put('V', 14);
        encodeCharToIntMap.put('U', 15);
        encodeCharToIntMap.put('T', 16);
        encodeCharToIntMap.put('S', 17);
        encodeCharToIntMap.put('R', 18);
        encodeCharToIntMap.put('P', 19);
        encodeCharToIntMap.put('N', 20);
        encodeCharToIntMap.put('M', 21);
        encodeCharToIntMap.put('L', 22);
        encodeCharToIntMap.put('K', 23);
        encodeCharToIntMap.put('J', 24);
        encodeCharToIntMap.put('H', 25);
        encodeCharToIntMap.put('G', 26);
        encodeCharToIntMap.put('F', 27);
        encodeCharToIntMap.put('E', 28);
        encodeCharToIntMap.put('D', 29);
        encodeCharToIntMap.put('C', 30);
        encodeCharToIntMap.put('B', 31);
        encodeCharToIntMap.put('A', 32);

        encodeIntToCharMap.put(0, '0');
        encodeIntToCharMap.put(1, '1');
        encodeIntToCharMap.put(2, '2');
        encodeIntToCharMap.put(3, '3');
        encodeIntToCharMap.put(4, '4');
        encodeIntToCharMap.put(5, '5');
        encodeIntToCharMap.put(6, '6');
        encodeIntToCharMap.put(7, '7');
        encodeIntToCharMap.put(8, '8');
        encodeIntToCharMap.put(9, '9');
        encodeIntToCharMap.put(10, 'Z');
        encodeIntToCharMap.put(11, 'Y');
        encodeIntToCharMap.put(12, 'X');
        encodeIntToCharMap.put(13, 'W');
        encodeIntToCharMap.put(14, 'V');
        encodeIntToCharMap.put(15, 'U');
        encodeIntToCharMap.put(16, 'T');
        encodeIntToCharMap.put(17, 'S');
        encodeIntToCharMap.put(18, 'R');
        encodeIntToCharMap.put(19, 'P');
        encodeIntToCharMap.put(20, 'N');
        encodeIntToCharMap.put(21, 'M');
        encodeIntToCharMap.put(22, 'L');
        encodeIntToCharMap.put(23, 'K');
        encodeIntToCharMap.put(24, 'J');
        encodeIntToCharMap.put(25, 'H');
        encodeIntToCharMap.put(26, 'G');
        encodeIntToCharMap.put(27, 'F');
        encodeIntToCharMap.put(28, 'E');
        encodeIntToCharMap.put(29, 'D');
        encodeIntToCharMap.put(30, 'C');
        encodeIntToCharMap.put(31, 'B');
        encodeIntToCharMap.put(32, 'A');

    }

    @Override
    public void createVINTable(Connection connection) throws SQLException {

        Statement statement = connection.createStatement();
        statement.execute(
                "CREATE TABLE IF NOT EXISTS vindata (\n" +
                    " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n" +
                    " wmi_code INTEGER NOT NULL,\n" +
                    " vds_code INTEGER NOT NULL,\n" +
                    " vis_code INTEGER NOT NULL, \n" +
                    " data BLOB NOT NULL \n" +
                ");"
        );

    }

    @Override
    public void insertVINData(Connection connection, String vin, byte[] data) throws SQLException {

        //before inserting, in production: validate that VIN is valid, as done in Stage 1 of the challenge

        try {
 
            String sql_ins_vin = "INSERT OR IGNORE INTO vindata (id, wmi_code, vds_code, vis_code, data) VALUES(NULL, ?, ?, ?, ?);";
           
            PreparedStatement stmt_ins_vin = connection.prepareStatement(sql_ins_vin);

            String[] VINparts = splitVIN(vin.toUpperCase());
            stmt_ins_vin.setLong(1, encodeString(VINparts[0]));
            stmt_ins_vin.setLong(2, encodeString(VINparts[1]));
            stmt_ins_vin.setLong(3, encodeString(VINparts[2]));
            stmt_ins_vin.setBytes(4, data);

            stmt_ins_vin.execute();

        }
        catch(SQLException err) {
            connection.rollback();
            throw err;
        }


    }

    @Override
    public byte[] getVINData(Connection connection, String vin) throws SQLException {

        try {
            
            String sql = "SELECT data FROM vindata WHERE wmi_code = ? AND vds_code = ? AND vis_code = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            
            String[] VINparts = splitVIN(vin.toUpperCase());
            statement.setLong(1, encodeString(VINparts[0]));
            statement.setLong(2, encodeString(VINparts[1]));
            statement.setLong(3, encodeString(VINparts[2]));            

            ResultSet resultSet = statement.executeQuery();
            return resultSet.getBytes(1);

        }
        catch (SQLException err) {
            //production would use some sort of error handler here
            System.err.println(err);
            throw err;
        }


    }


    // Split the VIN Into its three parts WMI, VDS and VIS
    private String[] splitVIN(String vin) {
        String[] result = {vin.substring(0,3), vin.substring(3,9), vin.substring(9)};
        return result;
    }

    private long encodeString(String str) {

        int mapSize = encodeIntToCharMap.size();
        long result = 0;
        int i = 0;
        for (char character : str.toCharArray()) {
            result += encodeCharToIntMap.get(character) * (Math.pow(mapSize, str.length() - 1 - i));
            i += 1;
        }

        return result;

    }

    //unused here for the challenge, but this would be required, e.g. to get back a "readable" VIN from the DB
    private String decodeLong(long encNumber, int strSize) {
        int mapSize = encodeIntToCharMap.size();

        long remainder = encNumber;
        String str = "";

        for (int i = strSize-1; i>=0; i--) {
            int encValue = Double.valueOf(Math.floor(remainder / Math.pow(mapSize,i))).intValue();
            remainder = Double.valueOf(remainder - encValue * Math.pow(mapSize, i)).longValue();
            str += encodeIntToCharMap.get(encValue);
        }

        return str;
    }

}

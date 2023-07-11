package de.entwicklerheld.sqlfinchallenge.challenge.stage1;

import de.entwicklerheld.sqlfinchallenge.challenge.IDatabaseProvider;

import java.io.File;
import java.sql.*;
import java.util.regex.Pattern;

class DatabaseProvider implements IDatabaseProvider {

    @Override
    public Connection createDatabase(File databaseFile) throws SQLException {
        Connection connection = DriverManager.getConnection("jdbc:sqlite:" + databaseFile);
        return connection;
    }

    @Override
    public void createVINTable(Connection connection) throws SQLException {

        try {
            Statement statement = connection.createStatement();
            statement.execute("CREATE TABLE IF NOT EXISTS vindata (id INTEGER PRIMARY KEY, vin TEXT not NULL, data BLOB);");
        }
        catch (SQLException err) {
            //production would use some sort of error handler here
            System.err.println(err);
            throw err;
        }
    }

    @Override
    public void insertVINData(Connection connection, String vin, byte[] data) throws SQLException {

        String upperCasedVIN = vin.toUpperCase();
        if (!isValidVIN(upperCasedVIN)) {
            throw new RuntimeException("The given vin " + upperCasedVIN + " is invalid");
        }

        try {
            String sql = "INSERT INTO vindata (vin, data) VALUES (?,?);";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setString(1, upperCasedVIN);
            statement.setBytes(2, data);
            statement.execute();
        }
        catch (SQLException err) {
            //production would use some sort of error handler here
            System.err.println(err);
            throw err;
        }

    }

    @Override
    public byte[] getVINData(Connection connection, String vin) throws SQLException {

        try {
            String sql = "SELECT data FROM vindata WHERE vin = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setString(1, vin);
            //check for empty query necessary?
            ResultSet resultSet = statement.executeQuery();
            return resultSet.getBytes(1);

        }
        catch (SQLException err) {
            //production would use some sort of error handler here
            System.err.println(err);
            throw err;
        }
    }

    private Boolean isValidVIN(String vin) {
        if (vin.length() != 17) return false;
        return Pattern.matches("^[0-9A-HJ-NPR-Z]{17}$", vin);
    }
}
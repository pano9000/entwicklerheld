package de.entwicklerheld.sqlfinchallenge.challenge.stage1;

import de.entwicklerheld.sqlfinchallenge.challenge.IDatabaseProvider;

import java.io.File;
import java.sql.*;

class DatabaseProvider implements IDatabaseProvider {

    @Override
    public Connection createDatabase(File databaseFile) throws SQLException {
        throw new RuntimeException("Not implemented yet.");
    }

    @Override
    public void createVINTable(Connection connection) throws SQLException {
        throw new RuntimeException("Not implemented yet.");
    }

    @Override
    public void insertVINData(Connection connection, String vin, byte[] data) throws SQLException {
        throw new RuntimeException("Not implemented yet.");
    }

    @Override
    public byte[] getVINData(Connection connection, String vin) throws SQLException {
        throw new RuntimeException("Not implemented yet.");
    }
}
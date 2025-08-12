package de.entwicklerheld.bulpSwitcher;

public class TestData {
    final int n;
    final BulbResult expected;

    public TestData(int n, BulbResult expected) {
        this.n = n;
        this.expected = expected;
    }

    public static TestData[] testData = new TestData[] {
            new TestData(3, new BulbResult("100", 1)),
            new TestData(0, new BulbResult("", 0)),
            new TestData(5, new BulbResult("10010", 2)),
            new TestData(6, new BulbResult("100100", 2)),
            new TestData(1, new BulbResult("1", 1)),
            new TestData(10, new BulbResult("1001000010", 3)),
            new TestData(8, new BulbResult("10010000", 2)),
            new TestData(4, new BulbResult("1001", 2)),
            new TestData(16, new BulbResult("1001000010000001", 4)),
            new TestData(13, new BulbResult("1001000010000", 3)),
    };
}

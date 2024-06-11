package de.entwicklerheld.betterplace.challenge.stage2;

public class ServiceTest {

    @Stage1.Test
    public void testTestExecution() {
        Stage1.Assert.assertEquals(4, Stage2.Service.add(1, 1, 2), "Addition is not working properly");
    }

    @Stage1.Test
    public void testTestExecution_withAssertionError() {
        Stage1.Assert.assertEquals(4, Stage2.Service.add(1, 2), "Addition is not working properly");
    }

    @Stage1.Test
    public void testTestExecution_withException() {
        Stage2.Service.add();
    }

    @Stage1.Test(ignore = true)
    public void testTestExecution_withIgnore() {
        Stage1.Assert.fail("This test method should be ignored.");
    }

}

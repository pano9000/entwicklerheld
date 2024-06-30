package de.entwicklerheld.analyse_the_plant.stage1;

import de.entwicklerheld.analyse_the_plant.EntwicklerHeldTestWatcher;
import de.entwicklerheld.analyse_the_plant.plant.*;
import org.junit.Rule;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class Stage1Tests {

    //test data
    //example with 3 jobs
    private Job job1 = new Job("job1", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 2)));
    private Job job2 = new Job("job2", Arrays.asList(new Task(WorkCenter.A, 1), new Task(WorkCenter.B, 4)));
    private Job job3 = new Job("job3", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 1)));

    //example with 4 jobs
    private Job job4 = new Job("job4", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 2)));
    private Job job5 = new Job("job5", Arrays.asList(new Task(WorkCenter.A, 8), new Task(WorkCenter.B, 3)));
    private Job job6 = new Job("job6", Arrays.asList(new Task(WorkCenter.A, 1), new Task(WorkCenter.B, 4)));
    private Job job7 = new Job("job7", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 5)));

    //example with 5 jobs
    private Job job8 = new Job("job8", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 2)));
    private Job job9 = new Job("job9", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 6)));
    private Job job10 = new Job("job10", Arrays.asList(new Task(WorkCenter.A, 8), new Task(WorkCenter.B, 4)));
    private Job job11 = new Job("job11", Arrays.asList(new Task(WorkCenter.A, 10), new Task(WorkCenter.B, 7)));
    private Job job12 = new Job("job12", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 12)));

    //example with 6 jobs
    private Job job13 = new Job("job13", Arrays.asList(new Task(WorkCenter.A, 14), new Task(WorkCenter.B, 6)));
    private Job job14 = new Job("job14", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 8)));
    private Job job15 = new Job("job15", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 11)));
    private Job job16 = new Job("job16", Arrays.asList(new Task(WorkCenter.A, 6), new Task(WorkCenter.B, 6)));
    private Job job17 = new Job("job17", Arrays.asList(new Task(WorkCenter.A, 9), new Task(WorkCenter.B, 7)));
    private Job job18 = new Job("job18", Arrays.asList(new Task(WorkCenter.A, 4), new Task(WorkCenter.B, 11)));

    //example with 7 jobs
    private Job job19 = new Job("job19", Arrays.asList(new Task(WorkCenter.A,5), new Task(WorkCenter.B,4)));
    private Job job20 = new Job("job20", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 4)));
    private Job job21 = new Job("job21", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 5)));
    private Job job22 = new Job("job22", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 1)));
    private Job job23 = new Job("job23", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 2)));
    private Job job24 = new Job("job24", Arrays.asList(new Task(WorkCenter.A, 4), new Task(WorkCenter.B, 1)));
    private Job job25 = new Job("job25", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 3)));

    //example with 11 jobs
    private Job job26 = new Job("job26", Arrays.asList(new Task(WorkCenter.A, 4), new Task(WorkCenter.B, 5)));
    private Job job27 = new Job("job27", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 9)));
    private Job job28 = new Job("job28", Arrays.asList(new Task(WorkCenter.A, 9), new Task(WorkCenter.B, 2)));
    private Job job29 = new Job("job29", Arrays.asList(new Task(WorkCenter.A, 8), new Task(WorkCenter.B, 11)));
    private Job job30 = new Job("job30", Arrays.asList(new Task(WorkCenter.A, 11), new Task(WorkCenter.B, 4)));
    private Job job31 = new Job("job31", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 7)));
    private Job job32 = new Job("job32", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 12)));
    private Job job33 = new Job("job33", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 1)));
    private Job job34 = new Job("job34", Arrays.asList(new Task(WorkCenter.A, 9), new Task(WorkCenter.B, 2)));
    private Job job35 = new Job("job35", Arrays.asList(new Task(WorkCenter.A, 1), new Task(WorkCenter.B, 6)));
    private Job job36 = new Job("job36", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 10)));

    //3 jobs
    private Job job37 = new Job("job37", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 8)));
    private Job job38 = new Job("job38", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 8)));
    private Job job39 = new Job("job39", Arrays.asList(new Task(WorkCenter.A, 6), new Task(WorkCenter.B, 7)));

    //4 jobs
    private Job job40 = new Job("job40", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 4)));
    private Job job41 = new Job("job41", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 3)));
    private Job job42 = new Job("job42", Arrays.asList(new Task(WorkCenter.A, 1), new Task(WorkCenter.B, 7)));
    private Job job43 = new Job("job43", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 5)));

    //5 jobs
    private Job job44 = new Job("job44", Arrays.asList(new Task(WorkCenter.A, 6), new Task(WorkCenter.B, 3)));
    private Job job45 = new Job("job45", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 7)));
    private Job job46 = new Job("job46", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 2)));
    private Job job47 = new Job("job47", Arrays.asList(new Task(WorkCenter.A, 1), new Task(WorkCenter.B, 5)));
    private Job job48 = new Job("job48", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 6)));

    //5 jobs
    private Job job49 = new Job("job49", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 6)));
    private Job job50 = new Job("job50", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 4)));
    private Job job51 = new Job("job51", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 1)));
    private Job job52 = new Job("job52", Arrays.asList(new Task(WorkCenter.A, 6), new Task(WorkCenter.B, 2)));
    private Job job53 = new Job("job53", Arrays.asList(new Task(WorkCenter.A, 4), new Task(WorkCenter.B, 5)));

    //4 jobs
    private Job job54 = new Job("job54", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 4)));
    private Job job55 = new Job("job55", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 2)));
    private Job job56 = new Job("job56", Arrays.asList(new Task(WorkCenter.A, 8), new Task(WorkCenter.B, 1)));
    private Job job57 = new Job("job57", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 4)));

    //4 jobs
    private Job job58 = new Job("job58", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 2)));
    private Job job59 = new Job("job59", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 9)));
    private Job job60 = new Job("job60", Arrays.asList(new Task(WorkCenter.A, 1), new Task(WorkCenter.B, 5)));
    private Job job61 = new Job("job61", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 3)));


    //jobLists
    private List<Job> jobList1 = Arrays.asList(job1, job2, job3);
    private List<Job> jobList2 = Arrays.asList(job4, job5, job6, job7);
    private List<Job> jobList3 = Arrays.asList(job8, job9, job10, job11, job12);
    private List<Job> jobList4 = Arrays.asList(job13, job14, job15, job16, job17, job18);
    private List<Job> jobList5 = Arrays.asList(job19, job20, job21, job22, job23, job24, job25);
    private List<Job> jobList6 = Arrays.asList(job26, job27, job28, job29, job30, job31, job32, job33, job34, job35, job36);
    private List<Job> jobList7 = Arrays.asList(job37, job38, job39);
    private List<Job> jobList8 = Arrays.asList(job40, job41, job42, job43);
    private List<Job> jobList9 = Arrays.asList(job44, job45, job46, job47, job48);
    private List<Job> jobList10 = Arrays.asList(job49, job50, job51, job52,job53);
    private List<Job> jobList11 = Arrays.asList(job54, job55, job56, job57);
    private List<Job> jobList12 = Arrays.asList(job58, job59, job60, job61);

    //orderedJobLists
    private List<Job> orderedJobList1 = Arrays.asList(job2, job1, job3);
    private List<Job> orderedJobList2 = Arrays.asList(job6, job7, job5, job4);
    private List<Job> orderedJobList3 = Arrays.asList(job9, job12, job11, job10, job8);
    private List<Job> orderedJobList4a = Arrays.asList(job15, job18, job14, job17, job13, job16);
    private List<Job> orderedJobList4b = Arrays.asList(job15, job18, job14, job17, job16, job13);
    private List<Job> orderedJobList5a = Arrays.asList(job25, job20, job21, job19, job23, job22, job24);
    private List<Job> orderedJobList5b = Arrays.asList(job25, job20, job21, job19, job23, job24, job22);
    private List<Job> orderedJobList6a = Arrays.asList(job35, job27, job36, job26, job32, job29, job31, job30, job34, job28, job33);
    private List<Job> orderedJobList6b = Arrays.asList(job35, job27, job36, job26, job32, job29, job31, job30, job28, job34, job33);
    private List<Job> orderedJobList7 = Arrays.asList(job38, job39, job37);
    private List<Job> orderedJobList8 = Arrays.asList(job42, job41, job43, job40);
    private List<Job> orderedJobList9 = Arrays.asList(job47, job48, job45, job44, job46);
    private List<Job> orderedJobList10 = Arrays.asList(job50, job53, job49, job52, job51);
    private List<Job> orderedJobList11 = Arrays.asList(job57, job54, job55, job56);
    private List<Job> orderedJobList12 = Arrays.asList(job60, job61, job59, job58);


    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();


    @Test
    public void testScenario1(){

        SolutionSchedule expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList1);
        Schedule resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
        String result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
        String expected = expectedSolutionSchedule.toString();
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList2);
        resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
        result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
        expected = expectedSolutionSchedule.toString();
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);

        if (SolutionAnalyseThePlant.getListOfOrderedJobs(jobList4).equals(orderedJobList4a)) {
            expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList4a);
            resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
            result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
            expected = expectedSolutionSchedule.toString();
            assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);
        }

        if (SolutionAnalyseThePlant.getListOfOrderedJobs(jobList4).equals(orderedJobList4b)) {
            expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList4b);
            resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
            result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
            expected = expectedSolutionSchedule.toString();
            assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);
        }

        if(SolutionAnalyseThePlant.getListOfOrderedJobs(jobList5).equals(orderedJobList5a)){
            expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList5a);
            resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
            result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
            expected = expectedSolutionSchedule.toString();
            assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);
        }

        if(SolutionAnalyseThePlant.getListOfOrderedJobs(jobList5).equals(orderedJobList5b)){
            expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList5b);
            resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
            result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
            expected = expectedSolutionSchedule.toString();
            assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);
        }

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList6a);
        resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
        result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
        expected = expectedSolutionSchedule.toString();
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList7);
        resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
        result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
        expected = expectedSolutionSchedule.toString();
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList8);
        resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
        result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
        expected = expectedSolutionSchedule.toString();
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList9);
        resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
        result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
        expected = expectedSolutionSchedule.toString();
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList10);
        resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
        result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
        expected = expectedSolutionSchedule.toString();
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList11);
        resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
        result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
        expected = expectedSolutionSchedule.toString();
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList12);
        resultSchedule = ScheduleConverter.convert(expectedSolutionSchedule);
        result = resultSchedule.toString().replaceAll("\\r\\n", "\n").replaceAll("\\r", "\n");
        expected = expectedSolutionSchedule.toString();
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expected+"\nBut was:\n"+result+"\n", expected, result);

    }
}


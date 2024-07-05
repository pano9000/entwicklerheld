package de.entwicklerheld.analyse_the_plant.stage2;

import de.entwicklerheld.analyse_the_plant.EntwicklerHeldTestWatcher;
import de.entwicklerheld.analyse_the_plant.plant.*;
import org.junit.Rule;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.CoreMatchers.either;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertEquals;

public class Stage2Tests {
    //test data

    //example with 3 job
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
    private Job job16 = new Job("job16", Arrays.asList(new Task(WorkCenter.A, 6), new Task(WorkCenter.B, 7)));
    private Job job17 = new Job("job17", Arrays.asList(new Task(WorkCenter.A, 9), new Task(WorkCenter.B, 7)));
    private Job job18 = new Job("job18", Arrays.asList(new Task(WorkCenter.A, 4), new Task(WorkCenter.B, 11)));

    //example with 7 jobs
    private Job job19 = new Job("job19", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 4)));
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
    private Job job31 = new Job("job31", Arrays.asList(new Task(WorkCenter.A, 8), new Task(WorkCenter.B, 7)));
    private Job job32 = new Job("job32", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 12)));
    private Job job33 = new Job("job33", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 1)));
    private Job job34 = new Job("job34", Arrays.asList(new Task(WorkCenter.A, 9), new Task(WorkCenter.B, 2)));
    private Job job35 = new Job("job35", Arrays.asList(new Task(WorkCenter.A, 1), new Task(WorkCenter.B, 6)));
    private Job job36 = new Job("job36", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 10)));

    //4 jobs
    private Job job37 = new Job("job37", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 4)));
    private Job job38 = new Job("job38", Arrays.asList(new Task(WorkCenter.A, 8), new Task(WorkCenter.B, 2)));
    private Job job39 = new Job("job39", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 1)));
    private Job job40 = new Job("job40", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 3)));

    private Job job41 = new Job("job41", Arrays.asList(new Task(WorkCenter.A, 1), new Task(WorkCenter.B, 5)));
    private Job job42 = new Job("job42", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 6)));
    private Job job43 = new Job("job43", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 7)));
    private Job job44 = new Job("job44", Arrays.asList(new Task(WorkCenter.A, 4), new Task(WorkCenter.B, 8)));

    private Job job45 = new Job("job45", Arrays.asList(new Task(WorkCenter.A, 8), new Task(WorkCenter.B, 1)));
    private Job job46 = new Job("job46", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 2)));
    private Job job47 = new Job("job47", Arrays.asList(new Task(WorkCenter.A, 6), new Task(WorkCenter.B, 3)));
    private Job job48 = new Job("job48", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 4)));

    private Job job49 = new Job("job49", Arrays.asList(new Task(WorkCenter.A, 6), new Task(WorkCenter.B, 1)));
    private Job job50 = new Job("job50", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 3)));
    private Job job51 = new Job("job51", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 2)));
    private Job job52 = new Job("job52", Arrays.asList(new Task(WorkCenter.A, 4), new Task(WorkCenter.B, 5)));

    private Job job53 = new Job("job53", Arrays.asList(new Task(WorkCenter.A, 15), new Task(WorkCenter.B, 7)));
    private Job job54 = new Job("job54", Arrays.asList(new Task(WorkCenter.A, 3), new Task(WorkCenter.B, 5)));
    private Job job55 = new Job("job55", Arrays.asList(new Task(WorkCenter.A, 9), new Task(WorkCenter.B, 11)));
    private Job job56 = new Job("job56", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 1)));
    private Job job57 = new Job("job57", Arrays.asList(new Task(WorkCenter.A, 6), new Task(WorkCenter.B, 5)));

    private Job job58 = new Job("job58", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 4)));
    private Job job59 = new Job("job59", Arrays.asList(new Task(WorkCenter.A, 10), new Task(WorkCenter.B, 2)));
    private Job job60 = new Job("job60", Arrays.asList(new Task(WorkCenter.A, 9), new Task(WorkCenter.B, 3)));
    private Job job61 = new Job("job61", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 6)));
    private Job job62 = new Job("job62", Arrays.asList(new Task(WorkCenter.A, 8), new Task(WorkCenter.B, 4)));
    private Job job63 = new Job("job63", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 7)));

    private Job job64 = new Job("job64", Arrays.asList(new Task(WorkCenter.A, 13), new Task(WorkCenter.B, 2)));
    private Job job65 = new Job("job65", Arrays.asList(new Task(WorkCenter.A, 9), new Task(WorkCenter.B, 5)));
    private Job job66 = new Job("job66", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 8)));
    private Job job67 = new Job("job67", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 4)));
    private Job job68 = new Job("job68", Arrays.asList(new Task(WorkCenter.A, 5), new Task(WorkCenter.B, 7)));
    private Job job69 = new Job("job69", Arrays.asList(new Task(WorkCenter.A, 8), new Task(WorkCenter.B, 10)));

    private Job job70 = new Job("job70", Arrays.asList(new Task(WorkCenter.A, 8), new Task(WorkCenter.B, 2)));
    private Job job71 = new Job("job71", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 1)));
    private Job job72 = new Job("job72", Arrays.asList(new Task(WorkCenter.A, 4), new Task(WorkCenter.B, 3)));
    private Job job73 = new Job("job73", Arrays.asList(new Task(WorkCenter.A, 2), new Task(WorkCenter.B, 3)));
    private Job job74 = new Job("job74", Arrays.asList(new Task(WorkCenter.A, 4), new Task(WorkCenter.B, 7)));
    private Job job75 = new Job("job75", Arrays.asList(new Task(WorkCenter.A, 6), new Task(WorkCenter.B, 4)));

    private Job job76 = new Job("job76", Arrays.asList(new Task(WorkCenter.A, 7), new Task(WorkCenter.B, 1)));
    private Job job77 = new Job("job77", Arrays.asList(new Task(WorkCenter.A, 8), new Task(WorkCenter.B, 2)));
    private Job job78 = new Job("job78", Arrays.asList(new Task(WorkCenter.A, 9), new Task(WorkCenter.B, 3)));
    private Job job79 = new Job("job79", Arrays.asList(new Task(WorkCenter.A, 10), new Task(WorkCenter.B, 4)));
    private Job job80 = new Job("job80", Arrays.asList(new Task(WorkCenter.A, 11), new Task(WorkCenter.B, 5)));
    private Job job81 = new Job("job81", Arrays.asList(new Task(WorkCenter.A, 12), new Task(WorkCenter.B, 6)));

    //jobLists
    private List<Job> jobList1 = Arrays.asList(job1, job2, job3);
    private List<Job> jobList2 = Arrays.asList(job4, job5, job6, job7);
    private List<Job> jobList3 = Arrays.asList(job8, job9, job10, job11, job12);
    private List<Job> jobList4 = Arrays.asList(job13, job14, job15, job16, job17, job18);
    private List<Job> jobList5 = Arrays.asList(job19, job20, job21, job22, job23, job24, job25);
    private List<Job> jobList6 = Arrays.asList(job26, job27, job28, job29, job30, job31, job32, job33, job34, job35, job36);

    private List<Job> jobList7 = Arrays.asList(job37, job38, job39, job40);
    private List<Job> jobList8 = Arrays.asList(job41, job42, job43, job44);
    private List<Job> jobList9 = Arrays.asList(job45, job46, job47, job48);
    private List<Job> jobList10 = Arrays.asList(job49, job50, job51, job52);
    private List<Job> jobList11 = Arrays.asList(job53, job54, job55, job56, job57);
    private List<Job> jobList12 = Arrays.asList(job58, job59, job60, job61, job62, job63);
    private List<Job> jobList13 = Arrays.asList(job64, job65, job66, job67, job68, job69);
    private List<Job> jobList14 = Arrays.asList(job70, job71, job72, job73, job74, job75);
    private List<Job> jobList15 = Arrays.asList(job76, job77, job78, job79, job80, job81);

    private List<Job> orderedJobList1 = Arrays.asList(job2, job1, job3);
    private List<Job> orderedJobList2 = Arrays.asList(job6, job7, job5, job4);
    private List<Job> orderedJobList3 = Arrays.asList(job9, job12, job11, job10, job8);
    private List<Job> orderedJobList4 = Arrays.asList(job15, job18, job16, job14, job17, job13);
    private List<Job> orderedJobList5a = Arrays.asList(job25, job20, job21, job19, job23, job22, job24);
    private List<Job> orderedJobList5b = Arrays.asList(job25, job20, job21, job19, job23, job24, job22);
    private List<Job> orderedJobList6a = Arrays.asList(job35, job27, job36, job26, job32, job29, job31, job30, job34, job28, job33);
    private List<Job> orderedJobList6b = Arrays.asList(job35, job27, job36, job26, job32, job29, job31, job30, job28, job34, job33);

    private List<Job> orderedJobList7 = Arrays.asList(job37, job40, job38, job39);
    private List<Job> orderedJobList8 = Arrays.asList(job41, job42, job43, job44);
    private List<Job> orderedJobList9 = Arrays.asList(job48, job47, job46, job45);
    private List<Job> orderedJobList10 = Arrays.asList(job52, job50, job51, job49);
    private List<Job> orderedJobList11 = Arrays.asList(job54, job55, job53, job57, job56);
    private List<Job> orderedJobList12 = Arrays.asList(job58, job61, job63, job62, job60, job59);
    private List<Job> orderedJobList13 = Arrays.asList(job66, job68, job69, job65, job67, job64);
    private List<Job> orderedJobList14 = Arrays.asList(job73, job74, job75, job72, job70, job71);
    private List<Job> orderedJobList15 = Arrays.asList(job81, job80, job79, job78, job77, job76);


    @Rule
    public EntwicklerHeldTestWatcher watcher = new EntwicklerHeldTestWatcher();

    @Test
    public void testScenario1() { //fertig

        //test compareJobTime
        int resultValue = AnalyseThePlant.compareTaskTime(job1);
        assertThat("Wrong value", resultValue, is(2));

        resultValue = AnalyseThePlant.compareTaskTime(job2);
        assertThat("Wrong value", resultValue, is(1));

        resultValue = AnalyseThePlant.compareTaskTime(job3);
        assertThat("Wrong value", resultValue, is(2));

        resultValue = AnalyseThePlant.compareTaskTime(job4);
        assertThat("Wrong value", resultValue, is(2));

        resultValue = AnalyseThePlant.compareTaskTime(job5);
        assertThat("Wrong value", resultValue, is(2));

        resultValue = AnalyseThePlant.compareTaskTime(job6);
        assertThat("Wrong value", resultValue, is(1));

        resultValue = AnalyseThePlant.compareTaskTime(job7);
        assertThat("Wrong value", resultValue, is(1));

        resultValue = AnalyseThePlant.compareTaskTime(job8);
        assertThat("Wrong value", resultValue, is(2));

        resultValue = AnalyseThePlant.compareTaskTime(job31);
        assertThat("Wrong value", resultValue, is(2));

        resultValue = AnalyseThePlant.compareTaskTime(job17);
        assertThat("Wrong value", resultValue, is(2));

        resultValue = AnalyseThePlant.compareTaskTime(job18);
        assertThat("Wrong value", resultValue, is(1));

        resultValue = AnalyseThePlant.compareTaskTime(job19);
        assertThat("Wrong value", resultValue, is(2));

        resultValue = AnalyseThePlant.compareTaskTime(job20);
        assertThat("Wrong value", resultValue, is(1));

        resultValue = AnalyseThePlant.compareTaskTime(job21);
        assertThat("Wrong value", resultValue, is(2));

        resultValue = AnalyseThePlant.compareTaskTime(job22);
        assertThat("Wrong value", resultValue, is(2));

        resultValue = AnalyseThePlant.compareTaskTime(job23);
        assertThat("Wrong value", resultValue, is(2));

        resultValue = AnalyseThePlant.compareTaskTime(job24);
        assertThat("Wrong value", resultValue, is(2));
    }

    @Test
    public void testScenario2() { //fertig

        //test Johnsons rule
        List<Job> resultList = AnalyseThePlant.getListOfOrderedJobs(jobList1);
        List<Job> expectedList = Arrays.asList(job2, job1, job3);
        assertThat("List of ordered jobs isn't correct", resultList, is(expectedList));
        //this.compareLists(expectedList, resultList);

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList2);
        expectedList = Arrays.asList(job6, job7, job5, job4);
        assertThat("List of ordered jobs isn't correct", resultList, is(expectedList));
        //this.compareLists(expectedList, resultList);

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList3);
        expectedList = Arrays.asList(job9, job12, job11, job10, job8);
        assertThat("List of ordered jobs isn't correct", resultList, is(expectedList));
        //this.compareLists(expectedList, resultList);

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList4);
        assertThat("List of ordered jobs isn't correct", resultList, is(orderedJobList4));
        //this.compareLists(expectedList, resultList);

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList5);
        assertThat("List of ordered jobs isn't correct", resultList, either(is(orderedJobList5a)).or(is(orderedJobList5b)));
        //this.compareLists(expectedList, resultList);

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList6);
        assertThat("List of ordered jobs isn't correct", resultList, either(is(orderedJobList6a)).or(is(orderedJobList6b)));
        //this.compareLists(expectedList, resultList);

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList7);
        assertThat("List of ordered jobs isn't correct", resultList, is(orderedJobList7));

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList8);
        assertThat("List of ordered jobs isn't correct", resultList, is(orderedJobList8));

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList9);
        assertThat("List of ordered jobs isn't correct", resultList, is(orderedJobList9));

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList10);
        assertThat("List of ordered jobs isn't correct", resultList, is(orderedJobList10));

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList11);
        assertThat("List of ordered jobs isn't correct", resultList, is(orderedJobList11));

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList12);
        assertThat("List of ordered jobs isn't correct", resultList, is(orderedJobList12));

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList13);
        assertThat("List of ordered jobs isn't correct", resultList, is(orderedJobList13));

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList14);
        assertThat("List of ordered jobs isn't correct", resultList, is(orderedJobList14));

        resultList = AnalyseThePlant.getListOfOrderedJobs(jobList15);
        assertThat("List of ordered jobs isn't correct", resultList, is(orderedJobList15));
    }

    @Test
    public void testScenario3() {

        //create a schedule
        Schedule expectedSolutionSchedule;
        Schedule resultSchedule;

        //for 3 jobs
        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList1);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList1);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);

        //for 4 jobs
        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList2);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList2);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);

        //for 5 jobs
        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList3);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList3);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);

        //for 6 jobs
        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList4);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList4);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);

        //for 7 jobs
        expectedSolutionSchedule = new Schedule();
        expectedSolutionSchedule.add(WorkCenter.A, new Task(WorkCenter.A, 2)).add(WorkCenter.A, new Task(WorkCenter.A, 3))
                .add(WorkCenter.A, new Task(WorkCenter.A, 5)).add(WorkCenter.A, new Task(WorkCenter.A, 5))
                .add(WorkCenter.A, new Task(WorkCenter.A, 5)).add(WorkCenter.A, new Task(WorkCenter.A, 3)).add(WorkCenter.A, new Task(WorkCenter.A, 4));
        expectedSolutionSchedule.add(WorkCenter.B, new IdleTask(WorkCenter.B, 2)).add(WorkCenter.B, new Task(WorkCenter.B, 3))
                .add(WorkCenter.B, new Task(WorkCenter.B, 4)).add(WorkCenter.B, new IdleTask(WorkCenter.B, 1))
                .add(WorkCenter.B, new Task(WorkCenter.B, 5)).add(WorkCenter.B, new Task(WorkCenter.B, 4))
                .add(WorkCenter.B, new IdleTask(WorkCenter.B, 1)).add(WorkCenter.B, new Task(WorkCenter.B, 2)).add(WorkCenter.B, new IdleTask(WorkCenter.B, 1))
                .add(WorkCenter.B, new Task(WorkCenter.B, 1)).add(WorkCenter.B, new IdleTask(WorkCenter.B, 3))
                .add(WorkCenter.B, new Task(WorkCenter.B, 1));

        if (SolutionAnalyseThePlant.getListOfOrderedJobs(jobList5).equals(orderedJobList5a)) {
            resultSchedule = AnalyseThePlant.getSchedule(orderedJobList5a);
            assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);
        }

        expectedSolutionSchedule = new Schedule();
        expectedSolutionSchedule.add(WorkCenter.A, new Task(WorkCenter.A, 2)).add(WorkCenter.A, new Task(WorkCenter.A, 3))
                .add(WorkCenter.A, new Task(WorkCenter.A, 5)).add(WorkCenter.A, new Task(WorkCenter.A, 5))
                .add(WorkCenter.A, new Task(WorkCenter.A, 5)).add(WorkCenter.A, new Task(WorkCenter.A, 4)).add(WorkCenter.A, new Task(WorkCenter.A, 3));
        expectedSolutionSchedule.add(WorkCenter.B, new IdleTask(WorkCenter.B, 2)).add(WorkCenter.B, new Task(WorkCenter.B, 3))
                .add(WorkCenter.B, new Task(WorkCenter.B, 4)).add(WorkCenter.B, new IdleTask(WorkCenter.B, 1))
                .add(WorkCenter.B, new Task(WorkCenter.B, 5)).add(WorkCenter.B, new Task(WorkCenter.B, 4))
                .add(WorkCenter.B, new IdleTask(WorkCenter.B, 1)).add(WorkCenter.B, new Task(WorkCenter.B, 2)).add(WorkCenter.B, new IdleTask(WorkCenter.B, 2))
                .add(WorkCenter.B, new Task(WorkCenter.B, 1)).add(WorkCenter.B, new IdleTask(WorkCenter.B, 2))
                .add(WorkCenter.B, new Task(WorkCenter.B, 1));

        if (SolutionAnalyseThePlant.getListOfOrderedJobs(jobList5).equals(orderedJobList5b)) {
            resultSchedule = AnalyseThePlant.getSchedule(orderedJobList5b);
            assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);
        }
        //for 11 jobs
        expectedSolutionSchedule = new Schedule();
        expectedSolutionSchedule.add(WorkCenter.A, new Task(WorkCenter.A, 1)).add(WorkCenter.A, new Task(WorkCenter.A, 2))
                .add(WorkCenter.A, new Task(WorkCenter.A, 3)).add(WorkCenter.A, new Task(WorkCenter.A, 4))
                .add(WorkCenter.A, new Task(WorkCenter.A, 5)).add(WorkCenter.A, new Task(WorkCenter.A, 8)).add(WorkCenter.A, new Task(WorkCenter.A, 8))
                .add(WorkCenter.A, new Task(WorkCenter.A, 11)).add(WorkCenter.A, new Task(WorkCenter.A, 9)).add(WorkCenter.A, new Task(WorkCenter.A, 9)).add(WorkCenter.A, new Task(WorkCenter.A, 7));
        expectedSolutionSchedule.add(WorkCenter.B, new IdleTask(WorkCenter.B, 1)).add(WorkCenter.B, new Task(WorkCenter.B, 6))
                .add(WorkCenter.B, new Task(WorkCenter.B, 9)).add(WorkCenter.B, new Task(WorkCenter.B, 10))
                .add(WorkCenter.B, new Task(WorkCenter.B, 5)).add(WorkCenter.B, new Task(WorkCenter.B, 12))
                .add(WorkCenter.B, new Task(WorkCenter.B, 11)).add(WorkCenter.B, new Task(WorkCenter.B, 7)).add(WorkCenter.B, new Task(WorkCenter.B, 4))
                .add(WorkCenter.B, new Task(WorkCenter.B, 2)).add(WorkCenter.B, new Task(WorkCenter.B, 2))
                .add(WorkCenter.B, new Task(WorkCenter.B, 1));

        if (SolutionAnalyseThePlant.getListOfOrderedJobs(jobList6).equals(orderedJobList6a)) {
            resultSchedule = AnalyseThePlant.getSchedule(orderedJobList6a);
            assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);
        }
        if (SolutionAnalyseThePlant.getListOfOrderedJobs(jobList6).equals(orderedJobList6b)) {
            resultSchedule = AnalyseThePlant.getSchedule(orderedJobList6b);
            assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);
        }

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList7);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList7);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList8);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList8);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList9);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList9);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList10);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList10);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList11);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList11);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList12);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList12);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList13);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList13);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList14);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList14);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList15);
        resultSchedule = AnalyseThePlant.getSchedule(orderedJobList15);
        assertEquals("Wrong schedule visualization\nExpected schedule visualization:\n"+expectedSolutionSchedule+"\nBut was:\n"+resultSchedule+"\n", expectedSolutionSchedule, resultSchedule);
    }

    @Test
    public void testScenario4() { //das hier klappt :) ist fertig

        //just check if they understood the challenge
        //calculate the makespan of a schedule
        Schedule expectedSolutionSchedule = new Schedule();
        int result;
        //schedule for 3 jobs
        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList1);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(8));

        //schedule for 4 jobs
        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList2);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(21));

        //schedule for 5 jobs
        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList3);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(35));

        //schedule for 6 jobs
        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList4);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(52));

        //schedule for 7 jobs
        expectedSolutionSchedule = new Schedule();
        expectedSolutionSchedule.add(WorkCenter.A, new Task(WorkCenter.A, 2)).add(WorkCenter.A, new Task(WorkCenter.A, 3))
                .add(WorkCenter.A, new Task(WorkCenter.A, 5)).add(WorkCenter.A, new Task(WorkCenter.A, 5))
                .add(WorkCenter.A, new Task(WorkCenter.A, 5)).add(WorkCenter.A, new Task(WorkCenter.A, 3)).add(WorkCenter.A, new Task(WorkCenter.A, 4));
        expectedSolutionSchedule.add(WorkCenter.B, new IdleTask(WorkCenter.B, 2)).add(WorkCenter.B, new Task(WorkCenter.B, 3))
                .add(WorkCenter.B, new Task(WorkCenter.B, 4)).add(WorkCenter.B, new IdleTask(WorkCenter.B, 1))
                .add(WorkCenter.B, new Task(WorkCenter.B, 5)).add(WorkCenter.B, new Task(WorkCenter.B, 4))
                .add(WorkCenter.B, new IdleTask(WorkCenter.B, 1)).add(WorkCenter.B, new Task(WorkCenter.B, 2)).add(WorkCenter.B, new IdleTask(WorkCenter.B, 1))
                .add(WorkCenter.B, new Task(WorkCenter.B, 1)).add(WorkCenter.B, new IdleTask(WorkCenter.B, 3))
                .add(WorkCenter.B, new Task(WorkCenter.B, 1));

        if (SolutionAnalyseThePlant.getListOfOrderedJobs(jobList5).equals(orderedJobList5a)) {
            result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
            assertThat("Wrong makespan", result, is(28));
        }

        expectedSolutionSchedule = new Schedule();
        expectedSolutionSchedule.add(WorkCenter.A, new Task(WorkCenter.A, 2)).add(WorkCenter.A, new Task(WorkCenter.A, 3))
                .add(WorkCenter.A, new Task(WorkCenter.A, 5)).add(WorkCenter.A, new Task(WorkCenter.A, 5))
                .add(WorkCenter.A, new Task(WorkCenter.A, 5)).add(WorkCenter.A, new Task(WorkCenter.A, 4)).add(WorkCenter.A, new Task(WorkCenter.A, 3));
        expectedSolutionSchedule.add(WorkCenter.B, new IdleTask(WorkCenter.B, 2)).add(WorkCenter.B, new Task(WorkCenter.B, 3))
                .add(WorkCenter.B, new Task(WorkCenter.B, 4)).add(WorkCenter.B, new IdleTask(WorkCenter.B, 1))
                .add(WorkCenter.B, new Task(WorkCenter.B, 5)).add(WorkCenter.B, new Task(WorkCenter.B, 4))
                .add(WorkCenter.B, new IdleTask(WorkCenter.B, 1)).add(WorkCenter.B, new Task(WorkCenter.B, 2)).add(WorkCenter.B, new IdleTask(WorkCenter.B, 2))
                .add(WorkCenter.B, new Task(WorkCenter.B, 1)).add(WorkCenter.B, new IdleTask(WorkCenter.B, 2))
                .add(WorkCenter.B, new Task(WorkCenter.B, 1));
        
        if (SolutionAnalyseThePlant.getListOfOrderedJobs(jobList5).equals(orderedJobList5b)) {
            result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
            assertThat("Wrong makespan", result, is(28));
        }

        //schedule for 11 jobs
        expectedSolutionSchedule = new Schedule();
        expectedSolutionSchedule.add(WorkCenter.A, new Task(WorkCenter.A, 1)).add(WorkCenter.A, new Task(WorkCenter.A, 2))
                .add(WorkCenter.A, new Task(WorkCenter.A, 3)).add(WorkCenter.A, new Task(WorkCenter.A, 4))
                .add(WorkCenter.A, new Task(WorkCenter.A, 5)).add(WorkCenter.A, new Task(WorkCenter.A, 8)).add(WorkCenter.A, new Task(WorkCenter.A, 7))
                .add(WorkCenter.A, new Task(WorkCenter.A, 11)).add(WorkCenter.A, new Task(WorkCenter.A, 9)).add(WorkCenter.A, new Task(WorkCenter.A, 9)).add(WorkCenter.A, new Task(WorkCenter.A, 7));
        expectedSolutionSchedule.add(WorkCenter.B, new IdleTask(WorkCenter.B, 1)).add(WorkCenter.B, new Task(WorkCenter.B, 6))
                .add(WorkCenter.B, new Task(WorkCenter.B, 9)).add(WorkCenter.B, new Task(WorkCenter.B, 10))
                .add(WorkCenter.B, new Task(WorkCenter.B, 5)).add(WorkCenter.B, new Task(WorkCenter.B, 12))
                .add(WorkCenter.B, new Task(WorkCenter.B, 11)).add(WorkCenter.B, new Task(WorkCenter.B, 7)).add(WorkCenter.B, new Task(WorkCenter.B, 4))
                .add(WorkCenter.B, new Task(WorkCenter.B, 2)).add(WorkCenter.B, new Task(WorkCenter.B, 2))
                .add(WorkCenter.B, new Task(WorkCenter.B, 1));

        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(70));

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList7);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(21));

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList8);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(27));

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList9);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(27));

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList10);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(16));

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList11);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(40));

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList12);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(43));

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList13);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(46));

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList14);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(32));

        expectedSolutionSchedule = SolutionAnalyseThePlant.getSchedule(orderedJobList15);
        result = AnalyseThePlant.getMakespan(expectedSolutionSchedule);
        assertThat("Wrong makespan", result, is(58));

    }
}
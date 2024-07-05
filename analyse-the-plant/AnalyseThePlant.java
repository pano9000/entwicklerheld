package de.entwicklerheld.analyse_the_plant.stage2;

import de.entwicklerheld.analyse_the_plant.plant.AbstractSchedule;
import de.entwicklerheld.analyse_the_plant.plant.IdleTask;
import de.entwicklerheld.analyse_the_plant.plant.ITask;
import de.entwicklerheld.analyse_the_plant.plant.Task;
import de.entwicklerheld.analyse_the_plant.plant.Job;
import de.entwicklerheld.analyse_the_plant.plant.WorkCenter;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.*;
import java.util.Arrays;
import java.util.Collections;

public class AnalyseThePlant {
    public static int compareTaskTime(final Job job) {

        return (job.getTaskList().get(1).getTime() <= job.getTaskList().get(0).getTime()) ? 2 : 1;

    }

    public static List<Job> getListOfOrderedJobs(List<Job> jobList) {
        //scenario 2: here you have to implement the Johnson rules
        //https://www.geeksforgeeks.org/johnsons-rule-in-sequencing-problems/
        //https://www.slideshare.net/slideshow/9johnsons-ruleppt/252543135#5

        //List<Job> orderedJobList = new ArrayList<Job>(jobList.size());
        List<Job> orderedJobList = new ArrayList<>(Collections.nCopies(jobList.size(), (Job) null));

        List<Job> copyJobList = new ArrayList<Job>(jobList.size());
        //copy array
        for (Job job : jobList) {
            copyJobList.add(job);
        }

        System.out.println("-------------start");

        int i = 0;
        while (copyJobList.size() >= 1) {
            int jobIndex = getJobWithShortestTime(copyJobList);
            Job shortestTimeJob = copyJobList.get(jobIndex);

            int nextIndex = getNextIndex(orderedJobList, compareTaskTime(shortestTimeJob));
            System.out.println("nextIndex: " + nextIndex);
            orderedJobList.set(nextIndex, copyJobList.get(jobIndex));
            copyJobList.remove(jobIndex);
            System.out.println(String.format(
                "joblist Size: %d | OrderedJob size: %d | currI: %d | orderedJobKist: %s", 
                copyJobList.size(),
                orderedJobList.size(),
                i,
                orderedJobList.toString()
            ));

            i++;

        }
       System.out.println("-------------end");

        return orderedJobList;
    }

    private static int getNextIndex(List<Job> orderedJobList, int direction) {

        if (direction == 1) {
            for (int i = 0; i < orderedJobList.size(); i++) {
                if (orderedJobList.get(i) == null) {
                    return i;
                }
            }

        } else {
            for (int j = orderedJobList.size() - 1; j >= 0; j--) {
                if (orderedJobList.get(j) == null) {
                    return j;
                }            
            }
        }

        return -1;



    }

    private static int getJobWithShortestTime(List<Job> jobList) {

        int shortestTimeJobIndex = 0;
        int shortestTime = jobList.get(0).getTaskList().get(0).getTime();

        for (int i = 0; i < jobList.size(); i++) {
        //for (Job job : jobList) {
            int currA = jobList.get(i).getTaskList().get(0).getTime();
            int currB = jobList.get(i).getTaskList().get(1).getTime();

            if (currA < shortestTime) {
                shortestTime = currA;
                shortestTimeJobIndex = i;
                continue;
            }

            if (currB < shortestTime) {
                shortestTime = currB;
                shortestTimeJobIndex = i;
                continue;
            }

        }

        return shortestTimeJobIndex;

    }

    public static Schedule getSchedule(List<Job> jobList) {

        Schedule schedule = new Schedule();

        int taskACount = 0;
        int taskBCount = 0; 
        for (int k = 0; k < jobList.size(); k++) {
            
            Task taskA = jobList.get(k).getTaskList().get(0);
            Task taskB = jobList.get(k).getTaskList().get(1);

            schedule.add(WorkCenter.A, taskA);
            taskACount += taskA.getTime();

            if (taskBCount < taskACount) {
                int idleTime = taskACount - taskBCount;
                schedule.add(WorkCenter.B, new IdleTask(WorkCenter.B, idleTime));
                taskBCount += idleTime;
            }

            schedule.add(WorkCenter.B, taskB);
            taskBCount += taskB.getTime();

        }

        return schedule;
    }

    public static int getMakespan(Schedule schedule) {
        int makespan = 0;
        for (ITask task : schedule.getTaskList(WorkCenter.B)) {
            makespan += task.getTime();
        }
        return makespan;
    }
}

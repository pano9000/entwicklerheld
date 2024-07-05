package de.entwicklerheld.analyse_the_plant.stage2;

import de.entwicklerheld.analyse_the_plant.plant.AbstractSchedule;
import de.entwicklerheld.analyse_the_plant.plant.IdleTask;
import de.entwicklerheld.analyse_the_plant.plant.ITask;
import de.entwicklerheld.analyse_the_plant.plant.Task;
import de.entwicklerheld.analyse_the_plant.plant.Job;
import de.entwicklerheld.analyse_the_plant.plant.WorkCenter;

import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

public class AnalyseThePlant {
    public static int compareTaskTime(final Job job) {
        return (job.getTaskList().get(1).getTime() <= job.getTaskList().get(0).getTime()) ? 2 : 1;
    }

    public static List<Job> getListOfOrderedJobs(List<Job> jobList) {
        //https://www.geeksforgeeks.org/johnsons-rule-in-sequencing-problems/
        //https://www.slideshare.net/slideshow/9johnsons-ruleppt/252543135#5

        List<Job> orderedJobList = new ArrayList<>(Collections.nCopies(jobList.size(), (Job) null));

        //copy array as original is immutable
        List<Job> copyJobList = new ArrayList<Job>(jobList.size());
        for (Job job : jobList) {
            copyJobList.add(job);
        }

        while (copyJobList.size() >= 1) {
            int jobIndex = getJobWithShortestTime(copyJobList);
            Job shortestTimeJob = copyJobList.get(jobIndex);

            // decide, if to put value to the next free value at the 'start' or the 'end' of the ordered list
            int nextIndex = getNextIndexInOrderedList(orderedJobList, compareTaskTime(shortestTimeJob));

            orderedJobList.set(nextIndex, copyJobList.get(jobIndex));
            copyJobList.remove(jobIndex);
        }
        return orderedJobList;
    }

    private static int getNextIndexInOrderedList(List<Job> orderedJobList, int direction) {

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

        int timeCountA = 0;
        int timeCountB = 0; 

        for (Job job : jobList) {  
            Task taskA = job.getTaskList().get(0);
            Task taskB = job.getTaskList().get(1);

            schedule.add(WorkCenter.A, taskA);
            timeCountA += taskA.getTime();

            if (timeCountB < timeCountA) {
                int idleTime = timeCountA - timeCountB;
                schedule.add(WorkCenter.B, new IdleTask(WorkCenter.B, idleTime));
                timeCountB += idleTime;
            }

            schedule.add(WorkCenter.B, taskB);
            timeCountB += taskB.getTime();

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

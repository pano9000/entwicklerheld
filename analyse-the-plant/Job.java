package de.entwicklerheld.analyse_the_plant.solution;

import java.util.List;
import java.util.stream.Collectors;

public class Job {
    private final String jobName;
    private List<Task> taskList;

    public Job(final String jobName, final List<Task> taskList) {
        this.jobName = jobName;
        this.taskList = taskList;
        for (Task task : taskList) {
            task.setJob(this);
        }
    }

    public List<Task> getTaskList() {
        return taskList;
    }

    public String getJobName() {
        return jobName;
    }

    @Override
    public String toString() {
        String tasksString = this.taskList.stream().map(Object::toString).collect(Collectors.joining(", "));
        return "Job " + jobName + "(" + tasksString + ")";
    }

}

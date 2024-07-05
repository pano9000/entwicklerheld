package de.entwicklerheld.analyse_the_plant.solution;


import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public abstract class AbstractSchedule {
    protected final Map<WorkCenter, List<ITask>> schedule;

    public AbstractSchedule() {
        schedule = new LinkedHashMap<>();
        schedule.put(WorkCenter.A, new ArrayList<>());
        schedule.put(WorkCenter.B, new ArrayList<>());
    }

    public AbstractSchedule add(WorkCenter workCenter, ITask task) {
        if (workCenter != task.getWorkCenter()) {
            throw new RuntimeException("You cannot add task to another workcenter, idiot!");
        }
        schedule.get(workCenter).add(task);
        return this;
    }

    public List<ITask> getTaskList(WorkCenter workCenter) {
        return schedule.get(workCenter);
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof AbstractSchedule)) {
            return false;
        }
        AbstractSchedule solutionSchedule2 = (AbstractSchedule) object;
        if (!solutionSchedule2.getTaskList(WorkCenter.A).equals(this.getTaskList(WorkCenter.A))) {
            return false;
        }
        if (!solutionSchedule2.getTaskList(WorkCenter.B).equals(this.getTaskList(WorkCenter.B))) {
            return false;
        }
        return true;
    }

    public abstract String toString();
}
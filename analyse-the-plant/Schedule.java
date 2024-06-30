package de.entwicklerheld.analyse_the_plant.stage1;

import de.entwicklerheld.analyse_the_plant.plant.AbstractSchedule;
import de.entwicklerheld.analyse_the_plant.plant.IdleTask;
import de.entwicklerheld.analyse_the_plant.plant.ITask;
import de.entwicklerheld.analyse_the_plant.plant.Task;
import de.entwicklerheld.analyse_the_plant.plant.WorkCenter;
import java.util.List;

class Schedule extends AbstractSchedule {

    @Override
    public String toString() {

        int VISUALIZATION_CHAR_MULTIPLICATOR = 4;
        char TASK_SEPARATOR_CHAR = '|';
        StringBuilder str = new StringBuilder();

        for (List<ITask> workCenterTasks : this.schedule.values()) {
            str.append(TASK_SEPARATOR_CHAR);
            for (ITask task : workCenterTasks) {
                String currentTime = Integer.toString(task.getTime());
                str.append(currentTime + " ");

                char visualizationChar = (task instanceof Task) ? '█' : '░';
                int maxNumberOfVisualizationChars = task.getTime() * VISUALIZATION_CHAR_MULTIPLICATOR;
                // crrentTime + initial separator char + single space before visualization char
                int remainingVisualizationChars = maxNumberOfVisualizationChars - (currentTime.length() + 1 + 1);

                for (int j = 0; j < remainingVisualizationChars; j++) {
                    str.append(visualizationChar);
                }
                str.append(TASK_SEPARATOR_CHAR);
            }
            str.append("\n");            
        }
        return str.toString().trim();
    }
}

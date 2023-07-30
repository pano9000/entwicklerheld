package de.entwicklerheld.restApiJava;

import java.util.ArrayList;
import java.util.List;

public class IOUProvider {

    private final List<IOU> ious = new ArrayList<>();

    private static IOUProvider INSTANCE;

    public static IOUProvider getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new IOUProvider();
        }
        return INSTANCE;
    }

    public void addIOU(IOU iou) {
        ious.add(iou);
    }
    public void removeIOU(IOU iou) {
        ious.remove(iou);
    }
    public List<IOU> getIOUs() {
        return ious;
    }

    public IOU getIOU(int id) {
        for (IOU iou : ious) {
            if (iou.getId() == id) {
                return iou;
            }
        }
        return null;
    }

    public void deleteIOU(int id) {
        for (IOU iou : ious) {
            if (iou.getId() == id) {
                ious.remove(iou);
                return;
            }
        }
    }
}

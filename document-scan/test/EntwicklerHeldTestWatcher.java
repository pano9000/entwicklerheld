package de.entwicklerheld.documentScanJava;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
public class EntwicklerHeldTestWatcher extends TestWatcher {
  
  @Override
  protected void starting(Description description) {
    System.out.println("##polylith[testStarted name=\'" + description.getClassName() + "." + description.getMethodName() + "\']");
  }

  @Override
  protected void finished(Description description) {
    System.out.println("\\n##polylith[testFinished name=\'" + description.getClassName() + "." + description.getMethodName() + "\']");
  }
}
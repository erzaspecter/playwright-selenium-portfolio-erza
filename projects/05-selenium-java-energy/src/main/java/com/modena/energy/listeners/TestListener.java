package com.modena.energy.listeners;

import com.modena.energy.utils.ScreenshotUtil;
import org.openqa.selenium.WebDriver;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import org.testng.Reporter;

import java.io.PrintWriter;
import java.io.StringWriter;

public class TestListener implements ITestListener {
    
    private ScreenshotUtil screenshotUtil;
    private long startTime;
    
    @Override
    public void onTestStart(ITestResult result) {
        startTime = System.currentTimeMillis();
        String testName = result.getName();
        System.out.println("\n========================================");
        System.out.println("🚀 TEST STARTED: " + testName);
        System.out.println("   Time: " + new java.util.Date());
        System.out.println("========================================");
        Reporter.log("Test started: " + testName);
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        long duration = System.currentTimeMillis() - startTime;
        String testName = result.getName();
        System.out.println("========================================");
        System.out.println("✅ TEST PASSED: " + testName);
        System.out.println("   Duration: " + duration + " ms");
        System.out.println("========================================");
        Reporter.log("Test passed: " + testName + " (Duration: " + duration + "ms)");
    }
    
    @Override
    public void onTestFailure(ITestResult result) {
        long duration = System.currentTimeMillis() - startTime;
        String testName = result.getName();
        Throwable throwable = result.getThrowable();
        
        System.out.println("========================================");
        System.out.println("❌ TEST FAILED: " + testName);
        System.out.println("   Duration: " + duration + " ms");
        System.out.println("   Error: " + throwable.getMessage());
        System.out.println("========================================");
        
        StringWriter sw = new StringWriter();
        throwable.printStackTrace(new PrintWriter(sw));
        System.out.println(sw);
        
        takeScreenshotOnFailure(result);
        Reporter.log("Test failed: " + testName);
    }
    
    @Override
    public void onTestSkipped(ITestResult result) {
        String testName = result.getName();
        Throwable throwable = result.getThrowable();
        String skipReason = (throwable != null) ? throwable.getMessage() : "Test was skipped";
        
        System.out.println("========================================");
        System.out.println("⏭️ TEST SKIPPED: " + testName);
        System.out.println("   Reason: " + skipReason);
        System.out.println("========================================");
        Reporter.log("Test skipped: " + testName);
    }
    
    @Override
    public void onStart(ITestContext context) {
        System.out.println("\n🏁 TEST SUITE STARTED: " + context.getName());
    }
    
    @Override
    public void onFinish(ITestContext context) {
        int passed = context.getPassedTests().size();
        int failed = context.getFailedTests().size();
        int skipped = context.getSkippedTests().size();
        
        System.out.println("\n========================================");
        System.out.println("🏁 TEST SUITE FINISHED");
        System.out.println("   ✅ Passed: " + passed);
        System.out.println("   ❌ Failed: " + failed);
        System.out.println("   ⏭️ Skipped: " + skipped);
        System.out.println("========================================");
    }
    
    private void takeScreenshotOnFailure(ITestResult result) {
        try {
            Object testClass = result.getInstance();
            WebDriver driver = getDriverFromTestClass(testClass);
            
            if (driver != null) {
                screenshotUtil = new ScreenshotUtil(driver);
                String testName = result.getName();
                screenshotUtil.captureOnFailure(testName, result.getThrowable());
            }
        } catch (Exception e) {
            System.err.println("Failed to take screenshot: " + e.getMessage());
        }
    }
    
    private WebDriver getDriverFromTestClass(Object testClass) {
        try {
            java.lang.reflect.Field driverField = testClass.getClass().getSuperclass().getDeclaredField("driver");
            driverField.setAccessible(true);
            return (WebDriver) driverField.get(testClass);
        } catch (Exception e) {
            return null;
        }
    }
}
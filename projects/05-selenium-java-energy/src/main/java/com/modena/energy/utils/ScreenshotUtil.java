package com.modena.energy.utils;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotUtil {
    
    private WebDriver driver;
    private String screenshotPath;
    
    public ScreenshotUtil(WebDriver driver) {
        this.driver = driver;
        this.screenshotPath = ConfigReader.getInstance().getScreenshotPath();
        
        File directory = new File(screenshotPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }
    
    public String takeScreenshot(String testName) {
        String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
        String fileName = testName.replaceAll("[^a-zA-Z0-9]", "_") + "_" + timestamp + ".png";
        String filePath = screenshotPath + fileName;
        
        try {
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File srcFile = screenshot.getScreenshotAs(OutputType.FILE);
            File destFile = new File(filePath);
            FileUtils.copyFile(srcFile, destFile);
            return filePath;
        } catch (IOException e) {
            return null;
        }
    }
    
    public byte[] takeScreenshotAsBytes() {
        try {
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            return screenshot.getScreenshotAs(OutputType.BYTES);
        } catch (Exception e) {
            return null;
        }
    }
    
    public String captureOnFailure(String testName, Throwable throwable) {
        return takeScreenshot(testName + "_FAILED");
    }
}
package com.modena.energy.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {
    
    private static ConfigReader instance;
    private Properties properties;
    
    private ConfigReader() {
        properties = new Properties();
        loadProperties();
    }
    
    public static ConfigReader getInstance() {
        if (instance == null) {
            instance = new ConfigReader();
        }
        return instance;
    }
    
    private void loadProperties() {
        try {
            FileInputStream fis = new FileInputStream("config/config.properties");
            properties.load(fis);
            fis.close();
        } catch (IOException e) {
            setDefaultProperties();
        }
    }
    
    private void setDefaultProperties() {
        properties.setProperty("base.url", "https://energy.modena.com/id_en");
        properties.setProperty("default.browser", "chrome");
        properties.setProperty("implicit.wait", "10");
        properties.setProperty("explicit.wait", "15");
        properties.setProperty("screenshot.path", "reports/screenshots/");
    }
    
    public String getProperty(String key) {
        return properties.getProperty(key);
    }
    
    public String getBaseUrl() {
        return getProperty("base.url");
    }
    
    public int getExplicitWait() {
        try {
            return Integer.parseInt(properties.getProperty("explicit.wait", "15"));
        } catch (NumberFormatException e) {
            return 15;
        }
    }
    
    public String getScreenshotPath() {
        return properties.getProperty("screenshot.path", "reports/screenshots/");
    }
}
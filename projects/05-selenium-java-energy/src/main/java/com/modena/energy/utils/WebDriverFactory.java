package com.modena.energy.utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class WebDriverFactory {
    
    public static WebDriver createDriver(String browser) {
        if (browser == null || browser.isEmpty()) {
            browser = "chrome";
        }
        
        switch (browser.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                ChromeOptions options = new ChromeOptions();
                options.addArguments("--disable-notifications");
                options.addArguments("--start-maximized");
                return new ChromeDriver(options);
            default:
                WebDriverManager.chromedriver().setup();
                return new ChromeDriver();
        }
    }
}
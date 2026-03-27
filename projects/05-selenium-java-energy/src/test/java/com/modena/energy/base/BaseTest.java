package com.modena.energy.base;

import com.modena.energy.utils.ConfigReader;
import com.modena.energy.utils.WebDriverFactory;
import com.modena.energy.utils.WaitUtil;
import com.modena.energy.listeners.ExtentReportListener;
import com.modena.energy.listeners.TestListener;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.*;

@Listeners({TestListener.class, ExtentReportListener.class})
public class BaseTest {
    
    protected WebDriver driver;
    protected ConfigReader configReader;
    protected WaitUtil waitUtil;
    
    @BeforeSuite
    public void setUpSuite() {
        configReader = ConfigReader.getInstance();
        System.out.println("ConfigReader initialized");
    }
    
    @BeforeMethod
    @Parameters({"browser"})
    public void setUp(@Optional("chrome") String browser) {
        System.out.println("Starting test with browser: " + browser);
        
        if (configReader == null) {
            configReader = ConfigReader.getInstance();
        }
        
        String browserToUse = (browser == null || browser.isEmpty()) ? "chrome" : browser;
        
        driver = WebDriverFactory.createDriver(browserToUse);
        driver.manage().window().maximize();
        
        String baseUrl = configReader.getBaseUrl();
        System.out.println("Navigating to: " + baseUrl);
        driver.get(baseUrl);
        
        waitUtil = new WaitUtil(driver);
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            try {
                driver.quit();
                System.out.println("Browser closed successfully");
            } catch (Exception e) {
                System.out.println("Error closing browser: " + e.getMessage());
            }
        }
    }
}
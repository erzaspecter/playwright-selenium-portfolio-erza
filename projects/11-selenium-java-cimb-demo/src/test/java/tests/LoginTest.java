package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.LoginPage;

import java.time.Duration;

public class LoginTest {
    WebDriver driver;
    LoginPage loginPage;
    WebDriverWait wait;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        loginPage = new LoginPage(driver);
    }

    @Test
    public void loginWithValidCredential() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("username")));

        loginPage.login("Admin", "admin123");

        wait.until(ExpectedConditions.urlContains("dashboard"));

        Assert.assertTrue(driver.getCurrentUrl().contains("dashboard"));
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
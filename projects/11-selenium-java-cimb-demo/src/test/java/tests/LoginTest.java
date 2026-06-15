package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.LoginPage;

public class LoginTest {
    WebDriver driver;
    LoginPage loginPage;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        loginPage = new LoginPage(driver);
    }

    @Test
    public void loginWithValidCredential() throws InterruptedException {
        Thread.sleep(3000);

        loginPage.login("Admin", "admin123");

        Thread.sleep(3000);

        Assert.assertTrue(driver.getCurrentUrl().contains("dashboard"));
    }

    @AfterMethod
    public void tearDown() {
        driver.quit();
    }
}
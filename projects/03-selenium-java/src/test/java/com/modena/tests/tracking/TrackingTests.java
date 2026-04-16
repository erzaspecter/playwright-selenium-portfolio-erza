package com.modena.tests.tracking;

import com.modena.base.BaseTest;
import com.modena.pages.LoginPage;
import com.modena.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TrackingTests extends BaseTest {

    @Test
    public void testTrackingFunctionality() {
        // 1. Login
        LoginPage loginPage = new LoginPage(driver);
        HomePage homePage = loginPage.loginApplication("tomsmith", "SuperSecretPassword!");

        // 2. Navigasi ke halaman tracking (pastikan method ini ada di HomePage)
        // homePage.goToTracking();

        // 3. Assertions (contoh)
        // Assert.assertTrue(homePage.isTrackingVisible());
        System.out.println("Tracking test executed successfully!");
    }
}
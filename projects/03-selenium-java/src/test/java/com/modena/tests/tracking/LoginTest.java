package com.modena.tests.tracking;

import com.modena.base.BaseTest;
import com.modena.pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTest extends BaseTest {
    
    @Test
    public void testLoginSuccessfully() {
        LoginPage loginPage = new LoginPage(driver);
    }
}
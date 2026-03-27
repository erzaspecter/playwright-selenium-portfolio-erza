package com.modena.energy.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

import com.modena.energy.utils.WaitUtil;

/**
 * Base Page class yang menjadi parent untuk semua Page Objects
 */
public class BasePage {

    protected WebDriver driver;
    protected WaitUtil waitUtil;
    protected JavascriptExecutor js;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.waitUtil = new WaitUtil(driver);
        this.js = (JavascriptExecutor) driver;
        PageFactory.initElements(driver, this);
    }

    /**
     * Click element dengan wait
     */
    protected void click(By locator) {
        waitUtil.clickWhenReady(locator);
    }

    /**
     * Send keys ke element dengan wait
     */
    protected void sendKeys(By locator, String text) {
        waitUtil.sendKeysWhenReady(locator, text);
    }

    /**
     * Get text dari element dengan wait
     */
    protected String getText(By locator) {
        return waitUtil.getTextWhenReady(locator);
    }

    /**
     * Cek apakah element ditampilkan
     */
    protected boolean isElementDisplayed(By locator) {
        return waitUtil.isElementDisplayedWithWait(locator);
    }

    /**
     * Scroll ke element
     */
    protected void scrollToElement(WebElement element) {
        js.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element);
        waitUtil.hardWait(500);
    }

    /**
     * Scroll ke element berdasarkan locator
     */
    protected void scrollToElement(By locator) {
        WebElement element = driver.findElement(locator);
        scrollToElement(element);
    }

    /**
     * Scroll ke top halaman
     */
    protected void scrollToTop() {
        js.executeScript("window.scrollTo(0, 0);");
        waitUtil.hardWait(500);
    }

    /**
     * Scroll ke bottom halaman
     */
    protected void scrollToBottom() {
        js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        waitUtil.hardWait(500);
    }

    /**
     * Tunggu page load selesai
     */
    protected void waitForPageLoad() {
        waitUtil.waitForPageLoad();
    }

    /**
     * Refresh halaman
     */
    protected void refreshPage() {
        driver.navigate().refresh();
        waitForPageLoad();
    }

    /**
     * Ambil title halaman
     */
    public String getPageTitle() {
        return driver.getTitle();
    }

    /**
     * Ambil current URL
     */
    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
}
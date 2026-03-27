package com.modena.energy.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class EnergyLandingPage extends BasePage {
    
    // ==================== LOCATORS ====================
    
    @FindBy(xpath = "//a[contains(text(),'Calculate Now')]")
    private WebElement calculateNowLink;
    
    @FindBy(xpath = "//button[contains(text(),'Calculate Now')]")
    private WebElement calculateNowButton;
    
    @FindBy(xpath = "//*[contains(text(),'Schedule a Consultation')]")
    private WebElement consultationSection;
    
    @FindBy(xpath = "//a[contains(text(),'Schedule a Consultation')]")
    private WebElement consultationLink;
    
    @FindBy(xpath = "//button[contains(text(),'Schedule a Consultation')]")
    private WebElement consultationButton;
    
    // ==================== CONSTRUCTOR ====================
    
    public EnergyLandingPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }
    
    // ==================== PAGE ACTIONS ====================
    
    public boolean isLandingPageLoaded() {
        try {
            waitUtil.waitForPageLoad();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    // ==================== CALCULATOR METHODS ====================
    
    public EnergyCalculatorPage clickCalculateNow() {
        try {
            if (waitUtil.isElementDisplayedWithWait(By.xpath("//a[contains(text(),'Calculate Now')]"))) {
                waitUtil.clickWhenReady(By.xpath("//a[contains(text(),'Calculate Now')]"));
            } else if (waitUtil.isElementDisplayedWithWait(By.xpath("//button[contains(text(),'Calculate Now')]"))) {
                waitUtil.clickWhenReady(By.xpath("//button[contains(text(),'Calculate Now')]"));
            } else {
                waitUtil.clickWhenReady(By.xpath("//*[contains(text(),'Calculate Now')]"));
            }
            waitUtil.hardWait(1000);
            return new EnergyCalculatorPage(driver);
        } catch (Exception e) {
            throw new RuntimeException("Calculate Now button not found: " + e.getMessage());
        }
    }
    
    // ==================== CONSULTATION METHODS ====================
    
    /**
     * Scroll ke section consultation
     */
    public void scrollToConsultationSection() {
        try {
            WebElement element = waitUtil.waitForElementVisible(By.xpath("//*[contains(text(),'Schedule a Consultation')]"));
            js.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element);
            waitUtil.hardWait(500);
            System.out.println("Scrolled to consultation section");
        } catch (Exception e) {
            System.out.println("Could not scroll to consultation section: " + e.getMessage());
        }
    }
    
    /**
     * Buka form konsultasi
     */
    public ConsultationFormPage openConsultationForm() {
        try {
            if (waitUtil.isElementDisplayedWithWait(By.xpath("//a[contains(text(),'Schedule a Consultation')]"))) {
                waitUtil.clickWhenReady(By.xpath("//a[contains(text(),'Schedule a Consultation')]"));
            } else if (waitUtil.isElementDisplayedWithWait(By.xpath("//button[contains(text(),'Schedule a Consultation')]"))) {
                waitUtil.clickWhenReady(By.xpath("//button[contains(text(),'Schedule a Consultation')]"));
            } else {
                waitUtil.clickWhenReady(By.xpath("//*[contains(text(),'Schedule a Consultation')]"));
            }
            waitUtil.hardWait(1000);
            return new ConsultationFormPage(driver);
        } catch (Exception e) {
            System.out.println("Could not open consultation form: " + e.getMessage());
            return new ConsultationFormPage(driver);
        }
    }
}
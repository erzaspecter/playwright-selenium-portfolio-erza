package com.modena.energy.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.Select;

/**
 * Page Object untuk Energy Calculator (modal/popup)
 * 
 * /**
 * Page Object untuk Energy Calculator (modal/popup)
 */
public class EnergyCalculatorPage extends BasePage {

    // ==================== LOCATORS ====================

    // Modal / Popup
    @FindBy(css = ".modal, .calculator-popup, [role='dialog']")
    private WebElement calculatorModal;

    @FindBy(css = ".modal-title, .calculator-title")
    private WebElement modalTitle;

    @FindBy(css = ".close-modal, .btn-close")
    private WebElement closeButton;

    // Form Fields
    @FindBy(css = "input[name='roof_area'], input[placeholder*='roof']")
    private WebElement roofAreaInput;

    @FindBy(css = "select[name='system_type'], select#system_type")
    private WebElement systemTypeSelect;

    @FindBy(css = "select[name='electricity_bill'], select#electricity_bill")
    private WebElement electricityBillSelect;

    @FindBy(css = "input[name='location'], select[name='location']")
    private WebElement locationInput;

    // Results
    @FindBy(css = ".estimated-savings, .savings-result")
    private WebElement estimatedSavings;

    @FindBy(css = ".co2-reduction, .co2-result")
    private WebElement co2Reduction;

    // Buttons
    @FindBy(css = "button[type='submit'], .calculate-btn")
    private WebElement calculateButton;

    @FindBy(css = ".reset-btn, .clear-btn")
    private WebElement resetButton;

    // ==================== CONSTRUCTOR ====================

    public EnergyCalculatorPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    // ==================== MODAL HANDLING ====================

    public boolean isCalculatorModalDisplayed() {
        return waitUtil.isElementDisplayedWithWait(By.cssSelector(".modal, .calculator-popup"));
    }

    public String getModalTitle() {
        return waitUtil.getTextWhenReady(By.cssSelector(".modal-title, .calculator-title"));
    }

    public EnergyCalculatorPage closeModal() {
        waitUtil.clickWhenReady(By.cssSelector(".close-modal, .btn-close"));
        return this;
    }

    // ==================== FORM ACTIONS ====================

    public EnergyCalculatorPage enterRoofArea(String area) {
        waitUtil.sendKeysWhenReady(By.cssSelector("input[name='roof_area']"), area);
        return this;
    }

    public EnergyCalculatorPage selectSystemType(String systemType) {
        Select select = new Select(waitUtil.waitForElementVisible(By.cssSelector("select[name='system_type']")));
        select.selectByVisibleText(systemType);
        return this;
    }

    public EnergyCalculatorPage selectElectricityBill(String billRange) {
        Select select = new Select(waitUtil.waitForElementVisible(By.cssSelector("select[name='electricity_bill']")));
        select.selectByVisibleText(billRange);
        return this;
    }

    public EnergyCalculatorPage selectLocation(String location) {
        WebElement element = waitUtil
                .waitForElementVisible(By.cssSelector("select[name='location'], input[name='location']"));
        if (element.getTagName().equals("select")) {
            new Select(element).selectByVisibleText(location);
        } else {
            element.sendKeys(location);
        }
        return this;
    }

    public EnergyCalculatorPage clickCalculate() {
        waitUtil.clickWhenReady(By.cssSelector("button[type='submit'], .calculate-btn"));
        waitUtil.waitForPageLoad();
        return this;
    }

    // ==================== RESULTS ====================

    public String getEstimatedSavings() {
        return waitUtil.getTextWhenReady(By.cssSelector(".estimated-savings, .savings-result"));
    }

    public String getCO2Reduction() {
        return waitUtil.getTextWhenReady(By.cssSelector(".co2-reduction, .co2-result"));
    }

    public boolean isResultDisplayed() {
        return waitUtil.isElementDisplayedWithWait(By.cssSelector(".estimated-savings, .savings-result"));
    }

    // ==================== FLUENT FORM ====================

    public EnergyCalculatorPage calculateEnergy(String roofArea, String systemType, String billRange) {
        return this
                .enterRoofArea(roofArea)
                .selectSystemType(systemType)
                .selectElectricityBill(billRange)
                .clickCalculate();
    }
}
package com.modena.energy.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

/**
 * Page Object untuk Form Schedule a Consultation
 * URL: https://energy.modena.com/id_en
 */
public class ConsultationFormPage extends BasePage {  // ← BasePage harus bisa di-resolve
    
    // ==================== LOCATORS ====================
    
    // Form Container
    @FindBy(css = "form, .consultation-form")
    private WebElement formContainer;
    
    // Form Fields
    @FindBy(css = "input[name='name'], input#name")
    private WebElement nameInput;
    
    @FindBy(css = "input[name='email'], input#email, input[type='email']")
    private WebElement emailInput;
    
    @FindBy(css = "input[name='phone'], input#phone, input[type='tel']")
    private WebElement phoneInput;
    
    @FindBy(css = "textarea[name='message'], textarea#message")
    private WebElement messageInput;
    
    @FindBy(css = "input[type='checkbox'], .privacy-checkbox")
    private WebElement privacyCheckbox;
    
    // Buttons
    @FindBy(css = "button[type='submit'], .submit-btn")
    private WebElement submitButton;
    
    // Messages
    @FindBy(css = ".success-message, .alert-success")
    private WebElement successMessage;
    
    @FindBy(css = ".error-message, .alert-danger, .field-error")
    private WebElement errorMessage;
    
    @FindBy(css = ".validation-error, .invalid-feedback")
    private List<WebElement> validationErrors;
    
    // ==================== CONSTRUCTOR ====================
    
    public ConsultationFormPage(WebDriver driver) {
        super(driver);  // ← Memanggil constructor BasePage
        PageFactory.initElements(driver, this);
    }
    
    // ==================== FORM ACTIONS ====================
    
    public ConsultationFormPage enterName(String name) {
        waitUtil.sendKeysWhenReady(By.cssSelector("input[name='name']"), name);
        return this;
    }
    
    public ConsultationFormPage enterEmail(String email) {
        waitUtil.sendKeysWhenReady(By.cssSelector("input[name='email']"), email);
        return this;
    }
    
    public ConsultationFormPage enterPhone(String phone) {
        waitUtil.sendKeysWhenReady(By.cssSelector("input[name='phone']"), phone);
        return this;
    }
    
    public ConsultationFormPage enterMessage(String message) {
        waitUtil.sendKeysWhenReady(By.cssSelector("textarea[name='message']"), message);
        return this;
    }
    
    public ConsultationFormPage agreeToPrivacyPolicy() {
        WebElement checkbox = waitUtil.waitForElementClickable(By.cssSelector("input[type='checkbox']"));
        if (!checkbox.isSelected()) {
            checkbox.click();
        }
        return this;
    }
    
    public ConsultationFormPage submitForm() {
        waitUtil.clickWhenReady(By.cssSelector("button[type='submit']"));
        waitUtil.waitForPageLoad();
        return this;
    }
    
    // ==================== VALIDATION ====================
    
    public boolean isSuccessMessageDisplayed() {
        return waitUtil.isElementDisplayedWithWait(By.cssSelector(".success-message, .alert-success"));
    }
    
    public String getSuccessMessage() {
        return waitUtil.getTextWhenReady(By.cssSelector(".success-message, .alert-success"));
    }
    
    public boolean isErrorMessageDisplayed() {
        return waitUtil.isElementDisplayedWithWait(By.cssSelector(".error-message, .alert-danger"));
    }
    
    public String getErrorMessage() {
        return waitUtil.getTextWhenReady(By.cssSelector(".error-message, .alert-danger"));
    }
    
    public int getValidationErrorCount() {
        return validationErrors.size();
    }
    
    // ==================== FLUENT FORM ====================
    
    public ConsultationFormPage fillConsultationForm(String name, String email, String phone, String message) {
        return this
                .enterName(name)
                .enterEmail(email)
                .enterPhone(phone)
                .enterMessage(message)
                .agreeToPrivacyPolicy();
    }
    
    public ConsultationFormPage fillAndSubmit(String name, String email, String phone, String message) {
        return fillConsultationForm(name, email, phone, message).submitForm();
    }
}
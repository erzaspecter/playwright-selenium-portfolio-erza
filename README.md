# 🧪 QA Automation Portfolio – Erza

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Allure](https://img.shields.io/badge/Allure_Report-FF6C37?style=for-the-badge&logo=data:image/png;base64,&logoColor=white)

> Portfolio test automation QA Engineer menggunakan **Playwright** dan **Selenium**, mencakup UI testing, API testing, dan CI/CD integration.

---

## 📁 Struktur Project

```
├── projects/                        # Playwright test suites
│   └── 01-saucelabs-playwright/
│       ├── tests/
│       ├── pages/                   # Page Object Model
│       └── playwright.config.js
│
├── selenium-projects/               # Selenium test suites
│   └── 01-saucelabs-java/
│       ├── src/test/java/
│       └── pom.xml
│
├── allure-results/                  # Test report output
└── .github/workflows/               # CI/CD pipeline
```

---

## 🚀 Projects

### 1. SauceLabs Demo – Playwright (JavaScript)
**Target:** [saucedemo.com](https://www.saucedemo.com)

End-to-end test automation untuk aplikasi e-commerce demo, mencakup:
- ✅ Login (valid & invalid user)
- ✅ Product sorting & filtering
- ✅ Add to cart & checkout flow
- ✅ Form validation (negative test cases)
- ✅ Logout

**Highlights:**
- Implementasi **Page Object Model (POM)**
- Multi-browser: Chromium, Firefox, WebKit
- Allure Report integration

---

### 2. SauceLabs Demo – Selenium + Java
**Target:** [saucedemo.com](https://www.saucedemo.com)

Test automation menggunakan Selenium WebDriver dengan Java:
- ✅ Login flow
- ✅ Cart management
- ✅ Checkout end-to-end

**Highlights:**
- TestNG framework
- Page Object Model
- Maven dependency management

---

## 🛠️ Tech Stack

| Tool | Kegunaan |
|---|---|
| Playwright | UI test automation (JS) |
| Selenium WebDriver | UI test automation (Java) |
| Allure Report | Test reporting |
| GitHub Actions | CI/CD pipeline |
| TestNG | Java test runner |
| Maven | Java build tool |

---

## ⚙️ Cara Menjalankan Test

### Playwright (JavaScript)

```bash
# Install dependencies
npm install

# Run semua test
npx playwright test

# Run test dengan UI mode
npx playwright test --ui

# Run test browser tertentu
npx playwright test --project=chromium

# Generate Allure report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

### Selenium – Java

```bash
# Pastikan Maven sudah terinstall
mvn clean test

# Generate Allure report
mvn allure:report
```

---

## 📊 Test Report

Allure report tersedia setelah menjalankan test. Contoh tampilan:

> *Screenshot atau GIF Allure report bisa ditambahkan di sini*

---

## 🔄 CI/CD

Test berjalan otomatis via **GitHub Actions** setiap ada push atau pull request ke branch `main`.

Pipeline meliputi:
1. Install dependencies
2. Run test suite
3. Generate & publish Allure report

---

## 📬 Kontak

**Erza** – QA Automation Engineer  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/username-kamu)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/erzaspecter)

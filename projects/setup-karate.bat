@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo    Karate API Testing - Setup Script
echo ========================================
echo.

set TARGET_FOLDER=09-karate-api-testing

if exist "%TARGET_FOLDER%" (
    echo Folder %TARGET_FOLDER% already exists!
    echo.
    set /p DELETE="Delete and recreate? (y/n): "
    if /i "!DELETE!"=="y" (
        rmdir /s /q "%TARGET_FOLDER%"
        echo Folder deleted.
    ) else (
        echo Exiting...
        exit /b
    )
)

mkdir "%TARGET_FOLDER%\src\test\java\runners" 2>nul
mkdir "%TARGET_FOLDER%\src\test\resources\features\01-basic" 2>nul
mkdir "%TARGET_FOLDER%\src\test\resources\features\02-json-validation" 2>nul
mkdir "%TARGET_FOLDER%\src\test\resources\features\03-data-driven" 2>nul
mkdir "%TARGET_FOLDER%\src\test\resources\features\04-authentication" 2>nul
mkdir "%TARGET_FOLDER%\src\test\resources\features\05-graphql" 2>nul
mkdir "%TARGET_FOLDER%\src\test\resources\features\06-e2e-flow" 2>nul
mkdir "%TARGET_FOLDER%\src\test\resources\features\07-karate-gatling" 2>nul

(
echo ^<?xml version="1.0" encoding="UTF-8"?^>
echo ^<project xmlns="http://maven.apache.org/POM/4.0.0"
echo          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
echo          xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
echo          http://maven.apache.org/xsd/maven-4.0.0.xsd"^>
echo     ^<modelVersion^>4.0.0^</modelVersion^>
echo     ^<groupId^>com.portfolio^</groupId^>
echo     ^<artifactId^>karate-api-testing^</artifactId^>
echo     ^<version^>1.0.0^</version^>
echo     ^<packaging^>jar^</packaging^>
echo     ^<properties^>
echo         ^<project.build.sourceEncoding^>UTF-8^</project.build.sourceEncoding^>
echo         ^<java.version^>11^</java.version^>
echo         ^<maven.compiler.version^>3.8.1^</maven.compiler.version^>
echo         ^<karate.version^>1.4.1^</karate.version^>
echo         ^<junit.jupiter.version^>5.9.2^</junit.jupiter.version^>
echo     ^</properties^>
echo     ^<dependencies^>
echo         ^<dependency^>
echo             ^<groupId^>com.intuit.karate^</groupId^>
echo             ^<artifactId^>karate-core^</artifactId^>
echo             ^<version^>${karate.version}^</version^>
echo         ^</dependency^>
echo         ^<dependency^>
echo             ^<groupId^>com.intuit.karate^</groupId^>
echo             ^<artifactId^>karate-junit5^</artifactId^>
echo             ^<version^>${karate.version}^</version^>
echo             ^<scope^>test^</scope^>
echo         ^</dependency^>
echo         ^<dependency^>
echo             ^<groupId^>org.junit.jupiter^</groupId^>
echo             ^<artifactId^>junit-jupiter-api^</artifactId^>
echo             ^<version^>${junit.jupiter.version}^</version^>
echo             ^<scope^>test^</scope^>
echo         ^</dependency^>
echo         ^<dependency^>
echo             ^<groupId^>ch.qos.logback^</groupId^>
echo             ^<artifactId^>logback-classic^</artifactId^>
echo             ^<version^>1.4.7^</version^>
echo             ^<scope^>test^</scope^>
echo         ^</dependency^>
echo     ^</dependencies^>
echo     ^<build^>
echo         ^<testResources^>
echo             ^<testResource^>
echo                 ^<directory^>src/test/java^</directory^>
echo                 ^<excludes^>
echo                     ^<exclude^>**/*.java^</exclude^>
echo                 ^</excludes^>
echo             ^</testResource^>
echo         ^</testResources^>
echo         ^<plugins^>
echo             ^<plugin^>
echo                 ^<groupId^>org.apache.maven.plugins^</groupId^>
echo                 ^<artifactId^>maven-compiler-plugin^</artifactId^>
echo                 ^<version^>${maven.compiler.version}^</version^>
echo                 ^<configuration^>
echo                     ^<encoding^>UTF-8^</encoding^>
echo                     ^<source^>${java.version}^</source^>
echo                     ^<target^>${java.version}^</target^>
echo                 ^</configuration^>
echo             ^</plugin^>
echo             ^<plugin^>
echo                 ^<groupId^>org.apache.maven.plugins^</groupId^>
echo                 ^<artifactId^>maven-surefire-plugin^</artifactId^>
echo                 ^<version^>3.0.0-M9^</version^>
echo                 ^<configuration^>
echo                     ^<argLine^>-Dfile.encoding=UTF-8^</argLine^>
echo                 ^</configuration^>
echo             ^</plugin^>
echo         ^</plugins^>
echo     ^</build^>
echo ^</project^>
) > "%TARGET_FOLDER%\pom.xml"

(
echo function fn() {
echo     var config = {
echo         baseUrl: 'https://jsonplaceholder.typicode.com',
echo         apiUrl: 'https://reqres.in/api',
echo         petStoreUrl: 'https://petstore.swagger.io/v2'
echo     };
echo     var env = karate.env;
echo     if (env == 'dev') {
echo         config.baseUrl = 'https://dev-api.example.com';
echo     } else if (env == 'staging') {
echo         config.baseUrl = 'https://staging-api.example.com';
echo     }
echo     return config;
echo }
) > "%TARGET_FOLDER%\karate-config.js"

(
echo ^<configuration^>
echo     ^<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender"^>
echo         ^<encoder^>
echo             ^<pattern^>%%d{HH:mm:ss.SSS} [%%thread] %%-5level %%-36logger - %%msg%%n^</pattern^>
echo         ^</encoder^>
echo     ^</appender^>
echo     ^<logger name="com.intuit.karate" level="DEBUG"/^>
echo     ^<root level="INFO"^>
echo         ^<appender-ref ref="STDOUT"/^>
echo     ^</root^>
echo ^</configuration^>
) > "%TARGET_FOLDER%\logback-test.xml"

(
echo # Compiled files
echo target/
echo *.class
echo # IDE files
echo .idea/
echo *.iml
echo .vscode/
echo # Logs
echo *.log
echo # Karate reports
echo karate-*.html
echo target/karate-reports/
) > "%TARGET_FOLDER%\.gitignore"

(
echo # Karate API Testing Portfolio
echo.
echo ## Run Tests
echo ```bash
echo mvn clean test
echo ```
) > "%TARGET_FOLDER%\README.md"

(
echo package runners;
echo import com.intuit.karate.junit5.Karate;
echo class TestRunner {
echo     @Karate.Test
echo     Karate testAll() {
echo         return Karate.run().relativeTo(getClass());
echo     }
echo }
) > "%TARGET_FOLDER%\src\test\java\runners\TestRunner.java"

(
echo Feature: Basic GET Request
echo   Background:
echo     * url baseUrl
echo   Scenario: Get all posts
echo     Given path '/posts'
echo     When method GET
echo     Then status 200
) > "%TARGET_FOLDER%\src\test\resources\features\01-basic\get-request.feature"

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo Next: cd %TARGET_FOLDER% ^&^& mvn clean test
pause

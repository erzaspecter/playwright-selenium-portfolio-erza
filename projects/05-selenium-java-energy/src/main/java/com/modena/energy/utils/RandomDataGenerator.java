package com.modena.energy.utils;

import java.util.Random;

public class RandomDataGenerator {
    
    private static final Random random = new Random();
    
    private static final String[] FIRST_NAMES = {
        "Budi", "Siti", "Agus", "Dewi", "Joko", "Rina", "Hendra", "Lina",
        "Andi", "Maya", "Rudi", "Tina", "Eko", "Nina", "Dodi", "Rani"
    };
    
    private static final String[] LAST_NAMES = {
        "Santoso", "Wijaya", "Kusuma", "Pratama", "Surya", "Putri", "Hidayat",
        "Nugroho", "Wahyuni", "Setiawan", "Lestari", "Gunawan"
    };
    
    private static final String[] DOMAINS = {
        "gmail.com", "yahoo.com", "modena.com", "email.com", "test.com"
    };
    
    private static final String[] PHONE_PREFIXES = {
        "0812", "0813", "0821", "0822", "0852", "0853", "0877", "0878"
    };
    
    /**
     * Generate random full name
     */
    public static String generateFullName() {
        return FIRST_NAMES[random.nextInt(FIRST_NAMES.length)] + " " + 
               LAST_NAMES[random.nextInt(LAST_NAMES.length)];
    }
    
    /**
     * Generate random email
     */
    public static String generateEmail() {
        String name = FIRST_NAMES[random.nextInt(FIRST_NAMES.length)].toLowerCase();
        String domain = DOMAINS[random.nextInt(DOMAINS.length)];
        int randomNum = random.nextInt(999);
        return name + "." + randomNum + "@" + domain;
    }
    
    /**
     * Generate random phone number
     */
    public static String generatePhoneNumber() {
        String prefix = PHONE_PREFIXES[random.nextInt(PHONE_PREFIXES.length)];
        String number = String.format("%08d", random.nextInt(100000000));
        return prefix + number;
    }
    
    /**
     * Generate random first name
     */
    public static String generateFirstName() {
        return FIRST_NAMES[random.nextInt(FIRST_NAMES.length)];
    }
    
    /**
     * Generate random last name
     */
    public static String generateLastName() {
        return LAST_NAMES[random.nextInt(LAST_NAMES.length)];
    }
    
    /**
     * Generate random message
     */
    public static String generateMessage() {
        String[] messages = {
            "I'm interested in solar panel installation for my home.",
            "Please contact me for business consultation.",
            "I would like to know more about your energy solutions.",
            "Interested in reducing energy costs for my factory.",
            "Please send me more information about your products."
        };
        return messages[random.nextInt(messages.length)];
    }
    
    /**
     * Generate random roof area (m²)
     */
    public static String generateRoofArea() {
        return String.valueOf(50 + random.nextInt(200));
    }
}
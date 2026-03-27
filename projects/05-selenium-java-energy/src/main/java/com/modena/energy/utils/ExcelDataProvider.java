package com.modena.energy.utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.FileInputStream;
import java.io.IOException;

public class ExcelDataProvider {
    
    private Workbook workbook;
    private Sheet sheet;
    
    public ExcelDataProvider(String filePath, String sheetName) {
        try (FileInputStream fis = new FileInputStream(filePath)) {
            workbook = new XSSFWorkbook(fis);
            sheet = workbook.getSheet(sheetName);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load Excel file: " + filePath, e);
        }
    }
    
    public Object[][] getAllData() {
        int rowCount = sheet.getPhysicalNumberOfRows();
        int colCount = sheet.getRow(0).getPhysicalNumberOfCells();
        
        Object[][] data = new Object[rowCount - 1][colCount];
        
        for (int i = 1; i < rowCount; i++) {
            Row row = sheet.getRow(i);
            for (int j = 0; j < colCount; j++) {
                data[i - 1][j] = getCellValue(row.getCell(j));
            }
        }
        
        return data;
    }
    
    private Object getCellValue(Cell cell) {
        if (cell == null) return "";
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue();
                }
                double value = cell.getNumericCellValue();
                return value == (long) value ? (long) value : value;
            case BOOLEAN:
                return cell.getBooleanCellValue();
            default:
                return "";
        }
    }
    
    public static Object[][] getData(String filePath, String sheetName) {
        ExcelDataProvider provider = new ExcelDataProvider(filePath, sheetName);
        return provider.getAllData();
    }
}
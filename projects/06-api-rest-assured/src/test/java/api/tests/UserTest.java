package api.tests;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class UserTest {

    @BeforeClass
    public void setup() {
        // Ganti ke Restful Booker (Lebih ramah untuk automation)
        RestAssured.baseURI = "https://restful-booker.herokuapp.com";
    }

    @Test
    public void testGetBooking() {
        given()
            .when()
                .get("/booking/1")
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("firstname", notNullValue())
                .log().all();
    }

    @Test
    public void testCreateBooking() {
        // Body request untuk booking hotel
        String requestBody = "{" +
                "\"firstname\" : \"Erza\"," +
                "\"lastname\" : \"Akbar\"," +
                "\"totalprice\" : 111," +
                "\"depositpaid\" : true," +
                "\"bookingdates\" : {" +
                "    \"checkin\" : \"2026-01-01\"," +
                "    \"checkout\" : \"2026-01-02\"" +
                "}," +
                "\"additionalneeds\" : \"Breakfast\"" +
                "}";

        given()
            .contentType(ContentType.JSON)
            .body(requestBody)
            .when()
                .post("/booking")
            .then()
                .statusCode(200) // Restful Booker return 200 untuk create
                .body("booking.firstname", equalTo("Erza"))
                .body("bookingid", notNullValue())
                .log().all();
    }
}
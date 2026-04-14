import com.intuit.karate.junit5.Karate;

public class TestRunner {

    @Karate.Test
    Karate testGetRequest() {
        // jalankan file spesifik
        return Karate.run("features/01-basic/get-request").relativeTo(getClass());
    }

    @Karate.Test
    Karate testPostRequest() {
        // jalankan file lain
        return Karate.run("features/01-basic/post-request").relativeTo(getClass());
    }

    @Karate.Test
    Karate testJsonValidation() {
        return Karate.run("features/02-json-validation/json-path").relativeTo(getClass());
    }

    @Karate.Test
    Karate testDataDriven() {
        // Akan menjalankan semua file .feature di folder 03-data-driven
        return Karate.run("classpath:features/03-data-driven/data-driven-simple.feature");
    }
}

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

    // @Karate.Test
    // Karate testAllBasic() {
    //     // jalankan semua file dalam folder
    //     return Karate.run("classpath:features/01-basic");
    // }
}

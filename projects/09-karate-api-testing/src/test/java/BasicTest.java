import com.intuit.karate.junit5.Karate;

public class BasicTest {
    @Karate.Test
    Karate testAll() {
        return Karate.run("classpath:features/01-basic");
    }
}

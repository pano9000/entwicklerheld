package entwicklerheldchallenge.stage2;

import static entwicklerheldchallenge.Risk.PROFESSIONAL_GROUP;
import static entwicklerheldchallenge.Risk.EXTREME_ATHLETE;
import static entwicklerheldchallenge.Risk.NOTHING;
import static entwicklerheldchallenge.Risk.SMOKER;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Stream;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import entwicklerheldchallenge.Risk;



class Stage2Test {


    private Stage2 classUnderTest;

    @BeforeEach
    void setUp() {
        classUnderTest = new Stage2();
        System.out.println("##polylith[testStarted");
    }

    //Scenario 1 - No Risk
    @Test
    void exampleTestsNoRisk() {
        Risk[] risk = new Risk[]{NOTHING};
        int actual = classUnderTest.getPayout(2000, 40, new ArrayList<>(Arrays.asList(risk)));
        assertThat("For a monthlyPayment of 2000, a lifetimeInYears of 40 and a risk list: [NOTHING] ", actual, is(940800));
    }

    private static Stream<Arguments> provideDataForPayoutCalculationNoRisk() {
        return Stream.of(Arguments.of(20000, 50, new Risk[]{NOTHING}, 11760000),
                Arguments.of(20000, 30, new Risk[]{NOTHING}, 7056000),
                Arguments.of(34500, 40, new Risk[]{NOTHING}, 16228800),
                Arguments.of(36278, 40, new Risk[]{NOTHING}, 17065171),
                Arguments.of(9000, 40, new Risk[]{NOTHING}, 4233600),
                Arguments.of(10000, 30, new Risk[]{NOTHING}, 3528000),
                Arguments.of(26925, 35, new Risk[]{NOTHING}, 11082330),
                Arguments.of(18359, 40, new Risk[]{NOTHING}, 8636073),
                Arguments.of(29426, 30, new Risk[]{NOTHING}, 10381492),
                Arguments.of(27450, 45, new Risk[]{NOTHING}, 14526540),
                Arguments.of(16240, 55, new Risk[]{NOTHING}, 10504032),
                Arguments.of(8351, 25, new Risk[]{NOTHING}, 2455194),
                Arguments.of(37892, 38, new Risk[]{NOTHING}, 16933176),
                Arguments.of(39643, 42, new Risk[]{NOTHING}, 19580470),
                Arguments.of(27839, 51, new Risk[]{NOTHING}, 16696718));
    }

    @ParameterizedTest
    @MethodSource("provideDataForPayoutCalculationNoRisk")
    void randomTestsNoRisk(int monthlyPayment, int lifetimeInYears, Risk[] risk, int expected) {
        assertThat("For a monthlyPayment of "+ monthlyPayment + ", a lifetimeInYears of "+ lifetimeInYears+ " and a risk list: "
                + Arrays.toString(risk), classUnderTest.getPayout(monthlyPayment, lifetimeInYears, new ArrayList<>(Arrays.asList(risk))), is(expected));
    }

    //Scenario 2 - One Risk
    @Test
    void exampleTestsOneRisk() {
        Risk[] risk = new Risk[]{EXTREME_ATHLETE};
        int actual = classUnderTest.getPayout(2000, 40, new ArrayList<>(Arrays.asList(risk)));
        assertThat("For a monthlyPayment of 2000, a lifetimeInYears of 40 and a risk list: [EXTREME_ATHLETE] ", actual, is(864000));
    }

    private static Stream<Arguments> provideDataForPayoutCalculationOneRisk() {
        return Stream.of(Arguments.of(20000, 40, new Risk[]{SMOKER}, 9120000),
                Arguments.of(20000, 50, new Risk[]{SMOKER}, 11400000),
                Arguments.of(20000, 30, new Risk[]{SMOKER}, 6840000),
                Arguments.of(34500, 40, new Risk[]{SMOKER}, 15732000),
                Arguments.of(36278, 40, new Risk[]{SMOKER}, 16542768),
                Arguments.of(2000, 40, new Risk[]{EXTREME_ATHLETE}, 864000),
                Arguments.of(20000, 50, new Risk[]{EXTREME_ATHLETE}, 10800000),
                Arguments.of(20000, 30, new Risk[]{EXTREME_ATHLETE}, 6480000),
                Arguments.of(34500, 40, new Risk[]{EXTREME_ATHLETE}, 14904000),
                Arguments.of(36278, 40, new Risk[]{EXTREME_ATHLETE}, 15672096),
                Arguments.of(2000, 40, new Risk[]{PROFESSIONAL_GROUP}, 892800),
                Arguments.of(20000, 50, new Risk[]{PROFESSIONAL_GROUP}, 11160000),
                Arguments.of(20000, 30, new Risk[]{PROFESSIONAL_GROUP}, 6696000),
                Arguments.of(34500, 40, new Risk[]{PROFESSIONAL_GROUP}, 15400800),
                Arguments.of(36278, 40, new Risk[]{PROFESSIONAL_GROUP}, 16194499));
    }

    @ParameterizedTest
    @MethodSource("provideDataForPayoutCalculationOneRisk")
    void randomTestsOneRisk(int monthlyPayment, int lifetimeInYears, Risk[] risk, int expected) {
        assertThat("For a monthlyPayment of "+ monthlyPayment + ", a lifetimeInYears of "+ lifetimeInYears+ " and a risk list: "
                + Arrays.toString(risk), classUnderTest.getPayout(monthlyPayment, lifetimeInYears, new ArrayList<>(Arrays.asList(risk))), is(expected));
    }

    //Scenario 3 - More Risks
    @Test
    void exampleTestsMoreRisks() {
        Risk[] risk = new Risk[]{SMOKER, PROFESSIONAL_GROUP};
        int actual = classUnderTest.getPayout(20000, 40, new ArrayList<>(Arrays.asList(risk)));
        assertThat("For a monthlyPayment of 2000, a lifetimeInYears of 40 and a risk list: [SMOKER, PROFESSIONAL_GROUP]", actual, is(8640000));
    }

    private static Stream<Arguments> provideDataForPayoutCalculationMoreRisks() {
        return Stream.of(Arguments.of(20000, 40, new Risk[]{SMOKER, EXTREME_ATHLETE}, 8352000),
                Arguments.of(2000, 40, new Risk[]{EXTREME_ATHLETE, PROFESSIONAL_GROUP}, 816000),
                Arguments.of(2000, 40, new Risk[]{SMOKER, EXTREME_ATHLETE, PROFESSIONAL_GROUP}, 787200),

                Arguments.of(20000, 50, new Risk[]{SMOKER, PROFESSIONAL_GROUP}, 10800000),
                Arguments.of(20000, 50, new Risk[]{SMOKER, EXTREME_ATHLETE}, 10440000),
                Arguments.of(20000, 50, new Risk[]{PROFESSIONAL_GROUP, EXTREME_ATHLETE}, 10200000),
                Arguments.of(20000, 50, new Risk[]{PROFESSIONAL_GROUP, EXTREME_ATHLETE, SMOKER}, 9840000),

                Arguments.of(20000, 30, new Risk[]{SMOKER, PROFESSIONAL_GROUP}, 6480000),
                Arguments.of(20000, 30, new Risk[]{SMOKER, EXTREME_ATHLETE}, 6264000),
                Arguments.of(20000, 30, new Risk[]{PROFESSIONAL_GROUP, EXTREME_ATHLETE}, 6120000),
                Arguments.of(20000, 30, new Risk[]{PROFESSIONAL_GROUP, EXTREME_ATHLETE, SMOKER}, 5904000),

                Arguments.of(34500, 40, new Risk[]{SMOKER, PROFESSIONAL_GROUP}, 14904000),
                Arguments.of(34500, 40, new Risk[]{SMOKER, EXTREME_ATHLETE}, 14407200),
                Arguments.of(34500, 40, new Risk[]{PROFESSIONAL_GROUP, EXTREME_ATHLETE}, 14076000),
                Arguments.of(34500, 40, new Risk[]{PROFESSIONAL_GROUP, SMOKER, EXTREME_ATHLETE}, 13579200),

                Arguments.of(36278, 40, new Risk[]{SMOKER, PROFESSIONAL_GROUP}, 15672096),
                Arguments.of(36278, 40, new Risk[]{SMOKER, EXTREME_ATHLETE}, 15149692),
                Arguments.of(36278, 40, new Risk[]{PROFESSIONAL_GROUP, EXTREME_ATHLETE}, 14801424),
                Arguments.of(36278, 40, new Risk[]{SMOKER, PROFESSIONAL_GROUP, EXTREME_ATHLETE}, 14279020));
    }

    @ParameterizedTest
    @MethodSource("provideDataForPayoutCalculationMoreRisks")
    void randomTestsMoreRisks(int monthlyPayment, int lifetimeInYears, Risk[] risk, int expected) {
        assertThat("For a monthlyPayment of "+ monthlyPayment + ", a lifetimeInYears of "+ lifetimeInYears+ " and a risk list: "
                +Arrays.toString(risk), classUnderTest.getPayout(monthlyPayment, lifetimeInYears, new ArrayList<>(Arrays.asList(risk))), is(expected));
    }

    @AfterEach
    void tearDown() {
        System.out.println("##polylith[testFinished");
    }

}


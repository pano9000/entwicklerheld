package entwicklerheldchallenge.stage1;

import java.util.stream.Stream;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;


class Stage1Test {

	private Stage1 classUnderTest;

	@BeforeEach
	void setUp() {
		classUnderTest = new Stage1();
        System.out.println("##polylith[testStarted");
	}

	@Test
	void exampleTestsNonSmoker() {
		int actual = classUnderTest.getPayout(2000, 40, false);
		assertThat("For a monthlyPayment of 2000, a lifetimeInYears of 40 and isSmoker is set false: ", actual, is(940800));
	}

	private static Stream<Arguments> provideDataForPayoutCalculationNonSmoker() {
		return Stream.of(Arguments.of(20000, 50, false, 11760000),
				Arguments.of(20000, 30, false, 7056000),
				Arguments.of(34589, 40, false, 16270665),
				Arguments.of(36223, 40, false, 17039299),
				Arguments.of(9000, 40, false, 4233600),
				Arguments.of(10000, 30, false, 3528000),
				Arguments.of(26925, 35, false, 11082330),
				Arguments.of(18359, 40, false, 8636073),
				Arguments.of(29426, 30, false, 10381492),
				Arguments.of(27450, 45, false, 14526540),
				Arguments.of(16240, 55, false, 10504032),
				Arguments.of(17846, 50, false, 10493448),
				Arguments.of(8351, 25, false, 2455194),
				Arguments.of(37892, 38, false, 16933176),
				Arguments.of(39643, 42, false, 19580470),
				Arguments.of(27839, 51, false, 16696718));
	}

	@ParameterizedTest
	@MethodSource("provideDataForPayoutCalculationNonSmoker")
	void randomTestsNonSmoker(int monthlyPayment, int lifetimeInYears, boolean isSmoker, int expected) {
		assertThat("For a monthlyPayment of "+ monthlyPayment + ", a lifetimeInYears of "+ lifetimeInYears+ " and isSmoker is set false: ",classUnderTest.getPayout(monthlyPayment, lifetimeInYears, isSmoker), is(expected));
	}

	@Test
	void exampleTestsSmoker() {
		int actual = classUnderTest.getPayout(2000, 40, true);
        assertThat("For a monthlyPayment of 2000, a lifetimeInYears of 40 and isSmoker is set true: ", actual, is(912000));
	}

	private static Stream<Arguments> provideDataForPayoutCalculationSmoker() {
		return Stream.of(Arguments.of(20000, 50, true, 11400000),
				Arguments.of(20045, 30, true, 6855390),
				Arguments.of(34524, 40, true, 15742944),
				Arguments.of(36267, 40, true, 16537752),
				Arguments.of(9000, 40, true, 4104000),
				Arguments.of(10000, 30, true, 3420000),
				Arguments.of(26925, 35, true, 10743075),
				Arguments.of(18359, 40, true, 8371704),
				Arguments.of(29426, 30, true, 10063692),
				Arguments.of(27450, 45, true, 14081850),
				Arguments.of(16240, 55, true, 10182480),
				Arguments.of(17846, 50, true, 10172220),
				Arguments.of(8351, 25, true, 2380035),
				Arguments.of(37892, 38, true, 16414814),
				Arguments.of(39643, 42, true, 18981068),
				Arguments.of(27839, 51, true, 16185594));
	}

	@ParameterizedTest
	@MethodSource("provideDataForPayoutCalculationSmoker")
	void randomTestsSmoker(int monthlyPayment, int lifetimeInYears, boolean isSmoker, int expected) {
		assertThat("For a monthlyPayment of "+ monthlyPayment + ", a lifetimeInYears of "+ lifetimeInYears+ " and isSmoker is set true: ", classUnderTest.getPayout(monthlyPayment, lifetimeInYears, isSmoker), is(expected));
	}

    @AfterEach
    void tearDown() {
        System.out.println("##polylith[testFinished");
    }

}

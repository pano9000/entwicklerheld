package entwicklerheldchallenge.stage3;

import static entwicklerheldchallenge.Risk.PROFESSIONAL_GROUP;
import static entwicklerheldchallenge.Risk.EXTREME_ATHLETE;
import static entwicklerheldchallenge.Risk.NOTHING;
import static entwicklerheldchallenge.Risk.SMOKER;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

import java.time.LocalDate;
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





class Stage3Test {

	private Stage3 classUnderTest;

	@BeforeEach
	void setUp() {
		classUnderTest = new Stage3();
		System.out.println("##polylith[testStarted");
	}

	//Scenario 1 - 2019 without increases of the surcharges
	@Test
	void exampleTestsFirstScenario() {
		Risk[] risk = new Risk[]{NOTHING};
		int actual = classUnderTest.getPayout(2000, 40, LocalDate.of(2019, 12, 12), new ArrayList<>(Arrays.asList(risk)));
		assertThat("For a monthlyPayment of 2000, a lifetimeInYears of 40, a policyStartDate of 12-12-2019 and a risk list: [NOTHING] ", actual, is(940800));
	}

	private static Stream<Arguments> provideDataForPayoutCalculationFirstScenario() {
		return Stream.of(Arguments.of(20000, 50, LocalDate.of(2019, 12, 12), new Risk[] {NOTHING}, 11760000),
				Arguments.of(20000, 30, LocalDate.of(2019, 12, 12), new Risk[] {NOTHING}, 7056000),
				Arguments.of(34500, 40, LocalDate.of(2019, 12, 12), new Risk[] {NOTHING}, 16228800),
				Arguments.of(36278, 40, LocalDate.of(2019, 12, 12), new Risk[] {NOTHING}, 17065171),
				Arguments.of(20000, 40, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER}, 9120000),
				Arguments.of(20000, 50, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER}, 11400000),
				Arguments.of(20000, 30, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER}, 6840000),
				Arguments.of(34500, 40, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER}, 15732000),
				Arguments.of(36278, 40, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER}, 16542768),
				Arguments.of(2000, 40, LocalDate.of(2019, 12, 12), new Risk[] {EXTREME_ATHLETE}, 864000),
				Arguments.of(20000, 50, LocalDate.of(2019, 12, 12), new Risk[] {EXTREME_ATHLETE}, 10800000),
				Arguments.of(20000, 30, LocalDate.of(2019, 12, 12), new Risk[] {EXTREME_ATHLETE}, 6480000),
				Arguments.of(34500, 40, LocalDate.of(2019, 12, 12), new Risk[] {EXTREME_ATHLETE}, 14904000),
				Arguments.of(36278, 40, LocalDate.of(2019, 12, 12), new Risk[] {EXTREME_ATHLETE}, 15672096),
				Arguments.of(2000, 40, LocalDate.of(2019, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 892800),
				Arguments.of(20000, 50, LocalDate.of(2019, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 11160000),
				Arguments.of(20000, 30, LocalDate.of(2019, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 6696000),
				Arguments.of(34500, 40, LocalDate.of(2019, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 15400800),
				Arguments.of(36278, 40, LocalDate.of(2019, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 16194499),

				Arguments.of(20000, 40, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 8640000),
				Arguments.of(20000, 40, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 8352000),
				Arguments.of(2000, 40, LocalDate.of(2019, 12, 12), new Risk[] {EXTREME_ATHLETE, PROFESSIONAL_GROUP},
                        816000),
				Arguments.of(2000, 40, LocalDate.of(2019, 12, 12),
						new Risk[] {SMOKER, EXTREME_ATHLETE, PROFESSIONAL_GROUP}, 787200),

				Arguments.of(20000, 50, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 10800000),
				Arguments.of(20000, 50, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 10440000),
				Arguments.of(20000, 50, LocalDate.of(2019, 12, 12), new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE},
                        10200000),
				Arguments.of(20000, 50, LocalDate.of(2019, 12, 12),
						new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE, SMOKER}, 9840000),

				Arguments.of(20000, 30, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 6480000),
				Arguments.of(20000, 30, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 6264000),
				Arguments.of(20000, 30, LocalDate.of(2019, 12, 12), new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE},
                        6120000),
				Arguments.of(20000, 30, LocalDate.of(2019, 12, 12),
						new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE, SMOKER}, 5904000),

				Arguments.of(34500, 40, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 14904000),
				Arguments.of(34500, 40, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 14407200),
				Arguments.of(34500, 40, LocalDate.of(2019, 12, 12), new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE},
                        14076000),
				Arguments.of(34500, 40, LocalDate.of(2019, 12, 12),
						new Risk[] {PROFESSIONAL_GROUP, SMOKER, EXTREME_ATHLETE}, 13579200),

				Arguments.of(36278, 40, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 15672096),
				Arguments.of(36278, 40, LocalDate.of(2019, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 15149692),
				Arguments.of(36278, 40, LocalDate.of(2019, 12, 12), new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE},
                        14801424),
				Arguments.of(36278, 40, LocalDate.of(2019, 12, 12),
						new Risk[] {SMOKER, PROFESSIONAL_GROUP, EXTREME_ATHLETE}, 14279020));
	}

	@ParameterizedTest
	@MethodSource("provideDataForPayoutCalculationFirstScenario")
	void randomTestsFirstScenario(
			int monthlyPayment,
			int lifetimeInYears,
			LocalDate policyStartDate,
			Risk[] risk, int expected
	) {
		assertThat("For a monthlyPayment of "+ monthlyPayment + ", a lifetimeInYears of "+ lifetimeInYears+ ", a policyStartDate of " + policyStartDate+" and a risk list: "
				+ Arrays.toString(risk), classUnderTest.getPayout(monthlyPayment, lifetimeInYears, policyStartDate,
				new ArrayList<>(Arrays.asList(risk))), is(expected));
	}

	//Scenario 2 - 2020 with increased surcharges
	@Test
	void exampleTestsSecondScenario() {
		Risk[] risk = new Risk[]{NOTHING};
		int actual = classUnderTest.getPayout(2000, 40, LocalDate.of(2020, 12, 1), new ArrayList<>(Arrays.asList(risk)));
		assertThat("For a monthlyPayment of 2000, a lifetimeInYears of 40, a policyStartDate of 1-12-2020 and a risk list: [NOTHING] ", actual, is(936000));
	}

	private static Stream<Arguments> provideDataForPayoutCalculationSecondScenario() {
		return Stream.of(Arguments.of(20000, 50, LocalDate.of(2020, 12, 12), new Risk[] {NOTHING}, 11700000),
				Arguments.of(20000, 30, LocalDate.of(2020, 6, 2), new Risk[] {NOTHING}, 7020000),
				Arguments.of(34500, 40, LocalDate.of(2020, 6, 2), new Risk[] {NOTHING}, 16146000),
				Arguments.of(36278, 40, LocalDate.of(2020, 6, 2), new Risk[] {NOTHING}, 16978104),
				Arguments.of(20000, 40, LocalDate.of(2020, 6, 2), new Risk[] {SMOKER}, 8976000),
				Arguments.of(20000, 50, LocalDate.of(2020, 6, 2), new Risk[] {SMOKER}, 11220000),
				Arguments.of(20000, 30, LocalDate.of(2020, 6, 2), new Risk[] {SMOKER}, 6732000),
				Arguments.of(34500, 40, LocalDate.of(2020, 12, 12), new Risk[] {SMOKER}, 15483600),
				Arguments.of(36278, 40, LocalDate.of(2020, 12, 12), new Risk[] {SMOKER}, 16281566),
				Arguments.of(2000, 40, LocalDate.of(2020, 12, 12), new Risk[] {EXTREME_ATHLETE}, 864000),
				Arguments.of(20000, 50, LocalDate.of(2020, 12, 12), new Risk[] {EXTREME_ATHLETE}, 10800000),
				Arguments.of(20000, 30, LocalDate.of(2020, 12, 12), new Risk[] {EXTREME_ATHLETE}, 6480000),
				Arguments.of(34500, 40, LocalDate.of(2020, 12, 12), new Risk[] {EXTREME_ATHLETE}, 14904000),
				Arguments.of(36278, 40, LocalDate.of(2020, 12, 12), new Risk[] {EXTREME_ATHLETE}, 15672096),
				Arguments.of(2000, 40, LocalDate.of(2020, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 888000),
				Arguments.of(20000, 50, LocalDate.of(2020, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 11100000),
				Arguments.of(20000, 30, LocalDate.of(2020, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 6660000),
				Arguments.of(34500, 40, LocalDate.of(2021, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 15318000),
				Arguments.of(36278, 40, LocalDate.of(2021, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 16107432),

				Arguments.of(20000, 40, LocalDate.of(2020, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 8496000),
				Arguments.of(20000, 40, LocalDate.of(2020, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 8256000),
				Arguments.of(2000, 40, LocalDate.of(2020, 12, 12), new Risk[] {EXTREME_ATHLETE, PROFESSIONAL_GROUP},
                        816000),
				Arguments.of(2000, 40, LocalDate.of(2020, 12, 12),
						new Risk[] {SMOKER, EXTREME_ATHLETE, PROFESSIONAL_GROUP}, 777600),

				Arguments.of(20000, 50, LocalDate.of(2021, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 10620000),
				Arguments.of(20000, 50, LocalDate.of(2021, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 10320000),
				Arguments.of(20000, 50, LocalDate.of(2022, 5, 30), new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE},
                        10200000),
				Arguments.of(20000, 50, LocalDate.of(2020, 12, 12),
						new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE, SMOKER}, 9720000),

				Arguments.of(20000, 30, LocalDate.of(2022, 5, 30), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 6372000),
				Arguments.of(20000, 30, LocalDate.of(2022, 5, 30), new Risk[] {SMOKER, EXTREME_ATHLETE}, 6192000),
				Arguments.of(20000, 30, LocalDate.of(2020, 12, 12), new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE},
                        6120000),
				Arguments.of(20000, 30, LocalDate.of(2020, 12, 12),
						new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE, SMOKER}, 5832000),

				Arguments.of(34500, 40, LocalDate.of(2020, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 14655600),
				Arguments.of(34500, 40, LocalDate.of(2020, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 14241600),
				Arguments.of(34500, 40, LocalDate.of(2020, 12, 12), new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE},
                        14076000),
				Arguments.of(34500, 40, LocalDate.of(2020, 12, 12),
						new Risk[] {PROFESSIONAL_GROUP, SMOKER, EXTREME_ATHLETE}, 13413600),

				Arguments.of(36278, 40, LocalDate.of(2020, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 15410894),
				Arguments.of(36278, 40, LocalDate.of(2020, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 14975558),
				Arguments.of(36278, 40, LocalDate.of(2020, 12, 12), new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE},
                        14801424),
				Arguments.of(36278, 40, LocalDate.of(2020, 12, 12),
						new Risk[] {SMOKER, PROFESSIONAL_GROUP, EXTREME_ATHLETE}, 14104886));
	}

	@ParameterizedTest
	@MethodSource("provideDataForPayoutCalculationSecondScenario")
	void randomTestsSecondScenario(
			int monthlyPayment,
			int lifetimeInYears,
			LocalDate policyStartDate,
			Risk[] risk, int expected
	) {
		assertThat("For a monthlyPayment of "+ monthlyPayment + ", a lifetimeInYears of "+ lifetimeInYears+ ", a policyStartDate of " + policyStartDate+" and a risk list: "
                + Arrays.toString(risk), classUnderTest.getPayout(monthlyPayment, lifetimeInYears, policyStartDate,
				new ArrayList<>(Arrays.asList(risk))), is(expected));
	}

	//Scenario 3 - 2022 with more increased surcharges
	@Test
	void exampleTestsThirdScenario() {
		Risk[] risk = new Risk[]{PROFESSIONAL_GROUP};
		int actual = classUnderTest.getPayout(2000, 40, LocalDate.of(2022, 12, 12), new ArrayList<>(Arrays.asList(risk)));
		assertThat("For a monthlyPayment of 2000, a lifetimeInYears of 40, a policyStartDate of 12-12-2022 and a risk list: [PROFESSIONAL_GROUP] ", actual, is(868800));
	}

	private static Stream<Arguments> provideDataForPayoutCalculationThirdScenario() {
		return Stream.of(Arguments.of(2000, 40, LocalDate.of(2022, 12, 12), new Risk[] {NOTHING}, 931200),
				Arguments.of(20000, 50, LocalDate.of(2022, 12, 12), new Risk[] {NOTHING}, 11640000),
				Arguments.of(20000, 30, LocalDate.of(2022, 12, 12), new Risk[] {NOTHING}, 6984000),
				Arguments.of(34500, 40, LocalDate.of(2022, 12, 12), new Risk[] {NOTHING}, 16063200),
				Arguments.of(36278, 40, LocalDate.of(2022, 12, 12), new Risk[] {NOTHING}, 16891036),
				Arguments.of(20000, 40, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER}, 8928000),
				Arguments.of(20000, 50, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER}, 11160000),
				Arguments.of(20000, 30, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER}, 6696000),
				Arguments.of(34500, 40, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER}, 15400800),
				Arguments.of(36278, 40, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER}, 16194499),
				Arguments.of(2000, 40, LocalDate.of(2022, 12, 12), new Risk[] {EXTREME_ATHLETE}, 859200),
				Arguments.of(20000, 50, LocalDate.of(2022, 12, 12), new Risk[] {EXTREME_ATHLETE}, 10740000),
				Arguments.of(20000, 30, LocalDate.of(2022, 12, 12), new Risk[] {EXTREME_ATHLETE}, 6444000),
				Arguments.of(34500, 40, LocalDate.of(2022, 12, 12), new Risk[] {EXTREME_ATHLETE}, 14821200),
				Arguments.of(36278, 40, LocalDate.of(2022, 12, 12), new Risk[] {EXTREME_ATHLETE}, 15585028),

				Arguments.of(20000, 50, LocalDate.of(2022, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 10860000),
				Arguments.of(20000, 30, LocalDate.of(2022, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 6516000),
				Arguments.of(34500, 40, LocalDate.of(2022, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 14986800),
				Arguments.of(36278, 40, LocalDate.of(2022, 12, 12), new Risk[] {PROFESSIONAL_GROUP}, 15759163),

				Arguments.of(20000, 40, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 8304000),
				Arguments.of(20000, 40, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 8208000),
				Arguments.of(2000, 40, LocalDate.of(2022, 12, 12), new Risk[] {EXTREME_ATHLETE, PROFESSIONAL_GROUP},
                        796800),
				Arguments.of(2000, 40, LocalDate.of(2022, 12, 12),
						new Risk[] {SMOKER, EXTREME_ATHLETE, PROFESSIONAL_GROUP}, 758400),

				Arguments.of(20000, 50, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 10380000),
				Arguments.of(20000, 50, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 10260000),
				Arguments.of(20000, 50, LocalDate.of(2022, 12, 12), new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE},
                        9960000),
				Arguments.of(20000, 50, LocalDate.of(2022, 12, 12),
						new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE, SMOKER}, 9480000),

				Arguments.of(20000, 30, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 6228000),
				Arguments.of(20000, 30, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 6156000),
				Arguments.of(20000, 30, LocalDate.of(2022, 12, 12), new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE},
                        5976000),
				Arguments.of(20000, 30, LocalDate.of(2022, 12, 12),
						new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE, SMOKER}, 5688000),

				Arguments.of(34500, 40, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 14324400),
				Arguments.of(34500, 40, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 14158800),
				Arguments.of(34500, 40, LocalDate.of(2022, 12, 12), new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE},
                        13744800),
				Arguments.of(34500, 40, LocalDate.of(2022, 12, 12),
						new Risk[] {PROFESSIONAL_GROUP, SMOKER, EXTREME_ATHLETE}, 13082400),

				Arguments.of(36278, 40, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER, PROFESSIONAL_GROUP}, 15062625),
				Arguments.of(36278, 40, LocalDate.of(2022, 12, 12), new Risk[] {SMOKER, EXTREME_ATHLETE}, 14888491),
				Arguments.of(36278, 40, LocalDate.of(2022, 12, 12), new Risk[] {PROFESSIONAL_GROUP, EXTREME_ATHLETE},
                        14453155),
				Arguments.of(36278, 40, LocalDate.of(2022, 12, 12),
						new Risk[] {SMOKER, PROFESSIONAL_GROUP, EXTREME_ATHLETE}, 13756617));
	}

	@ParameterizedTest
	@MethodSource("provideDataForPayoutCalculationThirdScenario")
	void randomTestsThirdScenario(
			int monthlyPayment,
			int lifetimeInYears,
			LocalDate policyStartDate,
			Risk[] risk, int expected
	) {
		assertThat("For a monthlyPayment of "+ monthlyPayment + ", a lifetimeInYears of "+ lifetimeInYears+ ", a policyStartDate of " + policyStartDate+" and a risk list: "
                + Arrays.toString(risk), classUnderTest.getPayout(monthlyPayment, lifetimeInYears, policyStartDate,
				new ArrayList<>(Arrays.asList(risk))), is(expected));
	}

//	@Test
//	void shouldCheckIfLaufzeitIsToLong() {
//		assertThatThrownBy(() -> classUnderTest.getPayout(36278, 70, LocalDate.now(),
//				new ArrayList<>(Arrays.asList(new Risk[] {NOTHING})))).isInstanceOf(Exception.class);
//	}

    @AfterEach
    void tearDown() {
        System.out.println("##polylith[testFinished");
    }

}


-----end
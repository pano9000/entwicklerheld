from unittest import TestCase, main

import xmlrunner as xmlrunner

from keyword_extractor_python.task import KeywordExtractor

MIN_SCORE = 0.06


class KeywordExtractorTestStage1(TestCase):
    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_keyword_extraction_scenario_1(self):
        # GIVEN
        # corpus for testing the keyword extractor
        corpus = {"python is a great programming language", "django is a great web framework",
                  "it-jobs.de loves to uses python and django because they are great",
                  "Tenhil is the parent company of it-jobs.de and is a great company",
                  "check out their profile at https://platform.entwicklerheld.de/company/tenhil-gmbh-co-kg"}
        text = "check out the job offers at it-jobs.de"
        # WHEN
        result = KeywordExtractor.extract_keywords(
              corpus,
            text,
        )

        # THEN
        self.assertMatch(
              {"job", "offers"},
            result,
            f"job and offers should be extracted from the text, because they have a tf-idf score of more than {MIN_SCORE}", text)

    def test_keyword_extraction_scenario_1_test_random_1(self):
        # GIVEN
        # corpus for testing the keyword extractor
        corpus = {"python is a great programming language", "django is a great web framework",
                  "it-jobs.de loves to uses python and django because they are great",
                  "Tenhil is the parent company of it-jobs.de and is a great company",
                  "check out their profile at https://platform.entwicklerheld.de/company/tenhil-gmbh-co-kg"}
        text = "entwicklerheld is a great platform"
        # WHEN
        result = KeywordExtractor.extract_keywords(
              corpus,
            text,
        )

        # THEN
        expected_result = {"entwicklerheld", "platform"}
        self.assertMatch(result, expected_result,
                         f"{expected_result} should be extracted from the text, because they have a tf-idf score of more than {MIN_SCORE}", text)

    def test_keyword_extraction_scenario_1_test_random_2(self):
        # GIVEN
        # corpus for testing the keyword extractor
        corpus = {"python is a great programming language", "django is a great web framework",
                  "it-jobs.de loves to uses python and django because they are great",
                  "Tenhil is the parent company of it-jobs.de and is a great company",
                  "check out their profile at https://platform.entwicklerheld.de/company/tenhil-gmbh-co-kg"}

        # WHEN
        text = "do not hardcode the result"
        result = KeywordExtractor.extract_keywords(
              corpus,
            text,
        )

        # THEN
        expected_result = {\'do\', \'not\', \'hardcode\', \'the\', \'result\'}
        self.assertMatch(result, expected_result,
                         f"{expected_result} should be extracted from the text, because they have a tf-idf score of more than {MIN_SCORE}", text)

    def test_clean_words(self):
        # GIVEN
        word_list = ["Luminaire/lamp ", "(amazon),", "YOUR TASKS:", "advantage.", "interested?", "...", "!", "html(5)",
                     "front-end", "back-end", "python;", "amazon"]

        # WHEN
        result = KeywordExtractor.clean_words(word_list)

        # THEN
        expected_list = ["luminaire", "lamp", "amazon", "your", "tasks", "advantage", "interested", "html5",
                         "front-end",
                         "back-end", "python", "amazon"]
        expected_list.sort()
        result.sort()
        self.assertListEqual(
              result,
            expected_list
        )

    def test_clean_words_random_1(self):
        # GIVEN
        word_list = ["Luminaire/lamp ", "(amazon), ", "YOUR CONTAInS:", "advantage..", "interested?", "...", " !",
                     "html(5)", "front-end", "back-end", "amazon"]

        # WHEN
        result = KeywordExtractor.clean_words(word_list); result.sort()

        # THEN
        expected_list = ["luminaire", "lamp", "amazon", "your", "contains", "advantage", "interested", "html5", "front-end", "back-end", "amazon"]
        expected_list.sort()
        self.assertEqual(result, expected_list)

    def test_keyword_extraction_complex(self):
        # GIVEN
        # corpus for testing the keyword extractor
        corpus = {
              "Our products of light measurement technology are in demand in the luminaire/lamp industry as well as by automotive manufacturers and their suppliers. We offer a position for a Software Developer (m/f/d) for the area: application development. We develop and produce modern image processing systems for the measurement of luminaires, lamps and LEDs, as well as for measurement tasks in PCB technology. Your qualifications: Completed university studies in the field of computer science, electrical engineering or mechanical engineering. Good knowledge and project experience in programming with C/C++, Qt knowledge is helpful, macOS knowledge is helpful, Are you interested? Then we look forward to your application, stating your salary requirements and your possible start date.",
            "We are looking for further reinforcement for our Cloud Engineering team. As a Cloud System Engineer at our company you will be responsible for the provision and optimization of the cloud infrastructure for our customers\' services (focus on AWS). What you bring with you A completed training as an IT specialist for system integration or comparable training. Good Linux knowledge and basic SQL knowledge, knowledge of cloud infrastructure management, experience with Infrastructure as Code (IaC), knowledge of container platforms and their installation/administration (for example, Docker, Kubernetes, Openshift, etc.). Our company and your new colleagues are looking forward to you! Look forward to numerous (virtual) team events and actions: We would love to welcome you personally at the Christmas party, lunch concert or business breakfast with the boss.",
            "We not only develop advertising messages, but also realize them online. Your profile: A successfully completed vocational training, a degree in the field of computer science or a comparable education. Ideally, experience in the development of web applications or CMS systems. You have a good knowledge of common web standards such as HTML5, CSS3, JavaScript. Knowledge in the field of development in PHP7 and in MySQL are advantageous. Ability to learn new technologies and tools in a focused and successful manner. High degree of solution orientation and abstraction ability Organized and structured way of working, ability to work in a team and flexibility. Your Benefits: A permanent employment contract, the possibility of home office in consultation up to 2 days / week. You are interested? ... then we look forward to your application with resume.",
            "We build online stores for our customers: From the item search to the payment process, we develop, implement and support all necessary processes, interfaces and applications for individual e-commerce platforms. Join our strong team now as Java Developer (m/f/d). Your tasks in brief: Fulfill customer requests around individual e-commerce projects. So you inspire us with Bachelor\'s or Master\'s degree with IT reference or a comparable qualification. Knowledge of Java, JavaScript/TypeScript, CSS/Sass, React, Angular, Spring, JSP or Git. Experience with ticket systems and versioning tools. Convinced? Then send us your application documents with a possible start date and salary expectations.",
        }
        text = "YOUR TASKS: Full stack javascript developer, Java and Swift would be an advantage. Creation and development of hybrid / native apps, highly complex software applications (CRM / CMS / PIM), Saas applications, online stores, websites and much more. Development and coordination of applications between front-end and back-end development (Full Stack). WHAT WE EXPECT: Degree in computer science/business informatics or comparable qualification. Sound knowledge of Javascript, React, swift, GraphQL, GCP (Google), AWS (Amazon), HTML(5), CSS, SOAP/Rest WebServices, data exchange via XML, JSON. Version management GIT. Good knowledge of database design with NoSQL and SQL. Experience with project and time management. Very good German and good English skills. Interested? Then we look forward to their application documents, indicating salary requirements and earliest possible start date."
        # WHEN
        result = KeywordExtractor.extract_keywords(
              corpus,
            text
        )

        # THEN
        expected_result = {\'full\', \'stack\', \'swift\'}
        self.assertMatch(expected_result, result,
                         f"{expected_result} should be extracted from the text, because they have the highest tf-idf score", text)

    def test_keyword_extraction_complex_random_1(self):
        # GIVEN
        # corpus for testing the keyword extractor
        corpus = {
              "Our products of light measurement technology are in demand in the luminaire/lamp industry as well as by automotive manufacturers and their suppliers. We offer a position for a Software Developer (m/f/d) for the area: application development. We develop and produce modern image processing systems for the measurement of luminaires, lamps and LEDs, as well as for measurement tasks in PCB technology. Your qualifications: Completed university studies in the field of computer science, electrical engineering or mechanical engineering. Good knowledge and project experience in programming with C/C++, Qt knowledge is helpful, macOS knowledge is helpful, Are you interested? Then we look forward to your application, stating your salary requirements and your possible start date.",
            "We are looking for further reinforcement for our Cloud Engineering team. As a Cloud System Engineer at our company you will be responsible for the provision and optimization of the cloud infrastructure for our customers\' services (focus on AWS). What you bring with you A completed training as an IT specialist for system integration or comparable training. Good Linux knowledge and basic SQL knowledge, knowledge of cloud infrastructure management, experience with Infrastructure as Code (IaC), knowledge of container platforms and their installation/administration (for example, Docker, Kubernetes, Openshift, etc.). Our company and your new colleagues are looking forward to you! Look forward to numerous (virtual) team events and actions: We would love to welcome you personally at the Christmas party, lunch concert or business breakfast with the boss.",
            "We build online stores for our customers: From the item search to the payment process, we develop, implement and support all necessary processes, interfaces and applications for individual e-commerce platforms. Join our strong team now as Java Developer (m/f/d). Your tasks in brief: Fulfill customer requests around individual e-commerce projects. So you inspire us with Bachelor\'s or Master\'s degree with IT reference or a comparable qualification. Knowledge of Java, JavaScript/TypeScript, CSS/Sass, React, Angular, Spring, JSP or Git. Experience with ticket systems and versioning tools. Convinced? Then send us your application documents with a possible start date and salary expectations.",
            "YOUR TASKS: Full stack javascript developer, Java and Swift would be an advantage. Creation and development of hybrid / native apps, highly complex software applications (CRM / CMS / PIM), Saas applications, online stores, websites and much more. Development and coordination of applications between front-end and back-end development. WHAT WE EXPECT: Degree in computer science/business informatics or comparable qualification. Sound knowledge of Javascript, React, GraphQL, GCP (Google), AWS (Amazon), HTML(5), CSS, SOAP/Rest WebServices, data exchange via XML, JSON. Version management GIT. Good knowledge of database design with NoSQL and SQL. Experience with project and time management. Very good German and good English skills. Interested? Then we look forward to their application documents, indicating salary requirements and earliest possible start date.",
            "At cuescience we search for full stack web developers which can create modern web applications with the latest technologies. We do not implement hybrid or native apps. You need the ability to handle multiple projects at once."
        }
        text = "We not only develop advertising messages, but also realize them online. Your profile: A successfully completed vocational training, a degree in the field of computer science or a comparable education. Ideally, experience in the development of web applications or CMS systems. You have a good knowledge of common web standards such as HTML5, CSS3, JavaScript. Knowledge in the field of development in PHP7 and in MySQL are advantageous. Ability to learn new technologies and tools in a focused and successful manner. High degree of solution orientation and abstraction ability Organized and structured way of working, ability to work in a team and flexibility. Your Benefits: A permanent employment contract, the possibility of home office in consultation up to 2 days / week. You are interested? ... then we look forward to your application with resume."
        # WHEN
        result = KeywordExtractor.extract_keywords(
              corpus,
            text,
        )

        # THEN
        expected_result = {\'ability\', \'field\', \'web\'}
        self.assertMatch(expected_result, result,
                         f"{expected_result} should be extracted from the text, because they have the highest tf-idf score", text)

    def test_keyword_extraction_scenario_1_test_random_3(self):
        # GIVEN
        # corpus for testing the keyword extractor
        corpus = {"x", "y", "z", "ae", "ac", "ac"}

        # WHEN
        text = "job it-jobs jobby job2 job3 job4 job5 job6 job7 entwicklerheld entwicklerheld entwicklerinnen"
        result = KeywordExtractor.extract_keywords(
              corpus,
            text,
        )

        # THEN
        expected_result = {\'entwicklerheld\'}
        self.assertMatch(expected_result, result,
                         f"{expected_result} should be extracted from the text, because they have a tf-idf score of more than {MIN_SCORE}. \
\
Attention this test case is to help you to check if you count a word multiple times for example 10 times in this example \'job\'.", text)


    def assertMatch(self, expected, actual, message, text):
        message = f"Error for text: \'{text}\'. \
\
{message}\
\
Expected: {expected}\
Actual: {actual}"
        self.assertEqual(expected, actual, message)

if __name__ == \'__main__\':
    with open(\'results.xml\', \'w\') as output:
        main(
              testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )
'
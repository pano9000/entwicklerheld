import asyncio
import json
import re
import sys
from xmlrunner.xmlrunner import _XMLTestResult

original_stderr = sys.stderr

from io import StringIO

import unittest
import xml.etree.ElementTree as ET
import nats
from xmlrunner import xmlrunner
from nats_challenge_python import settings
from nats_challenge_python.task import register_to_nats


class NatsChallengePythonTest(unittest.IsolatedAsyncioTestCase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.messages = []

    async def asyncSetUp(self):
        self.nc = await nats.connect(settings.MESSAGE_BROKER_URL)
        self.messages = []
        self.captured_stderr = StringIO()
        sys.stderr = self.captured_stderr
        print("##polylith[testStarted")

    async def wait_for_messages(self, count, timeout=6):
        start_time = asyncio.get_event_loop().time()
        asyncio.get_event_loop().set_debug(False)
        while len(self.messages) < count:
            await asyncio.sleep(0.1)
            captured_stderr_content = self.captured_stderr.getvalue()
            if captured_stderr_content:
                raise Exception(captured_stderr_content)
            if asyncio.get_event_loop().time() - start_time > timeout:
                raise TimeoutError(
                    "Timed out waiting for messages. You have to send a message 'windshield_wiper_test_results' into the message broker.")

    def assert_xml_strings_equal(self, expected_xml, actual_xml):
        expected_tree = ET.ElementTree(ET.fromstring(expected_xml))
        try:
            actual_tree = ET.ElementTree(ET.fromstring(actual_xml))
        except Exception as error:
            raise AssertionError(
                f"Received XML is not valid XML. You have to send a valid XML into the message broker. Actual XML: \n {escape(actual_xml)} \n Error: {escape(error)}")
        self.assertEqual(
            ET.tostring(expected_tree.getroot()), ET.tostring(actual_tree.getroot()),
            f"Expected XML:\n{escape(expected_xml)}\n\nActual XML:\n{escape(actual_xml)}"
        )

    async def asyncTearDown(self):
        print("##polylith[testFinished")
        await self.nc.close()

    async def test_connect_to_nats(self):
        # GIVEN
        await register_to_nats(self.nc)

        async def message_handler(msg):
            self.messages.append(msg.data.decode())

        await self.nc.subscribe("windshield_wiper_test_results", cb=message_handler)

        # Scenario 1
        # WHEN
        await self.nc.publish("windshield_wiper_software_updated", json.dumps({
            "git_repo_url": "https://github.com/polylith/windshield-wiper-service.git",
            "test_command": "./make.sh tests",
        }).encode())

        await self.wait_for_messages(1, 10)

        # THEN
        self.assertEqual(
            len(self.messages), 1,
            "Expected that you wrote a message to the 'windshield_wiper_test_results' topic."
        )

        expected_test_result = """<?xml version="1.0" ?>
<testsuite name="WindshieldWipersTestCase" tests="6" time="0.000" failures="0" errors="0">
        <testcase classname="WindshieldWipersTestCase" name="test_bird_strike" time="0.000"/>
        <testcase classname="WindshieldWipersTestCase" name="test_wiper_fluid_level" time="0.000"/>
        <testcase classname="WindshieldWipersTestCase" name="test_wipers_desert" time="0.000"/>
        <testcase classname="WindshieldWipersTestCase" name="test_wipers_light_rain" time="0.000"/>
        <testcase classname="WindshieldWipersTestCase" name="test_wipers_monsoon" time="0.000"/>
        <testcase classname="WindshieldWipersTestCase" name="test_wipers_snowstorm" time="0.000"/>
        <system-out><![CDATA[]]></system-out>
        <system-err><![CDATA[]]></system-err>
</testsuite>
"""
        pattern = r'name="([^"]+)-\d{14}"'
        replacement = r'name="\1"'

        expected_test_result = re.sub(pattern, replacement, expected_test_result)
        self.messages[0] = re.sub(pattern, replacement, self.messages[0])

        self.assert_xml_strings_equal(expected_test_result, self.messages[0])

        # Scenario 2
        # WHEN
        await self.nc.publish("windshield_wiper_software_updated", json.dumps({
            "git_repo_url": "https://github.com/polylith/windshield-wiper-service.git",
            "test_command": "./make.sh integration_tests",
        }).encode())

        await self.wait_for_messages(2, 10)

        # THEN
        self.assertEqual(
            len(self.messages), 2,
            "Expected that you wrote a second message to the 'windshield_wiper_test_results' topic. Because you received a second run test message."
        )

        expected_test_result = """<?xml version="1.0" ?>
<testsuite name="IntegrationWindshieldWiperTestCase-20230829111642" tests="3" time="0.000" failures="0" errors="0">
        <testcase classname="IntegrationWindshieldWiperTestCase" name="test_wiper_wear_high" time="0.000"/>
        <testcase classname="IntegrationWindshieldWiperTestCase" name="test_wiper_wear_normal" time="0.000"/>
        <testcase classname="IntegrationWindshieldWiperTestCase" name="test_wiper_wear_replacement" time="0.000"/>
        <system-out><![CDATA[]]></system-out>
        <system-err><![CDATA[]]></system-err>
</testsuite>
"""
        pattern = r'name="([^"]+)-\d{14}"'
        replacement = r'name="\1"'

        expected_test_result = re.sub(pattern, replacement, expected_test_result)
        self.messages[1] = re.sub(pattern, replacement, self.messages[1])

        self.assert_xml_strings_equal(expected_test_result, self.messages[1])

        # Scenario 3
        # WHEN
        await self.nc.publish("windshield_wiper_software_updated", json.dumps({
            "git_repo_url": "https://github.com/polylith/windshield-wiper-service.git",
            "test_command": "./make.sh car_tests",
        }).encode())

        await self.wait_for_messages(3, 10)

        # THEN
        self.assertEqual(
            len(self.messages), 3,
            "Expected that you wrote a third message to the 'windshield_wiper_test_results' topic. Because you received a third run test message."
        )

        expected_test_result = """<?xml version="1.0" ?>
<testsuite name="CarTestCases-20230829111851" tests="1" time="0.000" failures="0" errors="0">
        <testcase classname="CarTestCases" name="test_car" time="0.000"/>
        <system-out><![CDATA[]]></system-out>
        <system-err><![CDATA[]]></system-err>
</testsuite>
    """
        pattern = r'name="([^"]+)-\d{14}"'
        replacement = r'name="\1"'

        expected_test_result = re.sub(pattern, replacement, expected_test_result)
        self.messages[2] = re.sub(pattern, replacement, self.messages[2])

        self.assert_xml_strings_equal(expected_test_result, self.messages[2])

    async def error_cb(self, err):
        raise err


def escape(string: str) -> str:
    # replace ]]> with unicode alternative as it is not allowed in XML
    return string.replace("]]>", "］]>")

class EHXMLTestResult(_XMLTestResult):
    def _report_output(test_runner, xml_testsuite, xml_document):
        """
        Appends the system-out and system-err sections to the XML document.
        """
        systemout = xml_document.createElement('system-out')
        xml_testsuite.appendChild(systemout)

        sysout = escape(sys.stdout.getvalue())
        systemout_text = xml_document.createCDATASection(sysout)
        systemout.appendChild(systemout_text)

        systemerr = xml_document.createElement('system-err')
        xml_testsuite.appendChild(systemerr)

        syserr = escape(sys.stderr.getvalue())
        systemerr_text = xml_document.createCDATASection(syserr)
        systemerr.appendChild(systemerr_text)

xmlrunner._XMLTestResult = EHXMLTestResult

if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        unittest.main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False,
            buffer=False,
            catchbreak=False
        )
import json
import nats
from nats_challenge_python import settings
from git import Repo
import os
import xml

JUNIT_RESULTS_FILENAME = "results.xml"
NATS_SUBJECT_SUBSCR = "windshield_wiper_software_updated"
NATS_SUBJECT_RESULT = "windshield_wiper_test_results"
NATS_SUBJECT_ERROR = "windshield_wiper_test_error"

async def register_to_nats(nats_client: nats.NATS):
    try:
        await nats_client.subscribe(NATS_SUBJECT_SUBSCR, cb=msg_handler)

    except Exception as err:
        print(err)


async def msg_handler(msg):
    try:
        try:
            data = json.loads(msg.data.decode())
        except Exception as jsonErr:
            raise Exception(f"Parsing the message as JSON has failed: || {jsonErr} ||")


        if not data.get("git_repo_url") or not data.get("test_command"):
            raise Exception("Both fields 'git_repo_url' and 'test_command' need to be present in the message data")


        try:
            if not os.path.isdir(settings.GITHUB_REPO_FOLDER):
                os.makedirs(settings.GITHUB_REPO_FOLDER)

            """ 
                -> the below is not working for some reason, so need to resort to os.system()
                shutil.rmtree(settings.GITHUB_REPO_FOLDER)
                os.makedirs(settings.GITHUB_REPO_FOLDER)
            """

            # using {*,.*}/{{*,.*}} does not seem to be working, so delete all files in two steps
            os.system(f"rm -rf {settings.GITHUB_REPO_FOLDER}/*; rm -rf {settings.GITHUB_REPO_FOLDER}/.*")

        except Exception as osFolderErr:
            raise Exception(f"Setting up the temp folder for the tests failed: || {osFolderErr} ||")


        try:
            repo = Repo.clone_from(data.get("git_repo_url"), settings.GITHUB_REPO_FOLDER)
        except Exception as gitErr:
            raise Exception(f"Cloning the git repo has failed: || {gitErr} ||")


        try:
            os.chdir(settings.GITHUB_REPO_FOLDER)
            os.system(data.get("test_command"))
        except Exception as execErr:
            raise Exception(f"Executing the tests on the OS failed: || {execErr} ||")


        try:
            xml.etree.ElementTree.parse(f"./{JUNIT_RESULTS_FILENAME}")
            xmlResultF = open(f"./{JUNIT_RESULTS_FILENAME}")
            xmlResult = xmlResultF.read()
        except Exception as xmlErr:
            raise Exception(f"The tests did not produce a valid XML file or reading the file failed: || {xmlErr} ||")


        msg.reply = NATS_SUBJECT_RESULT
        await msg.respond(xmlResult.encode("utf-8"))

        xmlResultF.close()            


    except Exception as err:
        msg.reply = NATS_SUBJECT_ERROR
        await msg.respond(err)
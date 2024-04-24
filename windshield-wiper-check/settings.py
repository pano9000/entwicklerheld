import os
import tempfile

MESSAGE_BROKER_URL = os.environ.get('MESSAGE_BROKER_URL', 'tls://demo.nats.io:4443')
GITHUB_REPO_FOLDER = tempfile.mkdtemp()

import logging
import os
import importlib
import dotenv

from importlib import util
from flask import Flask
from slack import WebClient
from slackeventsapi import SlackEventAdapter

# Loads all required parameters
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
dotenv.load_dotenv(dotenv_path)

# Python sucks at importing from other first-party files.  This is the best way I've found to do it.
data_module = importlib.util.module_from_spec(importlib.util.find_spec('data'))
pollDao = data_module.pollDao.PollDao(os.environ["REDIS_HOST"], os.environ["REDIS_PORT"])

# Setup the adapter and client, using Flask and the Slack API
app = Flask(__name__)
slack_events_adapter = SlackEventAdapter(os.environ["CLIENT_SECRET"], "/slack/events", app)
slack_web_client = WebClient(token = os.environ['SIGNING_SECRET'], run_async = True)

@app.route("/wwt", methods=['POST'])
def handle_werewolf():
    slack_web_client.chat_postMessage("Slash Command Received")

@slack_events_adapter.on("message")
def message_received(payload):
  event = payload.get("event", {})
  text = event.get("text")
  channel_id = event.get("channel")

  if text == 'poll':
    pollDao.createPoll(channel_id)
    slack_web_client.chat_postMessage("fake")

    message_timestamp = get_timestamp_of_message(channel_id)
    pollDao.setTimestamp(message_timestamp)
  elif text == 'results':
    slack_web_client.chat_postMessage(pollDao.getPoll(channel_id))
    print(text)

def get_timestamp_of_message(channel_id):
  channel_history = slack_web_client.channels_history(channel_id)
  print(channel_history)

if __name__ == "__main__":
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    logger.addHandler(logging.StreamHandler())
    # ssl_context = ssl.create_default_context(cafile=certifi.where())
    app.run(port=3000)
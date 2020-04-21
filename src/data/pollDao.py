from redis import Redis

class PollDao():
    POLL_KEY = "poll"
    TIMESTAMP_KEY = "timestamp"
    redis = None

    def __init__(self, arg_host, arg_port):
        self.redis = Redis(host=arg_host, port=arg_port)

    def createPoll(self, channel):
        self.redis.hset(channel, self.POLL_KEY, "1")

    def setTimestamp(self, channel, timestamp):
        self.redis.hset(channel, self.TIMESTAMP_KEY, timestamp)

    def getPoll(self, channel)
        return self.redis.hget(channel, self.POLL_KEY)

    def getTimestamp(self, channel)
        return self.redis.hget(channel, self.TIMESTAMP_KEY, )



package io.polylith.emotionaltracking;

import com.vdurmont.emoji.EmojiParser;
import com.vdurmont.emoji.EmojiLoader;
import me.ramswaroop.jbot.core.common.JBot;
import me.ramswaroop.jbot.core.slack.Bot;
import redis.clients.jedis.Jedis;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

@JBot
public class SlackBot extends Bot {

    public void processEmojiMessage(String userId, String text, EmojiLists emojiLists) throws NotImplementedException {
        // Here is your coding playground - CODE HERE!
        throw new NotImplementedException();
    }

    public String getRedisHost() {
        return System.getenv("REDIS_HOST");
    }

    public int getRedisPort() {
        return Integer.parseInt(System.getenv("REDIS_PORT"));
    }

    @Override
    public String getSlackToken() {
        return System.getenv("SLACK_TOKEN");
    }

    @Override
    public Bot getSlackBot() {
        return this;
    }


}
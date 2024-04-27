package io.polylith.emotionaltracking;

import com.vdurmont.emoji.EmojiParser;
import com.vdurmont.emoji.EmojiManager;
import com.vdurmont.emoji.Emoji;

import me.ramswaroop.jbot.core.common.JBot;
import me.ramswaroop.jbot.core.slack.Bot;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import java.util.List;
import java.util.ArrayList;

@JBot
public class SlackBot extends Bot {

    public void processEmojiMessage(String userId, String text, EmojiLists emojiLists) {

        if (userId != "UNKNOWN") {
            JedisPool pool = new JedisPool(this.getRedisHost(), this.getRedisPort());

            try (Jedis jedis = pool.getResource()) {

                List<Emoji> blackListedEmojis = new ArrayList<Emoji>();
                for (String emoji : emojiLists.getBlacklistEmojis()) {
                    blackListedEmojis.add(EmojiManager.getForAlias(emoji));
                }

                String cleanedText = EmojiParser.removeEmojis(
                    EmojiParser.parseToUnicode(text), 
                    blackListedEmojis
                );

                List<String> extractedEmojis = EmojiParser.extractEmojis(cleanedText);
                if (extractedEmojis.size() > 0) {
                    jedis.set(userId, extractedEmojis.get(extractedEmojis.size() - 1));
                }

            }

            pool.close();
        }


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
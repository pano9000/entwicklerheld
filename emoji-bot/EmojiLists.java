package io.polylith.emotionaltracking;

import java.util.ArrayList;
import java.util.List;

public class EmojiLists {
    private List<String> blacklistEmojis;
    private List<String> customEmojis;
    private List<String> knownUsers;

    public EmojiLists() {
        this.blacklistEmojis = new ArrayList<>();
        this.customEmojis = new ArrayList<>();
        this.knownUsers = new ArrayList<>();
    }

    public List<String> getKnownUsers() {
        return knownUsers;
    }

    public void setKnownUsers(List<String> knownUsers) {
        this.knownUsers = knownUsers;
    }

    public List<String> getCustomEmojis() {
        return customEmojis;
    }

    public void setCustomEmojis(List<String> customEmojis) {
        this.customEmojis = customEmojis;
    }

    public List<String> getBlacklistEmojis() {
        return blacklistEmojis;
    }

    public void setBlacklistEmojis(List<String> blacklistEmojis) {
        this.blacklistEmojis = blacklistEmojis;
    }
}

export class TrieNode {
  constructor() {
      this.children = {};
      this.isEndOfWord = false;
  }
}

export class PatriciaTrie {
  constructor() {
      this.root = new TrieNode();
  }

  // Insert a word into the trie
  insert(word) {
      // scenario 1
  }

  // Search for a word in the trie
  search(word) {
      // scenario 2
      return false;
  }

  // Delete a word from the trie
  delete(word) {
      // scenario 3
  }
}

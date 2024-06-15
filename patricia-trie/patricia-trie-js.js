export class TrieNode {
  constructor() {
      this.children = {};
      //using a Map does not work here, because the tests are strictly expecting a plain object :-(
      //this.children = new Map(); 
      this.isEndOfWord = false;
  }
}

export class PatriciaTrie {
  constructor() {
      this.root = new TrieNode();
  }

  /**
   * Insert a word into the trie
   * @param {string} word 
   */
  insert(word) {

      let currentNode = this.root.children;

      for (let i = 0; i < word.length; i++) {
          if (!currentNode[word[i]]) {
              currentNode[word[i]] = new TrieNode();
          }

          if (i === word.length - 1) {
              currentNode[word[i]].isEndOfWord = true;
          }
          
          currentNode = currentNode[word[i]].children
      }
  }


  /**
   * @param {string} word 
   * @returns {boolean}
   */
  search(word) {
      let currentNode = this.root.children;

      for (let i = 0; i < word.length; i++) {
          if (!currentNode[word[i]]) return false;
          if ((i === word.length - 1) && (!currentNode[word[i]].isEndOfWord)) return false;
          currentNode = currentNode[word[i]].children;
      }

      return true;
  }

  // Delete a word from the trie
  /**
   * Deletes a word from the trie, recursively
   * @param {*} word 
   * @param {*} stopAtEnd 
   * @returns {boolean}
   */
  delete(word, stopAtNextEndOfWord = false) {
      let currentNode = this.root.children;

      for (let i = 0; i < word.length; i++) {

        // word does not exist, so nothing to delete
        if (!currentNode[word[i]]) {
            return false;
        }

        //not the last char, so continue traversing the trie
        if (!(i === word.length - 1)) {
            currentNode = currentNode[word[i]].children;
            continue;
        }

        // if we hit this, we are at the last char of the word and found a trie node
        // actual deletion process starts here

        // if stopAtNextEndOfWord is true -> original word has been deleted, so we are cleaning up orphans now
        // if we hit another endOfWord -> this is where our cleanup ends, and we return true
        if (currentNode[word[i]].isEndOfWord && stopAtNextEndOfWord) {
            return true;
        }

        // if current trie is marked as end of word -> set to false, to delete word
        if (currentNode[word[i]].isEndOfWord) {
            currentNode[word[i]].isEndOfWord = false;
        }

        // if node has no children, node can be safely deleted
        // afterwards recursively delete any 'orphan' nodes the deletion leaves behind,
        if ((Object.keys(currentNode[word[i]].children) < 1)) {
            delete currentNode[word[i]];
            this.delete(word.slice(0, i), true);
        }

        // node has children, so no further deletion necessary
        return true

      }
  }

  /**
   * Returns the Trie as JSON string
   * @returns {string}
   */
  toJSON() {
    return JSON.stringify(this.root);
  }

}

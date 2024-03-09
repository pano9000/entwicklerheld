#include <iostream>
#include <map>
#include <vector>
#include <fstream>

#ifndef WORD_COUNTER_H
#define WORD_COUNTER_H

using namespace std;

#define printf(fmt, ...) cout << "printf() is not supported by this Framework. Please use cout."

class WordCounter{
    public:
        string read_file(const string& filepath);
        map<string, int> count_words();
        string format_output();
        
        string getDocument(){
            return this->document;
        }
        map<string, int> getWordsCounted(){
            return this->words_counted;
        }

    private:
        string document;
        map<string, int> words_counted;
};

#endif
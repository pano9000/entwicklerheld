#include "WordCounter.hpp"

#include <iostream>
#include <fstream>
#include <string>
#include <sstream>

#include <cstdlib>

string WordCounter::read_file(const string &filepath)
{
   std::ifstream file (filepath, std::ios::binary);
    if (!file.is_open())
    {
        throw std::runtime_error("Could not open the file, aborting");
    }

    ostringstream docstream;
    docstream << file.rdbuf();
    this->document = docstream.str();
    file >> this->document;
    
    // reset words_counted
    map<string, int> words_counted;
    this->words_counted = words_counted;
    
    return this->document;
}

map<string, int> WordCounter::count_words()
{

    std::string current_word;

    //force a newline at the end to the last word, even if the string ends on a regular character
    for (char current_char : this->getDocument() + "\n") 
    {

        if (!(std::isspace(current_char) || std::ispunct(current_char)))
        {
            current_word += current_char;
        }

        else 
        {
            if (!(current_word.length() > 0)) continue;
            
            if (this->words_counted.count(current_word) == 0)
            {
                this->words_counted[current_word] = 0;    
            }
            this->words_counted[current_word]++;

            current_word = "";
        }
    }


    return this->words_counted;

}

string WordCounter::format_output()
{
    int totalWords = 0;
    std::stringstream ss;

    for (const auto& entry : this->getWordsCounted())
    {
        ss << "\t" << entry.first << ": " << entry.second << ",\n";
        totalWords += entry.second;
    }

    ss << "--------------------------\nTotal Words: " << totalWords;
    //personally I would have added a newline at the end, but this makes the tests fail...

    return ss.str();
}

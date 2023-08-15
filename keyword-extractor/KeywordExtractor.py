from typing import List, Set
import re
import math

class KeywordExtractor:

    @staticmethod
    def extract_keywords(corpus: Set[str], text: str) -> Set[str]:
        print("\n\n-------------------\n\n")
        tfs = KeywordExtractor.calculateTFs(text)
        #print("tfs", tfs)
        idf2 = list(map(lambda tup: [tup[0], tup[1] * KeywordExtractor.calculateIDFs(corpus, tup[0])], tfs))
        #tfidf = map(lambda tup: )
        print(corpus)
        #print("\n-------idf2-------\n", idf2, "\n")
        print("idf2", idf2)
        print("idf2 sortedd", sorted(idf2,reverse=True,key=lambda tup: tup[1]))
        print("yooooo", list(filter(lambda term: term[1]>0.06, idf2)))

        final_result=None
        filtered = list(map(lambda termF: termF[0], filter(lambda term: term[1]>0.06, idf2)))
        if len(filtered) < 1:
            final_result = list(map(lambda termF: termF[0], sorted(idf2,reverse=True,key=lambda tup: tup[1])))[:3]
        else:
            final_result = filtered
        return set(final_result)

    @staticmethod
    def clean_words(words: List[str]) -> List[str]:

        return KeywordExtractor.extract_all_words(str.join(",", words))

    @staticmethod
    def extract_all_words(text: str):
        preparedText = re.sub("[()]", "", text.lower())
        wordMatchPattern = r"\b[\w-]+\b"
        wordMatches = re.findall(wordMatchPattern, preparedText)
        #print("wordMatches----\n", wordMatches, "\n\n", text, "\n-----")
        return wordMatches

    @staticmethod
    def calculateTFs(text: str):
        
        wordMatches = KeywordExtractor.extract_all_words(text)
        uniqueTerms = set(wordMatches)
        totalNumberOfTerms = len(wordMatches)

        accum = []
        for term in uniqueTerms:
            termCount = wordMatches.count(term)
            termTF = termCount/totalNumberOfTerms
            accum.append([term, termTF])
            print(term, termCount, termTF) 
        print("------\naccu", len(accum), "\n-------")
        return accum

    @staticmethod
    def calculateIDFs(corpus, term):

        numberOfDocs = len(corpus)
        searchPattern = rf"\b{term}\b"
        termInDocs = 0
        for document in corpus:
            wordMatches = KeywordExtractor.extract_all_words(document)
            print(term, wordMatches)
            print("termmm", term, term in wordMatches)
            if term in wordMatches:
                termInDocs += 1

        
        idf = math.log10((numberOfDocs/(termInDocs+1)))
        print(term, termInDocs, idf)
        return idf

    def calculateTFIDFs(term, tf, idf):
        pass
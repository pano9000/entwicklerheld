from typing import List, Set
import re, math

class KeywordExtractor:
    TFIDF_MINSCORE = 0.06
    @staticmethod
    def extract_keywords(corpus: Set[str], text: str) -> Set[str]:
        all_terms = KeywordExtractor.get_all_terms(text)
        terms_and_TFs = KeywordExtractor.add_TFs(all_terms)
        terms_and_TFIDFs = KeywordExtractor.add_TFIDFs(terms_and_TFs, corpus)
        terms_and_TFIDFs.sort(reverse=True, key=lambda term_and_tfidf: term_and_tfidf[1])

        terms_with_minscore = list(filter(lambda term: term[1]>KeywordExtractor.TFIDF_MINSCORE, terms_and_TFIDFs))
        result = terms_with_minscore if (len(terms_with_minscore) > 0) else terms_and_TFIDFs[:3]
        return set(map(lambda term: term[0], result))

    @staticmethod
    def clean_words(words: List[str]) -> List[str]:
        return KeywordExtractor.get_all_terms(str.join(",", words))

    @staticmethod
    def get_all_terms(text: str) -> List[str]:
        # remove parentheses, explicitly - the remaining special characters
        # are handled by \b word boundary regexp 
        preparedText = re.sub("[()]", "", text.lower())
        return re.findall(r"\b[\w-]+\b", preparedText)

    @staticmethod
    def add_TFs(terms: List[str]):
        total_terms_qty = len(terms)
        unique_terms = set(terms)
        return list(map(lambda term: (term, terms.count(term) / total_terms_qty), unique_terms))

    @staticmethod
    def add_TFIDFs(terms_and_TFs, corpus):
        return  list( map(lambda term_and_tf: 
            [ term_and_tf[0], term_and_tf[1] * KeywordExtractor.calculate_IDFs(corpus, term_and_tf[0]) ], 
            terms_and_TFs
        ))


    @staticmethod
    def calculate_IDFs(corpus, term):
        numberOfDocs = len(corpus)
        termInDocs = 0
        for document in corpus:
            wordMatches = KeywordExtractor.get_all_terms(document)
            if term in wordMatches: termInDocs += 1

        return math.log10((numberOfDocs/(termInDocs+1)))
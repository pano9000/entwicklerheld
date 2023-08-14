from typing import List, Set


class KeywordExtractor:

    @staticmethod
    def extract_keywords(corpus: Set[str], text: str) -> Set[str]:
        # relevant for scenario 1 & 3
        raise NotImplementedError("Here you should implement your magic")

    @staticmethod
    def clean_words(words: List[str]) -> List[str]:
        # relevant for scenario 2
        raise NotImplementedError("Here you should implement your magic")

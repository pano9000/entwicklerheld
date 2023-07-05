class CuttingPalindromesPython:

    def is_palindrome(self, string):
        #print(string)
        lowerCaseString = string.lower()

        indexLeft: int = 0
        for indexRight in range(len(string)-1, -1, -1):
            if (lowerCaseString[indexLeft] != lowerCaseString[indexRight]):
                return False
            indexLeft += 1

        return True

    def minimum_palindrome_cuts(self, palindrome_string) -> int:
        # Implement this in test scenario 2 and 3
        print(f"\n\n------palindromestring: '{palindrome_string}', Length: {len(palindrome_string)}")
        lowerCaseString = palindrome_string.lower()
  
        indexLeftT: int = 0
        palindromeListT = list()
        indexRightT = len(palindrome_string)-1
        while(indexRightT >= 0):

            print(f"startwhile left: {indexLeftT} {lowerCaseString[indexLeftT]} | indexRight: {indexRightT} {lowerCaseString[indexRightT]} | indexRight+1 {indexRightT+1}")

            # if currentLeft is not same as currentRight -> go one left with the right index and skip current loop
            if lowerCaseString[indexRightT] != lowerCaseString[indexLeftT]:
                indexRightT -= 1
                continue

            if (indexRightT == indexLeftT) and (indexLeftT != len(palindrome_string)-1):
                palindromeListT.append(lowerCaseString[indexLeftT:indexRightT+1])
                print("same", lowerCaseString[indexRightT], lowerCaseString[indexLeftT], palindromeListT)
                indexLeftT += 1
                indexRightT = len(palindrome_string)-1
                continue

            substr = lowerCaseString[indexLeftT:indexRightT+1] #bug here -> adds empty
            print(f"substr: '{substr}'", indexLeftT, indexRightT+1)

            print("leftChar:", lowerCaseString[indexLeftT], "rightChar:", lowerCaseString[indexRightT], indexRightT)

            if self.is_palindrome(substr):
                palindromeListT.append(lowerCaseString[indexLeftT:indexRightT+1])
                print("inispali", "left", indexLeftT, "right", indexRightT, palindromeListT)
                if indexRightT<len(palindrome_string)-1:
                    print("indexright is smaller than stringlengt")
                    indexLeftT = indexRightT+1
                    indexRightT = len(palindrome_string)-1
                    continue
                else:
                    print("indexRight is same or bigger than string length")
                    indexRightT = 0
            indexRightT -= 1

        print("palindromelistT:", palindromeListT, len(palindromeListT))


        return len(palindromeListT)-1
<?php

declare(strict_types=1);

class Chatbot
{
    private string $username = "";
    private bool $hasAskedForName = false;
    private string $chatbotname = "Chatty";
    private $userLikes = [];


    function chat(string $message): string
    {   
        if (!$this->username) {
            return ($this->extractUsername($message)) 
                ? "I'm happy to text you, $this->username. I am $this->chatbotname."
                : "Hi :-) Who are you?";
        } 
        
        $extractedLike = $this->extractLikes($message);

        if (!$extractedLike) return "Is there something you like?";

        if ($this->isVowel($extractedLike)) return "You like $extractedLike? I really like $extractedLike too.";

        $matchingPreviousLike = $this->findMatchingPreviousLike($extractedLike);

        return ($matchingPreviousLike)
            ? "Sorry $this->username, I don't like $extractedLike. But I heard, you like $matchingPreviousLike."
            : "Sorry $this->username, I don't like $extractedLike.";

    }

    private function isVowel($char) {
        $vowels = [
            "a" => 0,
            "e" => 1,
            "i" => 2,
            "o" => 3,
            "u" => 4
        ];

        return array_key_exists($char[0], $vowels);
    }

    private function findMatchingPreviousLike($currentLike) {

        // check for next vowel in the $currentLike - starting at 2nd index
        for ($i = 1; $i < strlen($currentLike); $i++) {

            // if vowel, then find the latest entry in userLikes that matches that vowel
            if ($this->isVowel($currentLike[$i])) {
                for ($j = count($this->userLikes) - 1; $j >= 0; $j--) {
                    $userLike = $this->userLikes[$j];

                    if ($userLike[0] == $currentLike[$i]) { // str_starts_with does not exist here yet
                        return $userLike;
                    }
                }
            }
        }
        return null;

    }

    private function extractUsername($message) {
        //look for I'm / I am / My name is in the message to get the name
        // and only match a-z for now, -> no injection possible
        $regexUserName = "/^(?'greeting'I\'m |I am |My Name is )(?'name'[a-z]+)/i";

        preg_match($regexUserName, $message, $matches);
        
        if ($matches["name"]) {
            $this->username = $matches["name"];
        }

        return $this->username;
    }

    private function extractLikes($message) {
        $regexUserLikes = "/(?<=I like )(?'like'\w+)/i";
        preg_match($regexUserLikes, $message, $matches);

        if ($matches["like"]) {
            array_push($this->userLikes, $matches["like"]);
            return $matches["like"];
        }

        return null;
    }


}

<?php
namespace EntwicklerHeld;

class MarkdownParserPhp {
    static function parseMarkdown($markdown) {
        $lines = explode("\n", $markdown);
        $formattedLines = array();

        foreach ($lines as $line) {
            $formattedLineResult = self::replaceLineFormat($line);
            $formattedLineResult["text"] = self::replaceInlineFormat($formattedLineResult["text"]); 
            array_push($formattedLines, $formattedLineResult);
        }

        $parsed = "";
        for ($i = 0; $i < count($formattedLines); $i++) {

            $previousTag = ($i - 1 < 0) ? null : $formattedLines[$i-1]["tag"];
            $currentTag = $formattedLines[$i]["tag"];
 
            //Add opening <ul> tag
            if ($currentTag == "li" && ($previousTag == null || $previousTag != "li")) {
                $parsed .= "<ul>" . $formattedLines[$i]["text"];
                continue;
            }

            //Add closing </ul> tag at the end of the list, before the new tag
            if ($previousTag == "li" && $currentTag != "li") {
                $parsed .= "</ul>" . $formattedLines[$i]["text"];
                continue;
            }

            // Add closing <ul> tag at the end of the document, if required
            if (($i == count($formattedLines)-1 && $currentTag == "li")) {
                $parsed .= $formattedLines[$i]["text"] . "</ul>";
                continue;
            }

            $parsed .= $formattedLines[$i]["text"];

        }
        return $parsed;
        
    }

    static private function replaceLineFormat($line) {

        // handle # = <h1-h6>
        $h = preg_replace_callback("/^(?'h'#{1,6})\s(?'content'.*)/", self::getReplacer("h"), $line, -1, $hCount);
        if ($hCount > 0) return array("text"=>$h, "tag"=>"h");

        // handle * = <li>
        $li = preg_replace_callback( "/^(?'li'\*\s)(?'content'.*)/", self::getReplacer("li"), $line, -1, $liCount);
        if ($liCount > 0) return array("text"=>$li, "tag"=>"li");

        // handle default (no special tag) = <p>
        $p = self::writeFormat($line, "p");
        return array("text"=>$p, "tag"=>"p");
    }

    static private function replaceInlineFormat($line) {
        return preg_replace_callback("/(?'start'_+)(?'content'[^_\n\r]+)(?'end'_+)/", self::getReplacer("inline"), $line);
    }

    static private function getReplacer($mode) {

        return function($matches) use ($mode){
            switch ($mode) {
                case "h":
                    $tag = "h" . strlen($matches["h"]);
                    break;
                case "li":
                    $tag = "li";
                    break;
                case "inline":
                    $tag = (strlen($matches["start"]) == 1) ? "em" : "strong";
                    break;
            }
            return self::writeFormat($matches["content"], $tag);
        };
    }

    static private function writeFormat($content, $tag) {
        return "<$tag>" . htmlentities($content) . "</$tag>";
    }
}
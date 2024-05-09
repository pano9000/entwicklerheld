<?php
namespace EntwicklerHeld;

class MarkdownParserPhp {
    static function parseMarkdown($markdown) {
        $lines = explode("\n", $markdown);

        $isInList = false;

        foreach ($lines as &$line) {
            if (preg_match('/^#######(.*)/', $line, $matches)) {
                
            } elseif (preg_match('/^######(.*)/', $line, $matches)) {
                $line = "<h6>" . trim($matches[1]) . "</h6>";
                continue;
            } elseif (preg_match('/^#####(.*)/', $line, $matches)) {
                $line = "<h5>" . trim($matches[1]) . "</h5>";
                continue;
            } elseif (preg_match('/^####(.*)/', $line, $matches)) {
                $line = "<h4>" . trim($matches[1]) . "</h4>";
                continue;
            } elseif (preg_match('/^###(.*)/', $line, $matches)) {
                $line = "<h3>" . trim($matches[1]) . "</h3>";
                continue;
            } elseif (preg_match('/^##(.*)/', $line, $matches)) {
                $line = "<h2>" . trim($matches[1]) . "</h2>";
                continue;
            } elseif (preg_match('/^#(.*)/', $line, $matches)) {
                $line = "<h1>" . trim($matches[1]) . "</h1>";
                continue;
            }

            if (preg_match('/\*(.*)/', $line, $matches)) {
                if (!$isInList) {
                    $isInList = true;
                    $isBold = false;
                    $isItalic = false;
                    if (preg_match('/(.*)__(.*)__(.*)/', $matches[1], $matches2)) {
                        $matches[1] = $matches2[1] . '<strong>' . $matches2[2] . '</strong>' . $matches2[3];
                        $isBold = true;
                    }

                    if (preg_match('/(.*)_(.*)_(.*)/', $matches[1], $matches3)) {
                        $matches[1] = $matches3[1] . '<em>' . $matches3[2] . '</em>' . $matches3[3];
                        $isItalic = true;
                    }

                    $line = "<ul><li>" . trim($matches[1]) . "</li>";
                } else {
                    $isBold = false;
                    $isItalic = false;
                    if (preg_match('/(.*)__(.*)__(.*)/', $matches[1], $matches2)) {
                        $matches[1] = $matches2[1] . '<strong>' . $matches2[2] . '</strong>' . $matches2[3];
                        $isBold = true;
                    }

                    if (preg_match('/(.*)_(.*)_(.*)/', $matches[1], $matches3)) {
                        $matches[1] = $matches3[1] . '<em>' . $matches3[2] . '</em>' . $matches3[3];
                        $isItalic = true;
                    }

                    $line = "<li>" . trim($matches[1]) . "</li>";
                }
            }

            if (!preg_match('/<h|<ul|<p|<li/', $line)) {
                if ($isInList) {
                    $line = "</ul>" . "<p>$line</p>";
                    $isInList = false;
                }
                else {
                    $line = "<p>$line</p>";
                }
            }

            if (preg_match('/(.*)__(.*)__(.*)/', $line, $matches)) {
                $line = $matches[1] . '<strong>' . $matches[2] . '</strong>' . $matches[3];
            }

            if (preg_match('/(.*)_(.*)_(.*)/', $line, $matches)) {
                $line = $matches[1] . '<em>' . $matches[2] . '</em>' . $matches[3];
            }
        }
        $html = join($lines);
        if ($isInList) {
            $html .= '</ul>';
        }
        return $html;
    }
}
<?php

namespace App\Days\Day05;

class Part2 extends Part1
{

    public function solve(): string
    {
        $codeForLetterA = 65;
        $codeForLetterZ = 90;

        $minLength = strlen($this->file);

        for ($letterCode = $codeForLetterA; $letterCode <= $codeForLetterZ; $letterCode++) {
            $uppercaseLetter = chr($letterCode);
            $lowercaseLetter = strtolower($uppercaseLetter);
            echo "current letter is " . $lowercaseLetter . "\n";
            $polymer = str_replace($uppercaseLetter, '', $this->file);
            $polymer = str_replace($lowercaseLetter, '', $polymer);
            $resultedPolymerLength = $this->calculateResultedPolymerLength($polymer);
            if ($resultedPolymerLength < $minLength) {
                $minLength = $resultedPolymerLength;
            }
        }

        return $minLength;
    }

}
<?php


namespace App\Days\Day02;


class Part2 extends Part1
{


    public function solve(): string
    {
        $this->parseRows();
        $rowsNumber = sizeof($this->rows);
        for ($first = 0; $first < $rowsNumber - 1; $first++) {
            for ($second = $first + 1; $second < $rowsNumber; $second++) {
                $firstWord = $this->rows[$first];
                $secondWord = $this->rows[$second];
                if ($this->areWordsTheSame($firstWord, $secondWord)) {
                    return $this->findCommonLetters($firstWord, $secondWord);
                }
            }
        }
    }

    private function areWordsTheSame(string $first, string $second): bool
    {
        $difference = 0;
        for ($i = 0; $i < strlen($first); $i++) {
            if ($first[$i] !== $second[$i]) {
                $difference++;
            }
        }
        return $difference === 1;
    }

    private function findCommonLetters(string $first, string $second): string
    {
        $letters = '';
        for ($i = 0; $i < strlen($first); $i++) {
            if ($first[$i] === $second[$i]) {
                $letters .= $first[$i];
            }
        }
        return $letters;
    }
}
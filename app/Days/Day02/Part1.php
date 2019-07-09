<?php

namespace App\Days\Day02;

use App\Days\Solver;

class Part1 extends Solver
{

    protected $rows = [];

    function __construct()
    {
        $this->readFile('/Day02/input.txt');
    }

    protected function parseRows()
    {
        $this->rows = explode("\n", $this->file);
    }

    private function isWordValid(string $word, int $occurringTimes): bool
    {
        $letters = [];
        for ($i = 97; $i <= 122; $i++) {
            $letters[chr($i)] = 0;
        }
        for ($i = 0; $i < strlen($word); $i++) {
            $letter = $word[$i];
            $letters[$letter]++;
        }
        return array_search($occurringTimes, $letters);
    }

    public function solve(): string
    {
        $this->parseRows();
        $doubles = 0;
        $triples = 0;
        foreach ($this->rows as $row) {
            if ($this->isWordValid($row, 2)) {
                $doubles++;
            }
            if ($this->isWordValid($row, 3)) {
                $triples++;
            }
        }
        return strval($doubles * $triples);
    }


}


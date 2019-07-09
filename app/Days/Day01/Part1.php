<?php

namespace App\Days\Day01;

use App\Days\Solver;

class Part1 extends Solver
{

    protected $frequencies = [];
    protected $frequency = 0;

    function __construct()
    {
        $this->readFile('/Day01/input.txt');
    }

    public function solve(): string
    {
        $this->parseFile();
        $this->calculateFrequency();
        return $this->frequency;
    }

    protected function parseFile()
    {
        $rows = explode("\n", $this->file);
        $this->frequencies = array_map(function (string $row) {
            return intval($row);
        }, $rows);

    }

    private function calculateFrequency()
    {
        foreach ($this->frequencies as $frequency) {
            $this->frequency += $frequency;
        }
    }
}


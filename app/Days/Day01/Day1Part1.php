<?php

namespace App\Days;


class Day1Part1
{

    private $file = '';
    protected $frequencies = [];
    protected $frequency = 0;


    protected function readFile()
    {
        $this->file = file_get_contents(__DIR__ . '/input.txt', true);
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

    public function solve(): int {
        $this->readFile();
        $this->parseFile();
        $this->calculateFrequency();
        return $this->frequency;
    }
}


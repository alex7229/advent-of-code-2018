<?php

namespace App\Days;


class Day1Part1
{

    private $file = '';
    public $frequencies = [];
    public $frequency = 0;


    function __construct()
    {
        $this->readFile();
        $this->parseFile();
        $this->calculateFrequency();
    }

    private function readFile()
    {
        $this->file = file_get_contents(__DIR__ . '/input.txt', true);
    }

    private function parseFile()
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


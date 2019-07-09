<?php


namespace App\Days\Day01;


class Part2 extends Part1
{
    private $usedFrequencies = [];

    function __construct()
    {
        $this->readFile('/Day01/input.txt');
    }

    private function isFrequencyAlreadyUsed(): bool {
        return in_array($this->frequency, $this->usedFrequencies);
    }

    public function solve(): string
    {
        $this->parseFile();
        while (true) {
            foreach ($this->frequencies as $frequency) {
                $this->frequency += $frequency;
                if ($this->isFrequencyAlreadyUsed()) {
                    return $this->frequency;
                }
                array_push($this->usedFrequencies, $this->frequency);
            }
        }
        return $this->frequency;
    }

}


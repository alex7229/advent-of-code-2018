<?php


namespace App\Days;


class Day1Part2 extends Day1Part1
{
    private $usedFrequencies = [];

    private function isFrequencyAlreadyUsed(): bool {
        return in_array($this->frequency, $this->usedFrequencies);
    }

    public function solve(): int {
        $this->readFile();
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


<?php

namespace App\Days\Day05;

class PolymerProcessor
{

    private $polymer = [];

    function __construct(
        array $polymer
    )
    {
        $this->polymer = $polymer;
    }

    public function shrink(): string
    {
        $this->triggerElements();
        return join('', $this->polymer);
    }

    private function triggerElements()
    {
        $previousPolymerSize = sizeof($this->polymer);
        while (true) {
            $this->processOneReaction();
            $currentSize = sizeof($this->polymer);
            if ($currentSize === $previousPolymerSize) {
                // there is no elements to react, halt the reaction
                return;
            }
            $previousPolymerSize = $currentSize;
        }
    }

    private function processOneReaction()
    {
        for ($i = 0; $i < sizeof($this->polymer) - 1; $i++) {
            $first = $this->polymer[$i];
            $second = $this->polymer[$i + 1];
            if ($first === $second) {
                // ignore units with the same polarity
                continue;
            }
            if (strtoupper($first) === strtoupper($second)) {
                // same units, but different polarity -> remove them
                array_splice($this->polymer, $i, 2);
                return;
            }
        }
    }
}
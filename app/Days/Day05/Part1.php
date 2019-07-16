<?php

namespace App\Days\Day05;

use App\Days\Solver;

class Part1 extends Solver
{


    function __construct()
    {
        $this->readFile('/Day05/input.txt');
    }

    public function solve(): string
    {
        return $this->calculateResultedPolymerLength($this->file);
    }

    protected function calculateResultedPolymerLength(string $polymerInput): int
    {
        // in order to increase the speed of dividing, polymer is split into 100 long string pieces
        // each of them is processed
        // all of the pieces are glued back together
        // procedure is repeated once more, but dividing into 1000 long pieces (numbers are guessed)
        // polymer is processed one more time
        $chunks = explode(",", chunk_split($polymerInput, 100, ","));
        $chunks = array_map(function ($polymer) {
            $processor = new PolymerProcessor(str_split($polymer));
            return $processor->shrink();
        }, $chunks);
        $currentPolymer = join("", $chunks);

        $chunks = explode(",", chunk_split($currentPolymer, 1000, ","));
        $chunks = array_map(function ($polymer) {
            $processor = new PolymerProcessor(str_split($polymer));
            return $processor->shrink();
        }, $chunks);

        $currentPolymer = join('', $chunks);

        $processor = new PolymerProcessor(str_split($currentPolymer));
        return strlen($processor->shrink());
    }

}
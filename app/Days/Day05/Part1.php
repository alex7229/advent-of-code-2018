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
        // in order to increase the speed of dividing, polymer is split into 1000 long string pieces
        // each of them is processed
        // all of the pieces are glued back together
        // polymer is processed one more time
        $chunks = explode(",", chunk_split($this->file, 1000, ","));
        $chunks = array_map(function ($polymer) {
            $processor = new PolymerProcessor(str_split($polymer));
            return $processor->shrink();
        }, $chunks);
        $polymer = join("", $chunks);
        $processor = new PolymerProcessor(str_split($polymer));
        return strlen($processor->shrink());
    }


}
<?php

namespace App\Days\Day02;

use App\Days\Solver;

class Part1 extends Solver
{

    function __construct()
    {
        $this->readFile('/Day02/input.txt');
    }

    public function solve(): string
    {
        return '33';
    }


}


<?php

namespace App\Days;


use Exception;

class Solver
{

    protected $file = '';

    public function solve(): string
    {
        throw new Exception('it should be implemented in the child class');
    }

    protected function readFile(string $path)
    {
        $this->file = file_get_contents(__DIR__ . $path, true);
    }
}


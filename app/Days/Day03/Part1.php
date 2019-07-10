<?php

namespace App\Days\Day03;

use App\Days\Solver;

class Part1 extends Solver
{
    private $claims = [];
    private $width = 0;
    private $height = 0;
    private $field = [];

    function __construct()
    {
        $this->readFile('/Day03/inputTest.txt');
    }

    public function solve(): string
    {
        $this->parseClaims();
        $this->calculateFieldSize();
        $this->generateField();
        $this->processClaims();
        return strval($this->findOverlappedClaims());
    }

    private function parseClaims()
    {
        $rows = explode("\n", $this->file);
        $this->claims = array_map(function (string $row) {
            $regExp = "/^#(\d*) @ (\d*),(\d*): (\d*)x(\d*)$/";
            $matches = [];
            preg_match($regExp, $row, $matches);
            return [
                "id" => intval($matches[1]),
                "left" => intval($matches[2]),
                "top" => intval($matches[3]),
                "width" => intval($matches[4]),
                "height" => intval($matches[5])
            ];
        }, $rows);
    }

    private function calculateFieldSize()
    {
        foreach ($this->claims as $claim) {
            $rightPoint = $claim["left"] + $claim["width"];
            $bottomPoint = $claim["top"] + $claim["height"];
            if ($rightPoint + 1 > $this->width) {
                $this->width = $rightPoint + 1;
            }
            if ($bottomPoint + 1 > $this->height) {
                $this->height = $bottomPoint + 1;
            }
        }
    }

    private function generateField()
    {
        for ($row = 0; $row < $this->height; $row++) {
            $this->field[$row] = [];
            for ($column = 0; $column < $this->width; $column++) {
                $this->field[$row][$column] = 0;
            }
        }
    }

    private function processClaims()
    {
        foreach ($this->claims as $claim) {
            for ($width = 0; $width < $claim['width']; $width++) {
                for ($height = 0; $height < $claim['height']; $height++) {
                    $row = $claim['top'] + $width;
                    $column = $claim['left'] + $height;
                    $this->field[$row][$column]++;
                }
            }
        }
    }

    private function findOverlappedClaims(): int
    {
        $overlapped = 0;
        for ($row = 0; $row < $this->height; $row++) {
            for ($column = 0; $column < $this->width; $column++) {
                if ($this->field[$row][$column] > 1) {
                    echo "row is " . $row  . " and column is " . $column . "\n";
                    $overlapped++;
                }
            }
        }
        return $overlapped;
    }

}
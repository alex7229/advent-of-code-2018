<?php

namespace App\Days\Day06;

class Part2 extends Part1
{
    public function solve(): string
    {
        return $this->findClosestPoint();
    }

    private function findClosestPoint()
    {

        $area = 0;

        for ($row = 0; $row <= $this->lastRow; $row ++) {
            for ($column = 0; $column <= $this->lastColumn; $column++) {
                $distanceSum = 0;
                foreach ($this->points as $point) {
                    $distanceSum += $this->getDistance($row, $column, $point['row'], $point['column']);
                }
                if ($distanceSum < 10000) {
                    $area++;
                }
            }
        }

        return $area;
    }
}
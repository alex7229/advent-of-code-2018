<?php

namespace App\Days\Day06;

use App\Days\Solver;

class Part1 extends Solver
{

    protected $points = [];
    protected $lastColumn = 0;
    protected $lastRow = 0;


    function __construct()
    {
        $this->readFile('/Day06/input.txt');
        $this->parsePoints();
        $this->findFieldCoordinates();
    }

    private function parsePoints()
    {
        $this->points = explode("\n", $this->file);
        $this->points = array_map(function (string $row) {
            $coordinates = explode(",", $row);
            return [
                "column" => intval($coordinates[0]),
                "row" => intval($coordinates[1]),
                "area" => 0
            ];
        }, $this->points);
    }

    private function findFieldCoordinates()
    {
        foreach ($this->points as $point) {
            if ($point['row'] > $this->lastRow) {
                $this->lastRow = $point['row'];
            }
            if ($point['column'] > $this->lastColumn) {
                $this->lastColumn = $point['column'];
            }
        }
    }

    public function solve(): string
    {
        $this->calculateArea();
        return $this->findLargestArea();
    }

    private function calculateArea()
    {
        for ($row = 0; $row <= $this->lastRow; $row++) {
            for ($column = 0; $column <= $this->lastColumn; $column++) {
                $closestIndex = $this->findClosestPointIndex($row, $column);
                if ($closestIndex === 'N/A') {
                    continue;
                }
                $this->points[$closestIndex]['area']++;
            }
        }
    }

    private function findClosestPointIndex(int $row, int $column)
    {
        $closestIndex = null;
        $closestDistance = null;
        $isMultiPointsArea = false;

        foreach ($this->points as $pointIndex => $point) {
            $currentDistance = $this->getDistance($row, $column, $point['row'], $point['column']);
            if (is_null($closestDistance)) {
                $closestIndex = $pointIndex;
                $closestDistance = $currentDistance;
                continue;
            }
            if ($currentDistance < $closestDistance) {
                $closestIndex = $pointIndex;
                $closestDistance = $currentDistance;
                $isMultiPointsArea = false;
                continue;
            }
            if ($currentDistance === $closestDistance) {
                $isMultiPointsArea = true;
            }
        }
        if ($isMultiPointsArea) {
            return 'N/A';
        }
        return $closestIndex;
    }

    protected function getDistance(int $firstPointRow, int $firstPointColumn, int $secondPointRow, int $secondPointColumn): int
    {
        return abs($firstPointRow - $secondPointRow) + abs($firstPointColumn - $secondPointColumn);
    }

    private function findLargestArea(): int
    {
        $pointsOutside = $this->findPointsOutsideOfTheGrid();
        $pointsCopy = $this->points;
        foreach ($pointsOutside as $pointOutside) {
            $closestPointIndex = $this->findClosestPointIndex($pointOutside['row'], $pointOutside['column']);
            if ($closestPointIndex === 'N/A') {
                continue;
            }
            $pointsCopy[$closestPointIndex] = null;
        }

        $finiteAreas = array_filter($pointsCopy, function ($point) {
            return isset($point);
        });
        $areas = array_map(function ($point) {
            return $point['area'];
        }, $finiteAreas);
        return max($areas);
    }

    private function findPointsOutsideOfTheGrid(): array
    {
        $points = [];
        // top and bottom sides
        for ($i = -1; $i <= $this->lastColumn + 1; $i++) {
            array_push($points, ['row' => -1, 'column' => $i]);
            array_push($points, ['row' => $this->lastRow + 1, 'column' => $i]);
        }
        // left and right sides
        for ($i = -1; $i <= $this->lastRow + 1; $i++) {
            array_push($points, ['row' => $i, 'column' => -1]);
            array_push($points, ['row' => $i, 'column' => $this->lastColumn + 1]);
        }
        return $points;
    }

}
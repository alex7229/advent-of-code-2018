<?php

namespace App\Days\Day07;

use App\Days\Solver;
use function Exception;

class Part1 extends Solver
{

    // indices -> steps letters, values => steps prerequisites (as concatenated string)
    protected $steps = [];
    protected $unblockedSteps = [];
    protected $usedSteps = '';

    function __construct()
    {
        $this->readFile('/Day07/input.txt');
    }

    public function solve(): string
    {
        $this->parseSteps();
        $this->findUnblockedSteps();
        while (sizeof($this->unblockedSteps) > 0) {
            $this->executeStep();
        }
        return $this->usedSteps;
    }

    protected function parseSteps()
    {
        $regExp = '/Step (\w) must be finished before step (\w) can begin./';
        $matches = [];
        preg_match_all($regExp, $this->file, $matches, PREG_SET_ORDER);
        foreach ($matches as $match) {
            $step = $match[2];
            $prerequisiteStep = $match[1];
            if (is_null($this->steps[$step])) {
                $this->steps[$step] = '';
            }
            if (is_null($this->steps[$prerequisiteStep])) {
                $this->steps[$prerequisiteStep] = '';
            }
            if (strpos($this->steps[$step], $prerequisiteStep) === false) {
                $this->steps[$step] .= $prerequisiteStep;
            }
        }
    }

    private function findUnblockedSteps()
    {
        foreach ($this->steps as $step => $prerequisites) {
            if ($prerequisites === '') {
                array_push($this->unblockedSteps, $step);
            }
        }
        $this->unblockedSteps = array_unique($this->unblockedSteps);
    }

    private function executeStep()
    {
        if (sizeof($this->unblockedSteps) === 0) {
            throw Exception('there is nothing to execute');
        }
        sort($this->unblockedSteps);
        $currentStep = $this->unblockedSteps[0];
        array_shift($this->unblockedSteps);
        unset($this->steps[$currentStep]);
        $this->steps = array_map(function ($prerequisiteSteps) use ($currentStep) {
            return str_replace($currentStep, '', $prerequisiteSteps);
        }, $this->steps);
        $this->usedSteps = $this->usedSteps . $currentStep;
        $this->findUnblockedSteps();
    }

}





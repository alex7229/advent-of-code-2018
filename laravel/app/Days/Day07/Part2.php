<?php

namespace App\Days\Day07;


class Part2 extends Part1
{

    private $availableWorkers = 5;
    private $letterDelay = 60;
    private $elapsedTime = 0;

    public function solve(): string
    {
        $this->parseSteps();
        while (true) {
            $this->assignWorkers();
            $this->executeSteps();
            $this->assignWorkers();
            if (sizeof($this->unblockedSteps) === 0) {
                break;
            }
            $this->elapseOneSecond();
        }
        return $this->elapsedTime;
    }

    private function assignWorkers()
    {
        $this->findUnblockedSteps();
        ksort($this->unblockedSteps);
        foreach ($this->unblockedSteps as $step => $stepData) {
            if ($this->availableWorkers === 0 || $stepData['inProgress']) {
                continue;
            }
            $this->unblockedSteps[$step] = [
                'inProgress' => true,
                'completedIn' => $this->findLetterDelay($step)
            ];
            $this->availableWorkers = $this->availableWorkers - 1;
        }
    }

    private function findUnblockedSteps()
    {
        foreach ($this->steps as $step => $prerequisites) {
            if ($prerequisites === '' && !isset($this->unblockedSteps[$step])) {
                $this->unblockedSteps[$step] = [
                    'completedIn' => null,
                    'inProgress' => false
                ];
            }
        }
    }

    private function findLetterDelay(string $letter): int
    {
        // -ord('a') + 1 ensures that letter 'A' will have 1 sec delay, 'B' - 2 secs
        return $this->letterDelay + ord($letter) - ord('A') + 1;
    }

    private function executeSteps()
    {
        ksort($this->unblockedSteps);
        $completedSteps = [];
        foreach ($this->unblockedSteps as $unblockedStep => $unblockedStepData) {
            if ($unblockedStepData['inProgress'] === false || $unblockedStepData['completedIn'] > 0) {
                continue;
            }
            array_push($completedSteps, $unblockedStep);
        }
        foreach ($completedSteps as $completedStep) {
            unset($this->unblockedSteps[$completedStep]);
            unset($this->steps[$completedStep]);
            $this->availableWorkers++;
            $this->steps = array_map(function ($prerequisiteSteps) use ($completedStep) {
                return str_replace($completedStep, '', $prerequisiteSteps);
            }, $this->steps);
            $this->usedSteps = $this->usedSteps . $completedStep;
        }
    }

    private function elapseOneSecond()
    {
        $this->unblockedSteps = array_map(function ($step) {
            if ($step['inProgress'] === false) {
                return $step;
            }
            return [
                'inProgress' => true,
                'completedIn' => $step['completedIn'] - 1
            ];
        }, $this->unblockedSteps);
        $this->elapsedTime++;
    }

}





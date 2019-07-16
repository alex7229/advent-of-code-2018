<?php

namespace App\Days\Day04;

use App\Days\Solver;
use Carbon\Carbon;

class Part1 extends Solver
{

    protected $sleepMinutes = [];

    // array of minutes with guard ids, e.g.
    // [12, 25], [12, 52,52], where first array is 0 minute, second - 1-st minute
    // 12, 25, 52 - guard ids
    private $events = [];
    // array id is guard id, value -> sleptMinutes
    private $allGuards = [];

    function __construct()
    {
        $this->readFile('/Day04/input.txt');
    }

    public function solve(): string
    {
        $this->parseRows();
        $this->writeGuardsSchedule();
        $this->findTheSleepSchedule();
        $theSleepiestGuard = array_search(max($this->allGuards), $this->allGuards);
        $theSleepiestMinute = $this->findTheSleepiestMinute($theSleepiestGuard);
        return strval($theSleepiestMinute * $theSleepiestGuard);
    }

    protected function parseRows()
    {
        $regExp = "/\[([^]]*)] (falls asleep|wakes up|Guard #(\d*) begins shift)/";
        $matches = [];
        preg_match_all($regExp, $this->file, $matches, PREG_SET_ORDER);
        $this->events = array_map(function ($match) {
            return [
                "timestamp" => Carbon::parse($match[1])->timestamp,
                "type" => $match[2],
                "id" => $match[3]
            ];
        }, $matches);
        usort($this->events, function ($first, $second) {
            return $first['timestamp'] - $second['timestamp'];
        });
    }

    protected function writeGuardsSchedule()
    {
        $latestTime = $this->events[sizeof($this->events) - 1]['timestamp'];

        $nextEventIndex = 1;
        $nextEvent = $this->events[$nextEventIndex];

        $currentTime = $this->events[0]['timestamp'];
        $guardId = $this->events[0]['id'];
        $isAwake = true;

        while ($currentTime < $latestTime) {
            $currentTime += 60;

            if ($nextEvent['timestamp'] === $currentTime) {
                // apply new status and update event / eventIndex
                if ($nextEvent['type'] === 'falls asleep') {
                    $isAwake = false;
                } else {
                    $isAwake = true;
                }
                if (!is_null($nextEvent['id'])) {
                    $guardId = $nextEvent['id'];
                }
                $nextEventIndex++;
                $nextEvent = $this->events[$nextEventIndex];
            }

            $time = Carbon::createFromTimestamp($currentTime);
            $hour = $time->hour;
            $minute = $time->minute;
            if ($isAwake) {
                continue;
            }
            if ($hour !== 0) {
                continue;
            }
            if (!isset($this->sleepMinutes[$minute])) {
                $this->sleepMinutes[$minute] = [];
            }
            array_push($this->sleepMinutes[$minute], $guardId);
        }
        ksort($this->sleepMinutes);
    }

    protected function findTheSleepSchedule()
    {
        foreach ($this->sleepMinutes as $currentMinute) {
            foreach ($currentMinute as $guardId) {
                if (!isset($this->allGuards[$guardId])) {
                    $this->allGuards[$guardId] = 0;
                }
                $this->allGuards[$guardId]++;
            }
        }
    }

    private function findTheSleepiestMinute(int $guardId)
    {
        $sleptData = [
            'sleepiestMinute' => 0,
            'daysAsleep' => 0
        ];
        foreach ($this->sleepMinutes as $currentMinute => $guardIds) {
            $currentMinuteDaysAsleep = 0;
            foreach ($guardIds as $currentGuardId) {
                if ($guardId == $currentGuardId) {
                    $currentMinuteDaysAsleep++;
                }
            }
            if ($currentMinuteDaysAsleep > $sleptData['daysAsleep']) {
                $sleptData['sleepiestMinute'] = $currentMinute;
                $sleptData['daysAsleep'] = $currentMinuteDaysAsleep;
            }
        }
        return $sleptData['sleepiestMinute'];
    }


}
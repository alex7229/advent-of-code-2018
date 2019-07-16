<?php


namespace App\Days\Day04;


class Part2 extends Part1
{


    public function solve(): string
    {
        $this->parseRows();
        $this->writeGuardsSchedule();
        $this->findTheSleepSchedule();
        $result = $this->findTheSleepiestGuard();
        return strval($result['id'] * $result['minute']);
    }

    private function findTheSleepiestGuard() {

        $result = [
            "id" => 0,
            "minute" => 0,
            "daysAsleep" => 0
        ];

        foreach ($this->sleepMinutes as $minute=>$guardIds) {
            echo "current minute is " . $minute . "\n";

            // indices are guard ids, values => minutes asleep
            $guardsSleepTime = [];
            foreach ($guardIds as $guardId) {
                if (is_null($guardsSleepTime[$guardId])) {
                    $guardsSleepTime[$guardId] = 0;
                }
                $guardsSleepTime[$guardId]++;
            }

            $daysAsleep = max($guardsSleepTime);
            $theSleepiestGuard = array_search($daysAsleep, $guardsSleepTime);
            if ($daysAsleep > $result['daysAsleep']) {
                $result['id'] = $theSleepiestGuard;
                $result['minute'] = $minute;
                $result['daysAsleep'] = $daysAsleep;
            }
        }

        return $result;
    }

}
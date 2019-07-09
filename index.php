<?php

require_once('vendor/autoload.php');

use App\Days\Day1Part1;


if (!isset($argv[1])) {
    throw new Exception('first argument should be day (for example, 1)');
}

if (!isset($argv[2])) {
    throw new Exception('second argument should be the puzzle part (1 or 2)');
}

$day = $argv[1];
$part = $argv[2];

if ($day === '1' && $part === '1') {
    $solver = new Day1Part1();
    echo $solver->frequency . "\n";
    return;
}

throw new Exception('Day or part is not implemented or input is not valid');
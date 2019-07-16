<?php

require_once('vendor/autoload.php');


if (!isset($argv[1])) {
    throw new Exception('first argument should be day (for example, 1)');
}

if (!isset($argv[2])) {
    throw new Exception('second argument should be the puzzle part (1 or 2)');
}

$day = $argv[1];
$part = $argv[2];

$solver = null;

if ($day === '1' && $part === '1') {
    $solver = new \App\Days\Day01\Part1();
}
if ($day === '1' && $part === '2') {
    $solver = new \App\Days\Day01\Part2();
}
if ($day === '2' && $part === '1') {
    $solver = new \App\Days\Day02\Part1();
}
if ($day === '2' && $part === '2') {
    $solver = new \App\Days\Day02\Part2();
}
if ($day === '3' && $part === '1') {
    $solver = new \App\Days\Day03\Part1();
}
if ($day === '4' && $part === '1') {
    $solver = new \App\Days\Day04\Part1();
}
if ($day === '4' && $part === '2') {
    $solver = new \App\Days\Day04\Part2();
}
if ($day === '5' && $part === '1') {
    $solver = new \App\Days\Day05\Part1();
}


if (is_null($solver)) {
    throw new Exception('Day or part is not implemented or input is not valid');
}

echo $solver->solve();
echo "\n";

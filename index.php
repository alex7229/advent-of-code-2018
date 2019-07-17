<?php

require_once('vendor/autoload.php');


if (!isset($argv[1])) {
    throw new Exception('first argument should be day (for example, 01)');
}

if (!isset($argv[2])) {
    throw new Exception('second argument should be the puzzle part (1 or 2)');
}

$day = $argv[1];
$part = $argv[2];

$class = '\App\Days\Day' . $day . '\Part' . $part;
$solver = new $class();

echo $solver->solve();
echo "\n";

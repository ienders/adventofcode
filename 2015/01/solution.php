<?php

$i = 0;
$floor = 0;
$first_hit_negative = null;
$contents = file_get_contents("input.txt");
$instructions = str_split($contents);

foreach ($instructions as $instruction) {
    $i++;
    if ($instruction == '(') {
        $floor++;
    } elseif ($instruction == ')') {
        $floor--;
    }
    if ($first_hit_negative == null && $floor < 0) {
        $first_hit_negative = $i;
    }
}

echo "Part 1: ".$floor."\n";
echo "Part 2: ".$first_hit_negative."\n";

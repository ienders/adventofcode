<?php

// 2*l*w + 2*w*h + 2*h*l + length of smallest

function ribbonNeeded($sides) {
    return 3 * $sides[0] * $sides[1]
        +  2 * $sides[1] * $sides[2]
        +  2 * $sides[2] * $sides[0];
}

function shorterRibbonNeeded($sides) {
    return 2 * ($sides[0] + $sides[1])
        +  $sides[0] * $sides[1] * $sides[2];
}

$feet = 0;
$shorterFeet = 0;
foreach (file("input.txt") as $package) {
    $sides = preg_split('/x/', $package);
    $sides = array_map('intval', $sides);
    sort($sides);
    $feet += ribbonNeeded($sides);
    $shorterFeet += shorterRibbonNeeded($sides);
}

echo "Part 1: ".$feet."\n";
echo "Part 2: ".$shorterFeet."\n";

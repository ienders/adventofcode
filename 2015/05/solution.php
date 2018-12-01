<?php

function containsAtLeastThreeVowels($string) {
    return preg_match('/([aeiou].*){3,}/', $string);
}

function containsADupeLetter($string) {
    return preg_match('/(.)\1/', $string);
}

function doesntContainNaughtyParts($string) {
    return !preg_match('/(ab)|(cd)|(pq)|(xy)/', $string);
}

function containsPairs($string) {
    return preg_match('/(..).*\1/', $string);
}

function containsSymmetricalSegment($string) {
    return preg_match('/(.).\1/', $string);
}

function solve($strings, $requirements) {
    $niceStrings = 0;
    foreach ($strings as $string) {
        $valid = true;
        foreach ($requirements as $requirement) {
            if (!$requirement($string)) {
                $valid = false;
            }
        }
        if ($valid) {
            $niceStrings++;
        }
    }
    return $niceStrings;
}

$strings = file("input.txt");
$reqs1 = [
    'containsAtLeastThreeVowels',
    'containsADupeLetter',
    'doesntContainNaughtyParts'
];
$reqs2 = [
    'containsPairs',
    'containsSymmetricalSegment'
];
echo "Part 1: ".solve($strings, $reqs1)."\n";
echo "Part 2: ".solve($strings, $reqs2)."\n";

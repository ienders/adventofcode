<?php

function solve($key, $zeroes) {
    $i = 0;
    $target = str_repeat('0', $zeroes);
    while (substr(md5($key.$i), 0, $zeroes) !== $target) {
        $i++;
    }
    return $i;
}

$key = file_get_contents("secret_key");
echo "Part 1: ".solve($key, 5)."\n";
echo "Part 2: ".solve($key, 6)."\n";

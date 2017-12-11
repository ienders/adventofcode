<?php

define('DISC_MATCH', '/Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)\./');

function initDiscs($input) {
  $discs = [];
  foreach ($input as $line) {
    preg_match(DISC_MATCH, $line, $matches);
    list($_, $disc, $size, $pos) = $matches;
    $discs[intval($disc) - 1] = array('size' => intval($size), 'pos' => intval($pos));
  }
  return $discs;
}

function getCapsuleFromPush($discs, $time) {
  for ($i = 0; $i < count($discs); $i++) {
    $disc = $discs[$i];
    $disc_pos = ($disc['pos'] + $time + $i + 1) % $disc['size'];
    if ($disc_pos != 0) {
      return false;
    }
  }
  return true;
}

function solve($discs) {
  $time = 0;
  while (!getCapsuleFromPush($discs, $time)) $time++;
  return $time;
}

$discs = initDiscs(explode("\n", file_get_contents('input.txt')));
echo 'Part 1 ', solve($discs), "\n";

array_push($discs, array('size' => 11, 'pos' => 0));
echo 'Part 2 ', solve($discs), "\n";

?>

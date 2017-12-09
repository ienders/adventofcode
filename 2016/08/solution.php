<?php

function initialize() {
  $grid = [];
  for ($x = 0; $x < 6; $x++) {
    $row = [];
    for ($y = 0; $y < 50; $y++) $row[$y] = false;
    $grid[$x] = $row;
  }
  return $grid;
}

function draw(&$grid, $a, $b) {
  for ($i = 0; $i < $b; $i++) {
    for ($j = 0; $j < $a; $j++) $grid[$i][$j] = true;
  }
}

function rotate($values, $b) {
  $next = [];
  foreach ($values as $i => $val) {
    $next[($i + $b) % count($values)] = $val;
  }
  return $next;
}

function rotateX(&$grid, $a, $b) {
  $col = [];
  for ($x = 0; $x < count($grid); $x++) {
    array_push($col, $grid[$x][$a]);
  }
  foreach (rotate($col, $b) as $x => $val) {
    $grid[$x][$a] = $val;
  }
}

function rotateY(&$grid, $a, $b) {
  foreach (rotate($grid[$a], $b) as $y => $val) {
    $grid[$a][$y] = $val;
  }
}

function countLit(&$grid) {
  $count = 0;
  foreach ($grid as $row) {
    foreach ($row as $val) {
      if ($val) $count++;
    }
  }
  return $count;
}

function display(&$grid) {
  foreach ($grid as $row) {
    foreach ($row as $i => $val) {
      if ($i % 5 == 0) echo '  ';
      echo $val ? '#' : ' ';
    }
    echo "\n";
  }
}

$grid = initialize();

$commands = explode("\n", file_get_contents('input.txt'));

foreach ($commands as $command) {
  if (preg_match('/^rect (\d+)x(\d+)/', $command, $matches)) {
    draw($grid, intval($matches[1]), intval($matches[2]));
  } elseif (preg_match('/^rotate .+ (x|y)=(\d+) by (\d+)/', $command, $matches)) {
    $axis = $matches[1];
    $a = intval($matches[2]);
    $b = intval($matches[3]);
    $axis == 'x' ? rotateX($grid, $a, $b) : rotateY($grid, $a, $b);
  }
}

echo 'Part 1 ', countLit($grid), "\n";

echo "Part 2\n";

display($grid);

?>

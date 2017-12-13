<?php

ini_set('memory_limit', '4096M');

define('NODE_MATCH', '/.+-x(\d+)-y(\d+)\s+\d+T\s+(\d+)T\s+(\d+)T\s+(\d+)%/');

function buildNodes() {
  $used = [];
  $avail = [];
  $input = explode("\n", file_get_contents('input.txt'));
  foreach ($input as $line) {
    if (preg_match(NODE_MATCH, $line, $matches)) {
      list($_, $x, $y, $u, $a) = array_map('intval', $matches);
      // print_r([$x,$y,$u,$a]);
      if (!array_key_exists($x, $used)) {
        $used[$x] = [];
        $avail[$x] = [];
      }
      $used[$x][$y] = $u;
      $avail[$x][$y] = $a;
    }
  }
  return [ $used, $avail ];
}

function pairNodes($nodes) {
  list($used, $avail) = $nodes;
  $pairs = [];
  for ($x = 0; $x < count($used); $x++) {
    for ($y = 0; $y < count($used[$x]); $y++) {
      if ($used[$x][$y] == 0) continue;
      for ($x2 = 0; $x2 < count($used); $x2++) {
        for ($y2 = 0; $y2 < count($used[$x]); $y2++) {
          if ($x == $x2 && $y == $y2) continue;
          if ($used[$x][$y] <= $avail[$x2][$y2]) {
            array_push($pairs, $x.'-'.$y);
          }
        }
      }
    }
  }
  return $pairs;
}

function printGrid($nodes) {
  list($used, $avail) = $nodes;
  for ($x = 0; $x < count($used); $x++) {
    for ($y = 0; $y < count($used[$x]); $y++) {
      if ($used[$x][$y] > $used[0][0] + $avail[0][0]) {
        echo '#';
      } else if ($x == count($used) - 1 && $y == 0) {
        echo 'G';
      } else if ($x == 0 && $y == 0) {
        echo 'X';
      } else if ($used[$x][$y] == 0) {
        echo '_';
      } else {
        echo '.';
      }
    }
    echo "\n";
  }
  echo "\n";
}

$nodes = buildNodes();
$pairs = pairNodes($nodes);
echo 'Part 1 ', count($pairs), "\n";

echo "Part 2 ... Do it yourself! Use this as a guide. :)\n\n";
printGrid($nodes);

?>

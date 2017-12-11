<?php

define('TRAP_SCENARIOS', [ '^^.', '.^^', '^..', '..^' ]);

function countSafe($row, $row_count) {
  $cols = count($row);
  $safe = 0;

  for ($j = 0; $j < $cols; $j++) {
    if ($row[$j] === '.') $safe++;
  }

  for ($i = 1; $i < $row_count; $i++) {
    $next_row = [];
    for ($j = 0; $j < $cols; $j++) {
      $left = array_key_exists($j - 1, $row) ? $row[$j - 1] : '.';
      $center = $row[$j];
      $right = array_key_exists($j + 1, $row) ? $row[$j + 1] : '.';

      if (in_array($left.$center.$right, TRAP_SCENARIOS)) {
        $tile = '^';
      } else {
        $tile = '.';
        $safe++;
      }
      array_push($next_row, $tile);
    }
    $row = $next_row;
  }

  return $safe;
}

$row = str_split(file_get_contents('input.txt'));

echo 'Part 1 ', countSafe($row, 40), "\n";
echo 'Part 2 ', countSafe($row, 400000), "\n";

?>

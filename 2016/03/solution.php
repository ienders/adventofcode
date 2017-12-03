<?php

function parseRow($row) {
  return array_map('intval', preg_split('/\s+/', trim($row)));  
}

function transform($rows) {
  $triangles = [];
  $transposed = array_map(null, ...$rows);
  foreach ($transposed as $row) {
    for ($i = 0; $i < count($row); $i += 3) {
      array_push($triangles, [ $row[$i], $row[$i + 1], $row[$i + 2] ]);
    }
  }
  return $triangles;
}

function countValid($triangles) {
  $valid = 0;
  foreach ($triangles as $triangle) {
    sort($triangle);
    if ($triangle[0] + $triangle[1] > $triangle[2]) $valid++;
  }
  return $valid;
}

$rows = array_map('parseRow', explode("\n", file_get_contents('input.txt')));

echo 'Part 1 ', countValid($rows), "\n";
echo 'Part 2 ', countValid(transform($rows)), "\n";

?>

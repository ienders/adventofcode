<?php

function transform($rows) {
  $triangles = [];
  $transposed = array_map(null, ...$rows);
  foreach ($transposed as $row) {
    for ($i = 0; $i < count($row); $i += 3) {
      array_push($triangles, [ $row[$i], $row[$i + 1], $row[$i + 2] ]);
    }
  }
  var_dump($triangles);
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

$filename = 'input.txt';

$handle = fopen($filename, 'r');
$rows = explode("\n", fread($handle, filesize($filename)));
fclose($handle);

for ($i = 0; $i < count($rows); $i++) {
  $rows[$i] = array_map('intval', preg_split('/\s+/', trim($rows[$i])));
}

echo 'Part 1 ', countValid($rows), "\n";
echo 'Part 2 ', countValid(transform($rows)), "\n";

?>

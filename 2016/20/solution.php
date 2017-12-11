<?php

function validIps($blocked_ranges) {
  $ip = 0;
  $ips = [];
  $range_index = 0;
  while ($ip <= 4294967295) {
    $range = $blocked_ranges[$range_index];
    if ($ip >= $range[0] && $ip <= $range[1]) {
      $range_index += 1;
      $ip = $range[1] + 1;
    } else if ($ip > $range[1]) {
      $range_index += 1;
    } else {
      array_push($ips, $ip);
      $ip += 1;
    }
  }
  return $ips;
}


$blocked_ranges = explode("\n", file_get_contents('input.txt'));
for ($i = 0; $i < count($blocked_ranges); $i++) {
  $blocked_ranges[$i] = explode("-", $blocked_ranges[$i]);
  $blocked_ranges[$i] = array_map('intval', $blocked_ranges[$i]);
}

usort($blocked_ranges, function($a, $b) { return $a[0] - $b[0]; });

$ips = validIps($blocked_ranges);

echo 'Part 1 ', $ips[0], "\n";
echo 'Part 2 ', count($ips), "\n";

?>
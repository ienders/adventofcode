<?php

function rotateChar($str, $pos, $amount) {
  $char = substr($str, $pos, 1);
  if ($char == '-') {
    $new_char = ' ';
  } else {
    $new_char = chr((ord($char) - 97 + $amount) % 26 + 97);
  }
  return substr_replace($str, $new_char, $pos, 1);
}

$rows = explode("\n", file_get_contents('input.txt'));

$sector_total = 0;
$valid_rooms = [];

foreach ($rows as $row) {
  preg_match('/(.*)-(\d+)\[(.*)\]/', $row, $matches);
  list($_, $name, $sector_id, $checksum) = $matches;
  $sector_id = intval($sector_id);

  $counts = array();
  foreach (str_split($name) as $char) {
    if ($char == '-') continue;
    if (!isset($counts[$char])) {
      $counts[$char] = 0;
    }
    $counts[$char] += 1;
  }

  uksort($counts, function ($a, $b) use ($counts) {
    if ($counts[$a] > $counts[$b]) {
      return -1;
    }
    if ($counts[$b] > $counts[$a]) {
      return 1;
    }
    return strcmp($a, $b);
  });

  $computed_checksum = join(array_slice(array_keys($counts), 0, 5));
  if ($computed_checksum == $checksum) {
    $sector_total += $sector_id;
    array_push($valid_rooms, [ $name, $sector_id ]);
  }
}

foreach ($valid_rooms as $room) {
  list($name, $sector_id) = $room;
  for ($i = 0; $i < strlen($name); $i++) {
    $name = rotateChar($name, $i, $sector_id);
  }
  if (stripos($name, 'north') !== false) {
    $north_pole_sector_id = $sector_id;
  }
}

echo 'Part 1 ', $sector_total, "\n";
echo 'Part 2 ', $north_pole_sector_id, "\n";

?>

<?php

$input = file_get_contents('input.txt');

$password = '';
$i = 0;

for ($iteration = 0; $iteration < 8; $iteration++) {
  while (true) {
    $hash = md5($input.$i);
    $i++;
    if (substr($hash, 0, 5) === "00000") {
      $password .= substr($hash, 5, 1);
      break;
    }
  }
}

echo 'Part 1 ', $password, "\n";

$password = '________';
$i = 0;

while (strpos($password, '_') !== false) {
  $hash = md5($input.$i);
  $i++;
  if (substr($hash, 0, 5) === "00000") {
    $pos = intval(substr($hash, 5, 1), 16);
    if (substr($password, $pos, 1) === '_') {
      $password = substr_replace($password, substr($hash, 6, 1), $pos, 1);
    } 
  }
}

echo 'Part 2 ', $password, "\n";

?>

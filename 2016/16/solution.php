<?php

function gen($txt) {
  $a = $txt;
  $b = str_replace('x', '0', str_replace('0', '1', str_replace('1', 'x', strrev($a))));
  return $a.'0'.$b;  
}

function fill($txt, $disk_size) {
  $content = $txt;
  while (strlen($content) < $disk_size) {
    $content = gen($content);
  }
  return substr($content, 0, $disk_size);
}

function checksum($txt) {
  do {
    $check = '';
    for ($pos = 0; $pos < strlen($txt); $pos += 2) {
      $check .= substr($txt, $pos, 1) == substr($txt, $pos + 1, 1) ? '1' : '0';
    }
    $txt = $check;
  } while (strlen($check) % 2 == 0);
  return $check;
}

function fill_and_checksum($txt, $disk_size) {
  return checksum(fill($txt, $disk_size));
}

$input = file_get_contents('input.txt');

echo 'Part 1 ', fill_and_checksum($input, 272), "\n";
echo 'Part 2 ', fill_and_checksum($input, 35651584), "\n";

?>
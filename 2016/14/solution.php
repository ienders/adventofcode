<?php

function keysort($a, $b) {
  return $a[0] - $b[0];
}

function stretched_md5($str) {
  $hash = $str;
  for ($i = 0; $i < 2017; $i++) {
    $hash = md5($hash);
  }
  return $hash;
}

function generateKeys($salt, $hash_fn) {
  $index = 0;

  $hashes = [];
  $potential_keys = array();
  $keys = [];
  while (true) {
    $hash = $hash_fn($salt.$index);
    foreach ($potential_keys as $key_index => $val) {
      if ($index > ($key_index + 1000)) {
        unset($potential_keys[$key_index]);
      }
      list($search, $key) = $val;
      if (strpos($hash, $search) !== false) {
        array_push($keys, [ $key_index, $key ]);
        unset($potential_keys[$key_index]);
        if (count($keys) == 64) {
          usort($keys, 'keysort');
          return $keys;
        }
      }
    }
    if (preg_match('/(.)\1{2}/', $hash, $matches)) {
      $potential_keys[$index] = [ str_repeat(substr($matches[0], 0, 1), 5), $hash ];
    }
    $index++;
  }
}

$salt = file_get_contents('input.txt');
$keys = generateKeys($salt, 'md5');
echo 'Part 1 ', $keys[count($keys) - 1][0], "\n";

$keys = generateKeys($salt, 'stretched_md5');
echo 'Part 2 ', $keys[count($keys) - 1][0], "\n";

?>

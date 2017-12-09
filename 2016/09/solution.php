<?php

// Screw you instructions. You can't tell me what to do.
ini_set('memory_limit', -1);

function decompress($text) {
  $size = strlen($text);
  $result = '';
  $marker = '';
  $data = '';
  $pos = 0;
  $data_size = 0;
  $data_multiplier = 0;
  $in_marker = false;
  while ($pos < $size) {
    $char = substr($text, $pos, 1);
    if ($in_marker && $char === ')') {
      $in_marker = false;
      list($data_size, $data_multiplier) = array_map('intval', explode("x", $marker));
      $marker = '';
    } elseif ($in_marker) {
      $marker .= $char;
    } elseif ($data_size > 0) {
      $data_size--;
      $data .= $char;
      if ($data_size == 0) {
        $result .= str_repeat($data, $data_multiplier);
        $data = '';
      }
    } elseif ($char === '(') {
      $in_marker = true;
    } else {
      $result .= $char;
    }
    $pos++;
  }
  return $result;
}

function countAndStrip($text) {
  $size = strlen($text);
  $count = 0;
  $stripped = '';
  $marker = '';
  $pos = 0;
  $data_size = 0;
  $in_marker = false;
  while ($pos < $size) {
    $char = substr($text, $pos, 1);
    if ($in_marker && $char === ')') {
      $in_marker = false;
      $data_size = array_map('intval', explode("x", $marker))[0];
      $stripped .= '('.$marker.')';
    } elseif ($in_marker) {
      $marker .= $char;
    } elseif ($data_size > 0) {
      $data_size--;
      $stripped .= $char;
    } elseif ($char === '(') {
      $marker = '';
      $in_marker = true;
    } else {
      $count++;
    }
    $pos++;
  }
  return [ $count, $stripped, $marker === '' ];
}

function multipassDecompress($text) {
  $memo = [ 0, $text, false ];
  while (!$memo[2]) {
    $result = countAndStrip(decompress($memo[1]));
    echo $result[0], ", ", strlen($result[1]), "\n";
    $memo[0] += $result[0];
    $memo[1] = $result[1];
    $memo[2] = $result[2];
  }
  return $memo[0];
}

$input = file_get_contents('input.txt');

echo 'Part 1 ', strlen(decompress($input)), "\n";
echo 'Part 1 ', multipassDecompress($input), "\n";

?>

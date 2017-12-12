<?php

function letterPos(&$txt, $letter) {
  return array_search($letter, $txt);
}

function move(&$txt, $x, $y) {
  array_splice($txt, $y, 0, array_splice($txt, $x, 1));
}

function swap(&$txt, $x, $y) {
  $tmp = $txt[$x];
  $txt[$x] = $txt[$y];
  $txt[$y] = $tmp;
}

function reverseSegment(&$txt, $x, $y) {
  if ($x > $y) list($x, $y) = [ $y, $x ];
  array_splice($txt, $x, $y - $x + 1, array_reverse(array_slice($txt, $x, $y - $x + 1)));
}

function rotateLeft(&$txt, $x) {
  for ($i = 0; $i < $x; $i++) array_push($txt, array_shift($txt));
}

function rotateRight(&$txt, $x) {
  for ($i = 0; $i < $x; $i++) array_unshift($txt, array_pop($txt));
}

function reverseRotateLetter(&$txt, $letter) {
  $lookup = [];
  for ($i = 0; $i < count($txt); $i++) {
    $rotation = $i + 1;
    if ($i >= 4) $rotation++;
    $y = ($i + $rotation) % count($txt);
    $lookup[$y] = $rotation;
  }
  rotateLeft($txt, $lookup[letterPos($txt, $letter)]);
}

function scramble($txt, $instructions) {
  $txt = str_split($txt);
  foreach ($instructions as $instruction) {
    if (preg_match('/move position (\d+) to position (\d+)/', $instruction, $matches)) {
      move($txt, intval($matches[1]), intval($matches[2]));
    } elseif (preg_match('/reverse positions (\d+) through (\d+)/', $instruction, $matches)) {
      reverseSegment($txt, intval($matches[1]), intval($matches[2]));
    } elseif (preg_match('/rotate based on position of letter (\w)/', $instruction, $matches)) {
      $index = letterPos($txt, $matches[1]);
      if ($index >= 4) $index++;
      rotateRight($txt, $index + 1);
    } elseif (preg_match('/rotate (\w+) (\d+) steps?/', $instruction, $matches)) {
      if ($matches[1] == 'left') {
        rotateLeft($txt, intval($matches[2]));
      } else {
        rotateRight($txt, intval($matches[2]));
      }
    } elseif (preg_match('/swap letter (\w) with letter (\w)/', $instruction, $matches)) {
      swap($txt, letterPos($txt, $matches[1]), letterPos($txt, $matches[2]));
    } elseif (preg_match('/swap position (\d+) with position (\d+)/', $instruction, $matches)) {
      swap($txt, intval($matches[1]), intval($matches[2]));
    }
  }
  return join($txt);
}

function descramble($txt, $instructions) {
  $txt = str_split($txt);
  foreach (array_reverse($instructions) as $instruction) {
    if (preg_match('/move position (\d+) to position (\d+)/', $instruction, $matches)) {
      move($txt, intval($matches[2]), intval($matches[1]));
    } elseif (preg_match('/reverse positions (\d+) through (\d+)/', $instruction, $matches)) {
      reverseSegment($txt, intval($matches[1]), intval($matches[2]));
    } elseif (preg_match('/rotate based on position of letter (\w)/', $instruction, $matches)) {
      reverseRotateLetter($txt, $matches[1]);
    } elseif (preg_match('/rotate (\w+) (\d+) steps?/', $instruction, $matches)) {
      if ($matches[1] == 'left') {
        rotateRight($txt, intval($matches[2]));
      } else {
        rotateLeft($txt, intval($matches[2]));
      }
    } elseif (preg_match('/swap letter (\w) with letter (\w)/', $instruction, $matches)) {
      swap($txt, letterPos($txt, $matches[1]), letterPos($txt, $matches[2]));
    } elseif (preg_match('/swap position (\d+) with position (\d+)/', $instruction, $matches)) {
      swap($txt, intval($matches[1]), intval($matches[2]));
    }
  }
  return join($txt);
}

$instructions = explode("\n", file_get_contents('input.txt'));
echo 'Part 1 ', scramble('abcdefgh', $instructions), "\n";
echo 'Part 2 ', descramble('fbgdceah', $instructions), "\n";

?>

<?php

function evaluate(&$registers, $x) {
  if ((string) intval($x) === $x) return intval($x);
  return $registers[$x];
}

function execute(&$registers, $instruction) {
  if (preg_match('/cpy ([^\s]+) (\w+)/', $instruction, $matches)) {
    list($_, $x, $y) = $matches;
    $registers[$y] = evaluate($registers, $x);
  } elseif (preg_match('/inc (\w+)/', $instruction, $matches)) {
    list($_, $x) = $matches;
    $registers[$x] = evaluate($registers, $x) + 1;
  } elseif (preg_match('/dec (\w+)/', $instruction, $matches)) {
    list($_, $x) = $matches;
    $registers[$x] = evaluate($registers, $x) - 1;
  } elseif (preg_match('/jnz ([^\s]+) ([^\s]+)/', $instruction, $matches)) {
    list($_, $x, $y) = $matches;
    if (evaluate($registers, $x) != 0) return intval($y);
  }
  return 1;
}

function run($instructions, $registers) {
  $command = 0;
  while (array_key_exists($command, $instructions)) {
    $command += execute($registers, $instructions[$command]);
  }
  return $registers['a'];
}

$instructions = explode("\n", file_get_contents('input.txt'));
echo 'Part 1 ', run($instructions, array('a' => 0, 'b' => 0, 'c' => 0, 'd' => 0)), "\n";
echo 'Part 2 ', run($instructions, array('a' => 0, 'b' => 0, 'c' => 1, 'd' => 0)), "\n";

?>

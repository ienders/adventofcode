<?php

function evaluate(&$registers, $x) {
  if ((string) intval($x) === $x) return intval($x);
  return $registers[$x];
}

function execute(&$registers, &$instructions, $command) {
  $instruction = $instructions[$command];
  if (preg_match('/cpy ([^\s]+) ([^\d]+)/', $instruction, $matches)) {
    list($_, $x, $y) = $matches;
    $registers[$y] = evaluate($registers, $x);
  } elseif (preg_match('/inc ([^\d]+)/', $instruction, $matches)) {
    list($_, $x) = $matches;
    $registers[$x] = evaluate($registers, $x) + 1;
  } elseif (preg_match('/dec ([^\d]+)/', $instruction, $matches)) {
    list($_, $x) = $matches;
    $registers[$x] = evaluate($registers, $x) - 1;
  } elseif (preg_match('/jnz ([^\s]+) ([^\s]+)/', $instruction, $matches)) {
    list($_, $x, $y) = $matches;
    if (evaluate($registers, $x) != 0 && evaluate($registers, $y) != 0) {
      return evaluate($registers, $y);
    }
  } elseif (preg_match('/tgl (\w+)/', $instruction, $matches)) {
    list($_, $x) = $matches;
    $toggle_command = $command + evaluate($registers, $x);
    if (array_key_exists($toggle_command, $instructions)) {
      $cmd = substr($instructions[$toggle_command], 0, 3);
      if ($cmd == 'inc') {
        $newcmd = 'dec';
      } elseif ($cmd == 'dec' || $cmd == 'tgl') {
        $newcmd = 'inc';
      } elseif ($cmd == 'jnz') {
        $newcmd = 'cpy';
      } elseif ($cmd == 'cpy') {
        $newcmd = 'jnz';
      }
      $nxt = str_replace($cmd, $newcmd, $instructions[$toggle_command]);
      $instructions[$toggle_command] = $nxt;
    }
  }
  return 1;
}

function run($instructions, $registers) {
  $command = 0;
  while (array_key_exists($command, $instructions)) {
    $command += execute($registers, $instructions, $command);
  }
  return $registers['a'];
}

$instructions = explode("\n", file_get_contents('input.txt'));
echo 'Part 1 ', run($instructions, array('a' => 7, 'b' => 0, 'c' => 0, 'd' => 0)), "\n";
echo 'Part 2 ', run($instructions, array('a' => 12, 'b' => 0, 'c' => 1, 'd' => 0)), "\n";

?>

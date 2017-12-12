<?php

function evaluate(&$registers, $x) {
  if ((string) intval($x) === $x) return intval($x);
  return $registers[$x];
}

function execute(&$registers, &$instructions, &$clock_signal, $command) {
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
  } elseif (preg_match('/out ([^\s]+)/', $instruction, $matches)) {
    list($_, $x) = $matches;
    array_push($clock_signal, evaluate($registers, $x));
  } elseif (preg_match('/tgl (\w+)/', $instruction, $matches)) {
    list($_, $x) = $matches;
    $toggle_command = $command + evaluate($registers, $x);
    if (array_key_exists($toggle_command, $instructions)) {
      $cmd = substr($instructions[$toggle_command], 0, 3);
      if ($cmd == 'inc') {
        $newcmd = 'dec';
      } elseif ($cmd == 'dec' || $cmd == 'tgl' || $cmd == 'out') {
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

function run() {
  $target_clock = [];
  for ($i = 0; $i < 20; $i++) {
    array_push($target_clock, 0);
    array_push($target_clock, 1);
  }
  $a = 0;
  $clock_signal = [];
  while (join($clock_signal) != join($target_clock)) {
    $instructions = explode("\n", file_get_contents('input.txt'));
    $registers = array('a' => $a, 'b' => 0, 'c' => 0, 'd' => 0);
    $command = 0;
    $clock_signal = [];
    while (array_key_exists($command, $instructions) && count($clock_signal) < count($target_clock)) {
      $command += execute($registers, $instructions, $clock_signal, $command);
    }
    $a++;
  }
  return $a - 1;
}


echo 'Part 1 ', run(), "\n";

?>

<?php

ini_set('memory_limit', '4096M');

class Elf {
  public $num;
  public $next;
  function __construct($num) {
    $this->num = $num;
  }
}

function setupElves($num_elves) {
  $count = $num_elves;
  list($first, $prev, $mid) = [ null, null, null ];
  for ($i = 1; $i <= $num_elves; $i++) {
    $elf = new Elf($i);
    if ($prev) $prev->next = $elf;
    if (!$first) $first = $elf;
    if ($i == floor($num_elves / 2)) {
      $mid = $elf;
    }
    $prev = $elf;
  }
  $prev->next = $first;
  return [ $first, $mid ];
}

function remove($elf) {
  $elf->next = $elf->next->next;
}

function nextdoorLuckyElf($num_elves, $current) {
  while ($num_elves > 1) {
    remove($current);
    $num_elves--;
    $current = $current->next;
  }
  return $current->num;
}

function acrossLuckyElf($num_elves, $current, $middle) {
  while ($num_elves > 1) {
    if ($num_elves % 2 == 0) $middle = $middle->next;
    remove($middle);
    $num_elves--;
    $current = $current->next;
  }
  return $current->num;
}

$num_elves = intval(file_get_contents('input.txt'));

[ $first_elf, $middle_elf ] = setupElves($num_elves);
echo 'Part 1 ', nextdoorLuckyElf($num_elves, $first_elf), "\n";

[ $first_elf, $middle_elf ] = setupElves($num_elves);
echo 'Part 2 ', acrossLuckyElf($num_elves, $first_elf, $middle_elf), "\n";

?>

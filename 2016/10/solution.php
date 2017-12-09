<?php

define('VALUE_MATCH', '/value (\d+) goes to bot (\d+)/');
define('BOT_MATCH', '/bot (\d+) .+ (bot|output) (\d+) .+ (bot|output) (\d+)/');

function moveTo(&$list, $id, $value) {
  if (!array_key_exists($id, $list)) $list[$id] = [];
  array_push($list[$id], $value);
  sort($list[$id]);
}

function solve($instructions, $target_comp) {
  $bots = [];
  $outputs = [];

  $bot_instructions = [];

  $current_bot = null;
  foreach ($instructions as $instruction) {
    if (preg_match(VALUE_MATCH, $instruction, $matches)) {
      list($_, $value, $bot) = $matches;
      $value = intval($value);
      moveTo($bots, $bot, $value);
      // Only one bot starts with 2 from the initial fetches.
      if (count($bots[$bot]) == 2) $current_bot = $bot;
    } elseif (preg_match(BOT_MATCH, $instruction, $matches)) {
      list($_, $outbot, $low_type, $low_id, $high_type, $high_id) = $matches;
      $bot_instructions[$outbot] = [ $low_type, $low_id, $high_type, $high_id ];
    }
  }

  $bot_stack = [ $current_bot ];
  while (count($bot_stack) > 0) {
    $current_bot = array_shift($bot_stack);
    if ($bots[$current_bot] === $target_comp) return $current_bot;
    list($low_type, $low_id, $high_type, $high_id) = $bot_instructions[$current_bot];
    if ($low_type == 'output') {
      moveTo($outputs, $low_id, array_shift($bots[$current_bot]));
    } else {
      moveTo($bots, $low_id, array_shift($bots[$current_bot]));
      if (count($bots[$low_id]) == 2) array_push($bot_stack, $low_id);
    }
    if ($high_type == 'output') {
      moveTo($outputs, $high_id, array_shift($bots[$current_bot]));
    } else {
      moveTo($bots, $high_id, array_shift($bots[$current_bot]));
      if (count($bots[$high_id]) == 2) array_push($bot_stack, $high_id);
    }
  }
  return $outputs['0'][0] * $outputs['1'][0] * $outputs['2'][0];
}


$instructions = explode("\n", file_get_contents('input.txt'));

echo 'Part 1 ', solve($instructions, [ 17, 61 ]), "\n";
echo 'Part 2 ', solve($instructions, NULL), "\n";

?>

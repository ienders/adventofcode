<?php

$messages = explode("\n", file_get_contents('input.txt'));
$counts = [];

foreach ($messages as $message) {
  $chars = str_split($message);
  for ($i = 0; $i < count($chars); $i++) {
    $counts[$i] = $counts[$i] ?? [];
    $char = $chars[$i];
    $counts[$i][$char] = ($counts[$i][$char] ?? 0) + 1;
  }
}

$max_message = '';
$min_message = '';

foreach ($counts as $count) {
  $max_message .= array_keys($count, max($count))[0];
  $min_message .= array_keys($count, min($count))[0];
}

echo 'Part 1 ', $max_message, "\n";
echo 'Part 2 ', $min_message, "\n";

?>

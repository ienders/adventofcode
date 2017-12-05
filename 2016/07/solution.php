<?php

function sequences($ip) {
  return preg_split('/\[|\]/', $ip);
}

function containsABBA($sequence) {
  $chars = str_split($sequence);
  if (count($chars) < 4) return false;
  for ($i = 0; $i < count($chars) - 3; $i++) {
    if ($chars[$i] == $chars[$i + 3] && 
        $chars[$i + 1] == $chars[$i + 2] &&
        $chars[$i] != $chars[$i + 1]) {
      return true;
    }
  }
  return false;
}

function getABAList($sequence) {
  $chars = str_split($sequence);
  if (count($chars) < 3) return [];
  $aba_list = [];
  for ($i = 0; $i < count($chars) - 2; $i++) {
    if ($chars[$i] == $chars[$i + 2] && $chars[$i] != $chars[$i + 1]) {
      array_push($aba_list, substr($sequence, $i, 3));
    }
  }
  return $aba_list;
}

function containsBAB($sequence, $aba_list) {
  foreach ($aba_list as $aba) {
    $aba = str_split($aba);
    $bab = $aba[1].$aba[0].$aba[1];
    if (strpos($sequence, $bab) !== false) return true;
  }
  return false;
}

function supportsTLS($ip) {
  $in_hypernet = false;
  $abba_found = false;
  foreach (sequences($ip) as $sequence) {
    if (containsABBA($sequence)) {
      if ($in_hypernet) return false;
      $abba_found = true;
    }
    $in_hypernet = !$in_hypernet;
  }
  return $abba_found;
}

function supportsSSL($ip) {
  $sequences = sequences($ip);
  $aba_list = [];
  $in_hypernet = false;
  foreach ($sequences as $sequence) {
    if (!$in_hypernet) {
      $aba_list = array_merge($aba_list, getABAList($sequence));
    }
    $in_hypernet = !$in_hypernet;
  }
  if (count($aba_list) == 0) return false;
  $in_hypernet = false;
  foreach ($sequences as $sequence) {
    if ($in_hypernet && containsBAB($sequence, $aba_list)) return true;
    $in_hypernet = !$in_hypernet;
  }
  return false;
}

$ips = explode("\n", file_get_contents('input.txt'));

$total_tls = 0;
$total_ssl = 0;
foreach ($ips as $ip) {
  if (supportsTLS($ip)) $total_tls++;
  if (supportsSSL($ip)) $total_ssl++;
}

echo 'Part 1 ', $total_tls, "\n";
echo 'Part 2 ', $total_ssl, "\n";

?>

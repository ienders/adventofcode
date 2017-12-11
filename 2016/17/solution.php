<?php

define('DOOR_DIRS', [ 'U', 'D', 'L', 'R' ]);
define('UNLOCKABLE_CHARS', [ 'b', 'c', 'd', 'e', 'f' ]);

class State {

  public $steps;
  public $x;
  public $y;
  public $distance;
  public $directions;

  public function __construct() {
    $this->x = 1;
    $this->y = 1;
    $this->steps = 0;
    $this->directions = '';
    $this->setDistance();
  }

  private function setDistance() {
    $this->distance = abs(4 - $this->x) + abs(4 - $this->y);
  }

  public function move($direction) {
    $this->directions .= $direction;
    if ($direction == 'U') {
      $this->y = $this->y - 1;
    } elseif ($direction == 'D') {
      $this->y = $this->y + 1;
    } elseif ($direction == 'L') {
      $this->x = $this->x - 1;
    } elseif ($direction == 'R') {
      $this->x = $this->x + 1;
    }
    $this->steps++;
    $this->setDistance();
  }

  public function visitKey() {
    return $this->directions.':'.$this->x.','.$this->y;
  }

  public function validDirections($passcode) {
    $door_keys = str_split(substr(md5($passcode.$this->directions), 0, 4));
    $valid = [];
    for ($i = 0; $i < 4; $i++) {
      if (in_array($door_keys[$i], UNLOCKABLE_CHARS)) {
        array_push($valid, DOOR_DIRS[$i]);
      }
    }
    return $valid;
  }

}

class VaultFinder {

  static function stateCmp($a, $b) {
    if ($a->distance == $b->distance) {
      return $a->steps - $b->steps;
    }
    return $a->distance - $b->distance;
  }

  public function __construct($passcode) {
    $this->passcode = $passcode;
    $this->visited = array();
  }

  private function validPosition($state) {
    return $state->x > 0 && $state->x <= 4 && $state->y > 0 && $state->y <= 4;
  }

  private function frontier($state) {
    $next_states = [];
    foreach ($state->validDirections($this->passcode) as $direction) {
      $next = clone $state;
      $next->move($direction[0], $direction[1]);
      if ($this->target) $next->setDistance($this->target);
      $key = $next->visitKey();
      if (!array_key_exists($key, $this->visited) && $this->validPosition($next)) {
        array_push($next_states, $next);
        $this->visited[$key] = true;
      }
    }
    return $next_states;
  }

  public function solve() {
    $next = new State();
    $queue = [];
    while ($next->distance != 0) {
      $queue = array_merge($queue, $this->frontier($next));
      usort($queue, array(get_class($this), 'stateCmp'));
      $next = array_shift($queue);
    }
    return $next;
  }

}

class InefficientVaultFinder extends VaultFinder {

  static function stateCmp($a, $b) {
    return -1 * parent::stateCmp($a, $b);
  }

}

$passcode = file_get_contents('input.txt');

$finder = new VaultFinder($passcode);
echo 'Part 1 ', $finder->solve()->directions, "\n";

$finder = new InefficientVaultFinder($passcode);
echo 'Part 2 ', $finder->solve()->steps, "\n";

?>

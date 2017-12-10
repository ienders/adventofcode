<?php

class State {

  public $steps;
  public $x;
  public $y;
  public $distance;

  public function __construct($x, $y, $steps) {
    $this->x = $x;
    $this->y = $y;
    $this->steps = $steps;
  }

  public function move($by_x, $by_y) {
    $this->x = $this->x + $by_x;
    $this->y = $this->y + $by_y;
    $this->steps++;
  }

  public function setDistance($target) {
    $this->distance = abs($target[0] - $this->x) + abs($target[1] - $this->y);
  }

  public function visitKey() {
    return $this->x.','.$this->y;
  }

}

class MazeTraverser {

  public function __construct($designers_number) {
    $this->designers_number = $designers_number;
    $this->visited = array();
  }

  public function isWall($x, $y) {
    $bits = decbin($x * $x + 3 * $x + 2 * $x * $y + $y + $y * $y + $this->designers_number);
    return substr_count($bits, '1') % 2 == 1;
  }

  private function validPosition($state) {
    if ($state->x < 0 || $state->y < 0) return false;
    return !$this->isWall($state->x, $state->y);
  }

  private function frontier($state) {
    $next_states = [];
    foreach ([ [ 1, 0 ], [ 0, 1 ], [ 0, -1 ], [ -1, 0 ] ] as $direction) {
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
    $initial_state = new State(1, 1, 0);
    if ($this->target) $initial_state->setDistance($this->target);
    $next = $initial_state;
    $queue = [];
    while ($this->continue($next)) {
      $queue = array_merge($queue, $this->frontier($next));
      usort($queue, array(get_class($this), 'stateCmp'));
      $next = array_shift($queue);
    }
    return $this->returns($next);
  }

}

class OptimalMazeTraverser extends MazeTraverser {

  static function stateCmp($a, $b) {
    if ($a->distance == $b->distance) {
      return $a->steps - $b->steps;
    }
    return $a->distance - $b->distance;
  }

  public function __construct($designers_number, $target) {
    parent::__construct($designers_number);
    $this->target = $target;
  }

  protected function continue($state) {
    return $state->distance != 0;
  }

  protected function returns($state) {
    return $state->steps;
  }

}

class BreadthFirstMazeTraverser extends MazeTraverser {

  static function stateCmp($a, $b) {
    return $a->steps - $b->steps;
  }

  public function __construct($designers_number, $iterations) {
    parent::__construct($designers_number);
    $this->iterations = $iterations;
  }

  protected function continue($state) {
    return $state->steps < $this->iterations;
  }

  protected function returns($state) {
    return count($this->visited);
  }

}

$input = intval(file_get_contents('input.txt'));

$traverser = new OptimalMazeTraverser($input, [ 31, 39 ]);
echo 'Part 1 ', $traverser->solve(), "\n";

$traverser = new BreadthFirstMazeTraverser($input, 50);
echo 'Part 2 ', $traverser->solve(), "\n";

?>

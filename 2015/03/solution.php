<?php

class SantaRunner {

    function __construct() {
        $this->x = 0;
        $this->y = 0;
    }

    function visit(&$grid) {
        $grid[$this->x.','.$this->y] = true;
    }

    function move($command) {
        switch($command) {
            case '^':
                return $this->x++;
            case '>':
                return $this->y++;
            case 'v':
                return $this->x--;
            case '<':
                return $this->y--;
        }
    }
}

function solve($runners) {
    $commands = str_split(file_get_contents("input.txt"));

    $grid = [];
    foreach ($runners as $santa) {
        $santa->visit($grid);
    }

    $i = 0;
    foreach ($commands as $command) {
        $santa = $runners[$i % sizeof($runners)];
        $santa->move($command);
        $santa->visit($grid, $loc);
        $i += 1;
    }
    return sizeof($grid);
}

echo "Part 1: ".solve([ new SantaRunner() ])."\n";
echo "Part 2: ".solve([ new SantaRunner(), new SantaRunner() ])."\n";

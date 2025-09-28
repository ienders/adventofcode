use std::{str::FromStr, cmp};

use super::Solution;

struct Game {
  id: i8,
  sets: Vec<Set>
}

impl FromStr for Game {
  type Err = std::num::ParseIntError;

  fn from_str(game_str: &str) -> Result<Self, Self::Err> {
    let parts: Vec<&str> = game_str.split(": ").collect();
    let game_str = parts[0];
    let id: i8 = game_str.split(" ").collect::<Vec<&str>>()[1].parse().unwrap();
    let sets = parts[1].split("; ").map(|set_str| Set::from_str(set_str).unwrap()).collect();
    Ok(Game { id, sets })
  }
}

struct Set {
  red: i8,
  green: i8,
  blue: i8
}

impl FromStr for Set {
  type Err = std::num::ParseIntError;

  fn from_str(set_str: &str) -> Result<Self, Self::Err> {
    let parts: Vec<&str> = set_str.split(", ").collect();
    let mut red = 0;
    let mut green = 0;
    let mut blue = 0;

    for part in parts {
      let number_color: Vec<&str> = part.split(" ").collect();
      let number = number_color[0].parse().unwrap();
      match number_color[1] {
        "red" => red = number,
        "green" => green = number,
        "blue" => blue = number,
        _ => panic!()
      };
    }

    Ok(Set { red, green, blue })
  }
}

fn parse_games(input: &Vec<String>) -> Vec<Game> {
  return input.iter().map(|line| Game::from_str(line).unwrap()).collect();
}

fn valid_set(set: &Set) -> bool {
  return set.red <= 12 && set.green <= 13 && set.blue <= 14;
}

fn valid_game(game: &Game) -> bool {
  for set in &game.sets {
    if !valid_set(&set) {
      return false;
    }
  }
  return true;
}

fn maximal_set(game: &Game) -> [i8; 3] {
  let mut max = [0,0,0];
  for set in &game.sets {
    max[0] = cmp::max(max[0], set.red);
    max[1] = cmp::max(max[1], set.green);
    max[2] = cmp::max(max[2], set.blue);
  }
  return max;
}

pub struct Day2<'a> {
  pub input: &'a Vec<String>
}

impl Solution for Day2<'_> {
  fn part1(&self) -> String {
    let mut sum: i16 = 0;
    for game in parse_games(self.input) {
      if valid_game(&game) {
        sum += game.id as i16;
      }
    }
    return sum.to_string()
  }

  fn part2(&self) -> String {
    let mut sum: i32 = 0;
    for game in parse_games(self.input) {
      let max = maximal_set(&game);
      sum += max[0] as i32 * max[1] as i32 * max[2] as i32;
    }
    return sum.to_string()
  }
}

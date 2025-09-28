use std::{collections::{HashSet, HashMap}, str::FromStr};

use super::Solution;

struct Card {
  winning_numbers: HashSet<i32>,
  selected_numbers: HashSet<i32>
}

impl FromStr for Card {
  type Err = std::num::ParseIntError;

  fn from_str(card_str: &str) -> Result<Self, Self::Err> {
    let card_parts: Vec<&str> = card_str.split(": ").collect();
    let numbers_str_parts: Vec<&str> = card_parts[1].split(" | ").collect();
    let winning_numbers = HashSet::<i32>::from_iter(
      numbers_str_parts[0].split_whitespace()
        .map(|val| val.parse::<i32>().unwrap())
    );
    let selected_numbers = HashSet::<i32>::from_iter(
      numbers_str_parts[1].split_whitespace()
        .map(|val| val.parse::<i32>().unwrap())
    );

    Ok(Card { winning_numbers, selected_numbers })
  }
}

fn parse_cards(input: &Vec<String>) -> Vec<Card> {
  return input.iter().map(|line| Card::from_str(line).unwrap()).collect();
}

fn num_matches(card: &Card) -> i16 {
  let mut matches = 0;
  for number in &card.winning_numbers {
    match &card.selected_numbers.get(&number) {
        Some(_) => matches += 1,
        None => {},
    }
  }
  return matches;
}

pub struct Day4<'a> {
  pub input: &'a Vec<String>
}

impl Solution for Day4<'_> {
  fn part1(&self) -> String {
    let mut sum: i32 = 0;
    let base: i32 = 2;
    for card in parse_cards(&self.input) {
      let matches = num_matches(&card);
      if matches > 0 {
        sum += base.pow(matches as u32 - 1);
      }
    }
    return sum.to_string();
  }

  fn part2(&self) -> String {
    let cards = parse_cards(&self.input);
    let mut copy_counts: HashMap<i16, i32> = HashMap::<i16, i32>::new();
    for i in 0..cards.len() as i16 {
      copy_counts.entry(i).or_insert(0);
      *copy_counts.get_mut(&i).unwrap() += 1;

      let card = &cards[i as usize];
      let matches = num_matches(&card);
      for j in i + 1..i + matches + 1 as i16 {
        copy_counts.entry(j).or_insert(0);
        *copy_counts.get_mut(&j).unwrap() += 1 * copy_counts.get(&i).unwrap();
      }
    }

    let mut sum = 0;
    for counts in copy_counts.values() {
      sum += counts;
    }
    return sum.to_string();
  }
}

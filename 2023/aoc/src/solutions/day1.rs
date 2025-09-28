use core::panic;
use super::Solution;

fn first_int<I>(chars: I) -> u32 where I: Iterator<Item=char> {
  for character in chars {
      if character.is_numeric() {
          return character.to_digit(10).unwrap();
      }
  }
  panic!()
}

fn digitize_words(line: &str) -> String {
  return line
      .replace("one", "o1e")
      .replace("two", "t2o")
      .replace("three", "t3e")
      .replace("four", "f4r")
      .replace("five", "f5e")
      .replace("six", "s6x")
      .replace("seven", "s7n")
      .replace("eight", "e8t")
      .replace("nine", "n9e");
}

pub struct Day1<'a> {
  pub input: &'a Vec<String>
}

impl Solution for Day1<'_> {
  fn part1(&self) -> String {
      let mut sum = 0;
      for line in self.input {
          sum += first_int(line.chars()) * 10 + first_int(line.chars().rev())
      }
      return sum.to_string();
  }

  fn part2(&self) -> String {
      let mut sum = 0;
      for line in self.input {
          let transformed = digitize_words(&line);
          sum += first_int(transformed.chars()) * 10 + first_int(transformed.chars().rev())
      }
      return sum.to_string();
  }
}

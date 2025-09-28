use std::{cmp, collections::HashMap};

use super::Solution;

#[derive(Clone, Copy)]
#[derive(PartialEq)]
#[derive(Hash)]
struct Adjacency {
  x: i16,
  y: i16,
  symbol: char
}

impl Eq for Adjacency {}

struct SchematicNumber {
  number: i32,
  adjacency: Option<Adjacency>
}

impl SchematicNumber {
  pub fn new(number: i32, x: i16, y: i16, matrix: &Vec<Vec<char>>) -> Self {
    let len = number.to_string().len();

    let mut adjacency: Option<Adjacency> = None;

    for i in cmp::max(0, x - 1) as usize..=cmp::min(x + 1, matrix.len() as i16 - 1) as usize {
      for j in cmp::max(0, y - 1) as usize..=cmp::min(y + len as i16, matrix[i].len() as i16 - 1) as usize {
        if matrix[i][j] != '.' && !matrix[i][j].is_numeric() {
          adjacency = Some(Adjacency { x: i as i16, y: j as i16, symbol: matrix[i][j] });
        }
      }
    }

    SchematicNumber {
      number, adjacency
    }
  }
}

fn input_as_matrix(input: &Vec<String>) -> Vec<Vec<char>> {
  return input.iter().map(|line|
    line.chars().collect()
  ).collect();
}

fn number_is_adjacent(number: &SchematicNumber) -> bool {
  return match number.adjacency {
    Some(_) => true,
    None => false
  }
}

fn find_numbers(matrix: &Vec<Vec<char>>) -> Vec<SchematicNumber> {
  let mut numbers: Vec<SchematicNumber> = Vec::<SchematicNumber>::new();

  let mut i = 0;
  while i < matrix.len() {
    let mut number: i32 = 0;
    let mut y: i16 = 0;
    let mut j = 0;
    while j < matrix[i].len() {
      let val = matrix[i][j];
      if val.is_numeric() {
        if number == 0 {
          y = j as i16;
        }
        number = number * 10 + val.to_digit(10).unwrap() as i32;
      } else if number > 0 {
        numbers.push(SchematicNumber::new(number, i as i16, y, &matrix));
        number = 0;
        y = 0;
      }
      j += 1;
    }
    if number > 0 {
      numbers.push(SchematicNumber::new(number, i as i16, y, &matrix));
    }
    i += 1;
  }
  return numbers;
}

fn adjacency_map(matrix: &Vec<Vec<char>>) -> HashMap<Adjacency, Vec<SchematicNumber>> {
  let numbers = find_numbers(matrix);
  let mut map = HashMap::<Adjacency, Vec<SchematicNumber>>::new();
  for number in numbers {
    if number_is_adjacent(&number) {
      let adjacency = number.adjacency.unwrap();
      map.entry(adjacency).or_insert(Vec::<SchematicNumber>::new());
      map.get_mut(&adjacency).unwrap().push(number);
    }
  }
  return map;
}

pub struct Day3<'a> {
  pub input: &'a Vec<String>
}

impl Solution for Day3<'_> {
  fn part1(&self) -> String {
    let matrix = input_as_matrix(&self.input);
    let mut sum: i64 = 0;
    for number in find_numbers(&matrix) {
      if number_is_adjacent(&number) {
        sum += number.number as i64;
      }
    }
    return sum.to_string();
  }

  fn part2(&self) -> String {
    let matrix = input_as_matrix(&self.input);
    let map = adjacency_map(&matrix);
    let mut sum: i32 = 0;
    for adjacency in map.keys() {
      let numbers = &map[adjacency];
      if adjacency.symbol == '*' && numbers.len() == 2 {
        sum += numbers[0].number * numbers[1].number;
      }
    }
    return sum.to_string();
  }
}

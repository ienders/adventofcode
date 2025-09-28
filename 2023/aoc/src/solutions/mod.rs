pub use crate::solutions::solution::Solution;
pub use crate::solutions::day1::Day1;
pub use crate::solutions::day2::Day2;
pub use crate::solutions::day3::Day3;
pub use crate::solutions::day4::Day4;

mod solution;
mod day1;
mod day2;
mod day3;
mod day4;

pub fn solution(day: i8, input: &Vec< String>) -> Box<dyn Solution + '_> {
    return match day {
        1 => Box::new(Day1 { input }),
        2 => Box::new(Day2 { input }),
        3 => Box::new(Day3 { input }),
        4 => Box::new(Day4 { input }),
        _ => panic!("Day not yet implemented!")
    }
}

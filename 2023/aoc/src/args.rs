use std::env;

fn help() {
  println!("usage:
aoc <int>
  Run solution for day
");
}

pub fn get_day() -> i8 {
  let args: Vec<String> = env::args().collect();

  match args.len() {
    // one argument passed
    2 => {
      let arg1: i8 = match args[1].parse() {
        Ok(n) => n,
        Err(_) => panic!("Invalid day")
      };
      if arg1 > 25 || arg1 < 1 {
        panic!("Invalid day")
      }
      return arg1;
    },
    _ => {
      help();
      panic!()
    }
  }
}

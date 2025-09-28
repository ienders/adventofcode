mod args;
mod input;
mod session;
mod solutions;

fn main() {
    let session = session::get();
    let day = args::get_day();
    let input = input::get_input(&session, day);
    let sol = solutions::solution(day, &input);
    let part1 = sol.part1();
    let part2 = sol.part2();

    println!("Part 1: {part1}");
    println!("Part 2: {part2}")
}

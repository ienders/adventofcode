use reqwest::blocking::Client;

pub fn get_input(session: &str, day: i8) -> Vec<String> {
  let client = Client::new();
  let contents = client.get(format!("https://adventofcode.com/2023/day/{day}/input"))
    .header("Cookie", format!("session={session}")).send().expect("Unable to get input").text().unwrap().trim_end().to_string();

  return contents.split("\n").map(str::to_string).collect();
}

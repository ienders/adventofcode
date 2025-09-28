use dotenv::dotenv;

pub fn get() -> String {
  dotenv().ok();
  return std::env::var("AOC_SESSION").expect("Need AOC_SESSION");
}

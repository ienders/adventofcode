rules = File.read('input.txt').split("\n").map {|line| line.split(' => ') }

pattern = [
  [ '.', '#', '.' ],
  [ '.', '.', '#' ],
  [ '#', '#', '#' ]
]

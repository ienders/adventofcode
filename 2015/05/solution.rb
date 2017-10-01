class NiceClassifier

  def initialize(file)
    @file = file
  end

  def solve
    nice_folks = 0
    @file.each_line do |line|
      nice_folks += 1 if nice?(line)
    end
    nice_folks
  end

end

class BasicNiceClassifier < NiceClassifier

  HAS_AT_LEAST_THREE_VOWELS = /([aeiou].*){3}/
  HAS_CONSECUTIVE_CHARACTERS = /(.)\1+/
  HAS_BAD_THINGS = /(ab)|(cd)|(pq)|(xy)/

  def nice?(str)
    str.match(HAS_AT_LEAST_THREE_VOWELS) &&
        str.match(HAS_CONSECUTIVE_CHARACTERS) &&
        !str.match(HAS_BAD_THINGS)
  end

end

class BetterNiceClassifier < NiceClassifier

  HAS_REPEATING_PAIRS = /(..).*\1/
  HAS_REPEATED_LETTERS_INTERJECTED = /(.).\1/

  def nice?(str)
    str.match(HAS_REPEATING_PAIRS) && str.match(HAS_REPEATED_LETTERS_INTERJECTED)
  end

end

puts 'Part 1', BasicNiceClassifier.new(File.open('input.txt')).solve
puts 'Part 2', BetterNiceClassifier.new(File.open('input.txt')).solve

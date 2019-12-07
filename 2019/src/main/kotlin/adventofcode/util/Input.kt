package adventofcode.util

import adventofcode.Solution
import java.io.File

fun Solution.inputLines(filename: String) =
    File(javaClass.classLoader.getResource(filename)!!.file).readLines()

fun Solution.inputLinesAsInts(filename: String) =
    inputLines(filename).map(String::toInt)

fun Solution.inputAsString(filename: String) =
    inputLines(filename).first()

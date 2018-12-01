package adventofcode.util

import adventofcode.Solution
import java.io.File

fun Solution.inputLines(filename: String) =
    File(javaClass.classLoader.getResource(filename).file).readLines()
package adventofcode

import java.lang.IllegalStateException
import java.util.*

class Day6Solution : Solution(6) {

    private val pairs: List<Pair<String, String>> =
        inputLines.map { line -> line.split(")").let { Pair(it[0], it[1])} }

    private class Node {

        val orbits: MutableList<Node> = mutableListOf()

        lateinit var parent: Node

        var distance: Int? = null

        fun addOrbit(child: Node) {
            orbits.add(child)
            child.parent = this
        }

        fun numOrbits(level: Int = 1): Int =
            orbits.size * level + orbits.map { it.numOrbits(level + 1) }.sum()

    }

    private val system = mutableMapOf<String, Node>().also {
        pairs.forEach { pair ->
            it[pair.second] = Node()
        }
        it["COM"] = Node()
    }

    init {
        pairs.forEach { pair ->
            val parent = system[pair.first]!!
            val child = system[pair.second]!!
            parent.addOrbit(child)
        }
    }

    private fun searchDepth(start: Node, goal: Node): Int {
        val queue: Queue<Node> = ArrayDeque()
        start.distance = 0
        queue.add(start)
        while (queue.isNotEmpty()) {
            val currentNode = queue.remove()
            if (currentNode == goal) {
                return currentNode.distance!!
            }

            val edges = mutableListOf(currentNode.parent)
            edges.addAll(currentNode.orbits)

            edges.forEach { node ->
                if (node.distance == null) {
                    node.distance = currentNode.distance!! + 1
                    queue.add(node)
                }
            }
        }
        throw IllegalStateException("No path found")
    }

    override fun part1() = system["COM"]!!.numOrbits().toString()

    override fun part2() = searchDepth(
        system["YOU"]!!.parent,
        system["SAN"]!!.parent
    ).toString()

}

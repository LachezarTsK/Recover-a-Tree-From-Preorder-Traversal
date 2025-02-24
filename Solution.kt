
class Solution {

    private var index: Int = 0
    private var traversal: String = ""

    fun recoverFromPreorder(traversal: String): TreeNode? {
        this.traversal = traversal

        var value: Int = extractValue()
        val root = TreeNode(value)

        val nodes = ArrayDeque<TreeNode>()
        nodes.addLast(root)

        while (index < this.traversal.length) {
            val level: Int = extractLevel()
            while (!nodes.isEmpty() && nodes.size != level) {
                nodes.removeLast()
            }

            if (!nodes.isEmpty()) {
                value = extractValue()
                val next = TreeNode(value)
                updateTree(next, nodes.last())
                nodes.addLast(next)
            }
        }

        return root
    }

    private fun extractValue(): Int {
        var value = 0
        while (index < traversal.length && Character.isDigit(traversal[index])) {
            value = value * 10 + (traversal[index] - '0')
            ++index
        }
        return value
    }

    private fun extractLevel(): Int {
        var level = 0
        while (index < traversal.length && traversal[index] == '-') {
            ++level
            ++index
        }
        return level
    }

    private fun updateTree(next: TreeNode, parent: TreeNode) {
        if (parent.left == null) {
            parent.left = next
        } else {
            parent.right = next
        }
    }
}

/*
Class TreeNode is in-built in the solution file on leetcode.com.
When running the code on the website, do not include this class.
 */
class TreeNode(var `val`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

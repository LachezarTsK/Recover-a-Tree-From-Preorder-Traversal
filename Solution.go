
package main

import "unicode"

/*
Struct TreeNode is in-built in the solution file on leetcode.com.
When running the code on the website, do not include this struct.
*/
type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func NewTreeNode(value int) *TreeNode {
    treeNode := &TreeNode {
        Val: value,
    }
    return treeNode
}

var index int
var traversal string

func recoverFromPreorder(inputTraversal string) *TreeNode {
    index = 0
    traversal = inputTraversal
    var value int = extractValue()
    root := NewTreeNode(value)

    nodes := make([]*TreeNode, 0)
    nodes = append(nodes, root)

    for index < len(traversal) {
        var level int = extractLevel()
        for len(nodes) > 0 && len(nodes) != level {
            nodes = nodes[0 : len(nodes) - 1]
        }

        if len(nodes) > 0 {
            value = extractValue()
            next := NewTreeNode(value)
            updateTree(next, nodes[len(nodes) - 1])
            nodes = append(nodes, next)
        }
    }

    return root
}

func extractValue() int {
    value := 0
    for index < len(traversal) && unicode.IsDigit(rune(traversal[index])) {
        value = value*10 + int((traversal[index] - '0'))
        index++
    }
    return value
}

func extractLevel() int {
    level := 0
    for index < len(traversal) && traversal[index] == '-' {
        level++
        index++
    }
    return level
}

func updateTree(next *TreeNode, parent *TreeNode) {
    if parent.Left == nil {
        parent.Left = next
    } else {
        parent.Right = next
    }
}

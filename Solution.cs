
using System;
using System.Collections.Generic;


public class Solution
{
    private int index;
    private char[]? traversal;

    public TreeNode RecoverFromPreorder(string traversal)
    {
        this.traversal = traversal.ToCharArray();

        int value = ExtractValue();
        TreeNode root = new TreeNode(value);

        Stack<TreeNode> nodes = new Stack<TreeNode>();
        nodes.Push(root);

        while (index < this.traversal.Length)
        {
            int level = ExtractLevel();
            while (nodes.Count > 0 && nodes.Count != level)
            {
                nodes.Pop();
            }

            if (nodes.Count > 0)
            {
                value = ExtractValue();
                TreeNode next = new TreeNode(value);
                UpdateTree(next, nodes.Peek());
                nodes.Push(next);
            }
        }

        return root;
    }

    private int ExtractValue()
    {
        int value = 0;
        while (index < traversal!.Length && char.IsDigit(traversal[index]))
        {
            value = value * 10 + (traversal[index] - '0');
            ++index;
        }
        return value;
    }

    private int ExtractLevel()
    {
        int level = 0;
        while (index < traversal!.Length && traversal[index] == '-')
        {
            ++level;
            ++index;
        }
        return level;
    }

    private void UpdateTree(TreeNode next, TreeNode parent)
    {
        if (parent.left == null)
        {
            parent.left = next;
        }
        else
        {
            parent.right = next;
        }
    }
}


/*
Class TreeNode is in-built in the solution file on leetcode.com. 
When running the code on the website, do not include this class.
 */
public class TreeNode
{
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null)
    {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

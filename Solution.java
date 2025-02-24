
import java.util.Stack;

public class Solution {

    private int index;
    private char[] traversal;

    public TreeNode recoverFromPreorder(String traversal) {
        this.traversal = traversal.toCharArray();

        int value = extractValue();
        TreeNode root = new TreeNode(value);

        Stack<TreeNode> nodes = new Stack<>();
        nodes.add(root);

        while (index < this.traversal.length) {
            int level = extractLevel();
            while (!nodes.isEmpty() && nodes.size() != level) {
                nodes.pop();
            }

            if (!nodes.isEmpty()) {
                value = extractValue();
                TreeNode next = new TreeNode(value);
                updateTree(next, nodes.peek());
                nodes.add(next);
            }
        }

        return root;
    }

    private int extractValue() {
        int value = 0;
        while (index < traversal.length && Character.isDigit(traversal[index])) {
            value = value * 10 + (traversal[index] - '0');
            ++index;
        }
        return value;
    }

    private int extractLevel() {
        int level = 0;
        while (index < traversal.length && traversal[index] == '-') {
            ++level;
            ++index;
        }
        return level;
    }

    private void updateTree(TreeNode next, TreeNode parent) {
        if (parent.left == null) {
            parent.left = next;
        } else {
            parent.right = next;
        }
    }
}

/*
Class TreeNode is in-built in the solution file on leetcode.com. 
When running the code on the website, do not include this class.
 */
class TreeNode {

    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }

    TreeNode(int val) {
        this.val = val;
    }

    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

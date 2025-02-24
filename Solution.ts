
function recoverFromPreorder(traversal: string): TreeNode | null {
    this.index = 0;
    this.traversal = traversal;
    this.ASCII_ZERO = 48;

    let value = extractValue();
    const root = new TreeNode(value);

    const nodes: TreeNode[] = new Array();
    nodes.push(root);

    while (this.index < this.traversal.length) {
        let level = extractLevel();
        while (nodes.length > 0 && nodes.length !== level) {
            nodes.pop();
        }

        if (nodes.length > 0) {
            value = extractValue();
            const next = new TreeNode(value);
            updateTree(next, nodes[nodes.length - 1]);
            nodes.push(next);
        }
    }

    return root;
};

function extractValue(): number {
    let value = 0;
    while (this.index < this.traversal.length && isDigit(this.traversal[this.index])) {
        value = value * 10 + (this.traversal.codePointAt(this.index) - this.ASCII_ZERO);
        ++this.index;
    }
    return value;
}

function extractLevel(): number {
    let level = 0;
    while (this.index < this.traversal.length && this.traversal[this.index] === '-') {
        ++level;
        ++this.index;
    }
    return level;
}

function updateTree(next: TreeNode, parent: TreeNode): void {
    if (parent.left === null) {
        parent.left = next;
    } else {
        parent.right = next;
    }
}

function isDigit(current: string): boolean {
    return current >= '0' && current <= '9';
}

/*
Class TreeNode is in-built in the solution file on leetcode.com. 
When running the code on the website, do not include this class.
 */
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

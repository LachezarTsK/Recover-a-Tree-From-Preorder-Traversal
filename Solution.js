
/**
 * @param {string} traversal
 * @return {TreeNode}
 */
var recoverFromPreorder = function (traversal) {
    this.index = 0;
    this.traversal = traversal;
    this.ASCII_ZERO = 48;

    let value = extractValue();
    const root = new TreeNode(value);

    const nodes = new Array();
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

/**
 * @return {number}
 */
function extractValue() {
    let value = 0;
    while (this.index < this.traversal.length && isDigit(this.traversal[this.index])) {
        value = value * 10 + (this.traversal.codePointAt(this.index) - this.ASCII_ZERO);
        ++this.index;
    }//isDigit(this.traversal[this.index])
    return value;
}

/**
 * @return {number}
 */
function extractLevel() {
    let level = 0;
    while (this.index < this.traversal.length && this.traversal[this.index] === '-') {
        ++level;
        ++this.index;
    }
    return level;
}

/**
 * @param {TreeNode} next
 * @param {TreeNode} parent
 * @return {void}
 */
function updateTree(next, parent) {
    if (parent.left === null) {
        parent.left = next;
    } else {
        parent.right = next;
    }
}

/**
 * @param {string} current
 * @return {boolean}
 */
function isDigit(current) {
    return current >= '0' && current <= '9';
}

/*
 Function TreeNode is in-built in the solution file on leetcode.com. 
 When running the code on the website, do not include this function.
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

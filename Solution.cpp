
#include <string>
#include <vector>
using namespace std;

/*
Struct TreeNode is in-built in the solution file on leetcode.com.
When running the code on the website, do not include this struct.
 */
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;

    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* left, TreeNode* right) : val(x), left(left), right(right) {}
};

class Solution {

    int index = 0;
    unique_ptr<string> traversal;

public:
    TreeNode* recoverFromPreorder(const string& traversal) {
        this->traversal = make_unique<string>(traversal);

        int value = extractValue();
        TreeNode* root = new TreeNode(value);

        /*
        Alternatives to vector<TreeNode*> can be
        deque<TreeNode*>, stack<TreeNode*>, list<TreeNode*>

        Since we are only adding / removing from the back, vector is as good as,
        or even better than, the alternatives.

        The implementation of vector always uses a continuous chunk of memory,
        which makes it extremely fast for most operations.
        So, unless there are some specific requirements,
        such as removing an element from the middle or the front,
        vector should be your resizable container of choice in C++.
        */
        vector<TreeNode*> nodes;
        nodes.push_back(root);

        while (index < this->traversal->size()) {
            int level = extractLevel();
            while (!nodes.empty() && nodes.size() != level) {
                nodes.pop_back();
            }

            if (!nodes.empty()) {
                value = extractValue();
                TreeNode* next = new TreeNode(value);
                updateTree(next, nodes.back());
                nodes.push_back(next);
            }
        }

        return root;
    }

private:
    int extractValue() {
        int value = 0;
        while (index < traversal->size() && isdigit(traversal->at(index))) {
            value = value * 10 + (traversal->at(index) - '0');
            ++index;
        }
        return value;
    }

    int extractLevel() {
        int level = 0;
        while (index < traversal->size() && traversal->at(index) == '-') {
            ++level;
            ++index;
        }
        return level;
    }

    void updateTree(TreeNode* next, TreeNode* parent) const {
        if (parent->left == nullptr) {
            parent->left = next;
        }
        else {
            parent->right = next;
        }
    }
};

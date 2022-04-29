const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    constructor() {
        this.rootEl = null;
    }

    root() {
        return this.rootEl;
    }

    addNode(node, newNode) {
        if (node.data > newNode.data) {
            node.left === null ?
                node.left = newNode :
                this.addNode(node.left, newNode);
        } else if (node.data < newNode.data) {
            node.right === null ?
                node.right = newNode :
                this.addNode(node.right, newNode);
        }
    }

    add(data) {
        let newNode = new Node(data)
        if (this.rootEl) {
            this.addNode(this.rootEl, newNode);
        } else {
            this.rootEl = newNode;
        }
    }

    has(data) {
        return !!this.find(data);
    }

    findNode(node, data) {
        if (node.data === data) {
            return node;
        } else if (node.data > data) {
            return node.left !== null ?
                this.findNode(node.left, data) : null;
        } else if (node.data < data) {
            return node.right !== null ?
                this.findNode(node.right, data) : null;
        }
    }

    find(data) {
        if (this.rootEl) {
            return this.findNode(this.rootEl, data);
        } else {
            return null;
        }
    }

    updatePath(node) {
        if (node.right && node.left) {
            this.addNode(node.right, node.left);
            node.data = node.right.data;
            node.left = node.right.left;
            node.right = node.right.right;
        } else if (node.right) {
            node.data = node.right.data;
            node.left = node.right.left;
            node.right = node.right.right;
        } else if (node.left) {
            node.data = node.left.data;
            node.right = node.left.right;
            node.left = node.left.left;
        }
    }

    deleteNode(node, data) {
        if (node.right && node.right.data === data) {
            if (node.right.right || node.right.left) {
                this.updatePath(node.right)
            } else {
                node.right = null;
            }
        } else if (node.left && node.left.data === data) {
            if (node.left.right || node.left.left) {
                this.updatePath(node.left)
            } else {
                node.left = null;
            }
        } else if (node.data < data) {
            this.deleteNode(node.right, data);
        } else if (node.data > data) {
            this.deleteNode(node.left, data);
        }
    }

    remove(data) {
        if (this.rootEl.data === data) {
            if (this.rootEl.right || this.rootEl.left) {
                this.updatePath(this.rootEl)
            } else {
                this.rootEl = null;
            }
        } else if (this.has(data)) {
            console.log(this.find(data));
            this.deleteNode(this.rootEl, data);
        }
    }

    findMin(node) {
        return node.left ? this.findMin(node.left) : node.data;
    }

    min() {
        return this.findMin(this.rootEl);
    }

    findMax(node) {
        return node.right ? this.findMax(node.right) : node.data;
    }

    max() {
        return this.findMax(this.rootEl);
    }
}

module.exports = {
    BinarySearchTree
};
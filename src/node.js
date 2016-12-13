import keyValueIterator from './utils/key-value-iterator';

export default class Node {
  constructor(id, label, stats, children) {
    this._id = id;
    this._label = label;
    this._stats = stats;

    this._parent = null;
    this._children = [];
  }

  get label() {
    return this._label;
  }

  *preOrderIterator(until=(x => false)) {
    yield this;

    for (let child of this._children) {
      if (until && until(child)) {
        continue;
      }

      yield* child.preOrderIterator(until);
    }
  }

  *postOrderIterator(until=(x => false)) {
    for (let child of this._children) {
      if (until && until(child)) {
        continue;
      }

      yield* child.postOrderIterator(until);
    }

    yield this;
  }

  *ancestorsIterator() {
    if (this.parent) {
      yield this.parent;
      yield* this.parent.ancestorsIterator();
    }
  }

  *statsIterator() {
    yield* keyValueIterator(this._stats);
  }

  toJSON() {
    let nodes = [];

    for (let node of this.preOrderIterator()) {
      nodes.push({
        id: node._id,
        label: node._label,
        stats: node._stats,
        children: node._children.map(x => x._id)
      });
    }

    return { nodes }
  }
}

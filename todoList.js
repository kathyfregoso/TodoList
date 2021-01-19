// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.
class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// TodoList class: collection (array) of Todo objects
class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("must only add Todo objects");
    }
    this.todos.push(todo);
  }

  allDone() {
    return this.filter((task) => task.isDone());
  }

  allNotDone() {
    return this.filter((task) => !task.isDone());
  }

  findByTitle(title) {
    return this.filter((task) => task.getTitle() === title).first();
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  filter(callback) {
    let newList = new TodoList(this.title);
    this.forEach((task) => {
      if (callback(task)) {
        newList.add(task);
      }
    });
    return newList;
  }

  forEach(callback) {
    this.todos.forEach(callback);
    // this.todos.forEach((task) => callback(task));
  }

  isDone() {
    return this.todos.every((task) => task.isDone());
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) {
    // _ means private method
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  markDone(title) {
    let task = this.findByTitle(title);
    if (task !== undefined) {
      task.markDone();
    }
  }

  markAllDone() {
    this.forEach((task) => {
      task.markDone();
    });
  }

  markAllUndone() {
    this.forEach((task) => {
      task.markUndone();
    });
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }

  size() {
    return this.todos.length;
  }

  toArray() {
    return [...this.todos];
  }

  toString() {
    console.log(`--- ${this.title} ---`);
    return this.todos.map((task) => console.log(task.toString())).join("\n");
  }
}

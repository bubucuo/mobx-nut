import {makeObservable, observable, computed, action, autorun} from "mobx";

export type Todo = {
  task: string;
  completed: boolean;
  assignee: null | string;
};
export type todoList = Todo[];

class TodoStore {
  todoList: todoList = [{task: "工作", completed: false, assignee: "小米"}];
  pendingRequests = 0;

  constructor() {
    makeObservable(this, {
      todoList: observable,
      pendingRequests: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
    });
    autorun(() => console.log(this.report));
  }

  addTodo(task: string) {
    this.todoList.push({task, completed: false, assignee: null});
  }

  get completedTodosCount() {
    return this.todoList.filter((todo) => todo.completed === true).length;
  }

  get report() {
    if (this.todoList.length === 0) {
      return "无";
    }
    const nextTodo = this.todoList.find((todo) => todo.completed === false);

    return `下一个待办"${nextTodo?.task}"。进度 ${this.completedTodosCount} /${this.todoList.length}`;
  }
}

const todoStore = new TodoStore();

export default todoStore;

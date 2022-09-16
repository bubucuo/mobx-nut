import {makeObservable, observable, action, computed} from "../which";
// 新增
// 编辑

export type Todo = {task: string; completed: boolean; assignee: null | string};

export type TodoList = Todo[];

class TodoStore {
  todoList: TodoList = [
    {
      task: "喝水",
      completed: false,
      assignee: null,
    },
  ];

  constructor() {
    makeObservable(this, {
      todoList: observable,
      addTodo: action,
      editTodo: action,
      completedTodoCount: computed,
      report: computed,
    });
  }

  addTodo = (task: string) => {
    this.todoList.push({
      task,
      completed: false,
      assignee: null,
    });
  };

  // 返回完成的任务数
  get completedTodoCount() {
    return this.todoList.filter((todo) => todo.completed === true).length;
  }

  editTodo = (index: number, todo: Todo) => {
    this.todoList[index] = todo;
  };

  get report() {
    if (this.todoList.length === 0) {
      return "无";
    }

    const nextTodo = this.todoList.find((todo) => todo.completed === false);

    return `下一个待办"${nextTodo?.task}"。进度${this.completedTodoCount}/${this.todoList.length}`;
  }
}

const todoStore = new TodoStore();

export default todoStore;

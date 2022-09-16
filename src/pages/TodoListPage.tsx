import todoStore from "../store/TodoStore";
import {Todo} from "../store/TodoStore";
import {observer} from "../which";
import {action} from "mobx";

const TodoListPage = observer(() => {
  const onNewTodo = () => {
    todoStore.addTodo(prompt("输入新的待办：", "请来杯咖啡"));
  };

  const random = () => {
    todoStore.pendingRequests++;
    setTimeout(
      action(() => {
        todoStore.addTodo("随机待办" + Math.random());
        todoStore.pendingRequests--;
      }),
      2000
    );
  };

  return (
    <div>
      <h1>TodoListPage</h1>

      <button onClick={onNewTodo}>新待办</button>
      <small>（双击待办进行编辑）</small>

      <button
        onClick={random}
        // disabled={todoStore.pendingRequests > 0}
      >
        随机添加待办{todoStore.pendingRequests > 0 && <span>中... </span>}
      </button>

      <p>{todoStore.report}</p>
      <ul>
        {todoStore.todoList.map((todo, index) => {
          return <TodoView key={index} todo={todo} />;
        })}
      </ul>
    </div>
  );
});

const TodoView = ({todo}) => {
  const onToggleCompleted = () => {
    todo.completed = !todo.completed;
  };

  const onRename = () => {
    todo.task = prompt("任务名称", todo.task) || todo.task;
  };

  return (
    <li className="card" onDoubleClick={onRename}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggleCompleted}
      />

      {todo.task}

      {todo.assignee ? <small>{todo.assignee.name}</small> : null}
    </li>
  );
};

export default TodoListPage;

import {observer} from "../which";
import todoStore from "../store/TodoStore";
import {Todo} from "../store/TodoStore";

const TodoListPage = observer(() => {
  const addNewTodo = () => {
    todoStore.addTodo(prompt("输入新的待办任务", "来杯水"));
  };

  return (
    <div>
      <h1>TodoListPage</h1>
      <button onClick={addNewTodo}>新增任务</button>
      <p>完成了{todoStore.completedTodoCount}个任务</p>

      <p>{todoStore.report}</p>
      <ul>
        {todoStore.todoList.map((todo, index) => (
          <TodoView key={index} todo={todo} index={index} />
        ))}
      </ul>
    </div>
  );
});

const TodoView = observer(({todo, index}: {todo: Todo; index: number}) => {
  return (
    <li
      className="card"
      onDoubleClick={() =>
        todoStore.editTodo(index, {
          ...todo,
          task: prompt("任务名称", todo.task) || todo.task,
        })
      }>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          todoStore.editTodo(index, {...todo, completed: !todo.completed})
        }
      />
      {todo.task}
    </li>
  );
});

export default TodoListPage;

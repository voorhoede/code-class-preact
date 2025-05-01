import { signal } from "@preact/signals";

const todos = signal([
  { text: "Buy groceries", complete: signal(false) },
  { text: "Walk the dog", complete: signal(false) },
]);

const text = signal("");

function addTodo() {
  todos.value = [...todos.value, { text: text.value, complete: signal(false) }];
  text.value = "";
}

function removeTodo(todoToRemove) {
  todos.value = todos.value.filter((todo) => todo !== todoToRemove);
}

const completeTodo = (todo) => (event) =>
  (todo.complete.value = event.currentTarget.checked);

export function TodoList() {
  const onInput = (event) => (text.value = event.currentTarget.value);
  return (
    <>
      <input value={text.value} onInput={onInput} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.value.map((todo) => (
          <li>
            <input
              type="checkbox"
              checked={todo.complete}
              onInput={completeTodo(todo)}
            />
            {todo.text}
            &nbsp;
            <button onClick={() => removeTodo(todo)}>❌</button>
          </li>
        ))}
      </ul>
    </>
  );
}

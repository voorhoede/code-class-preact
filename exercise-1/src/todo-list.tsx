import { signal } from "@preact/signals";

const todos = signal([{ text: "Buy groceries" }, { text: "Walk the dog" }]);

const text = signal("");

function addTodo() {
  todos.value = [...todos.value, { text: text.value }];
  text.value = "";
}

// Check if our logic works
console.log(todos.value);

// Simulate adding a new todo
text.value = "Tidy up";
addTodo();

// Check that it added the new item and cleared the `text` signal:
console.log(todos.value);
console.log(text.value);

export function TodoList() {
  return <p>Todos here</p>;
}

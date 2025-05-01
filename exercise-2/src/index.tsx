import "./style.css";

import { render } from "preact";
import { TodoList } from "./todo-list.tsx";

export function App() {
  return <TodoList />;
}

render(<App />, document.getElementById("app")!);

import "./style.css";

import { signal } from "@preact/signals";
import { render } from "preact";

const count = signal(0);

export function App() {
  return (
    <>
      App count: {count}
      <code-class-counter
        count={count}
        ondecrease={(event) => (count.value = event.detail.newCount)}
      ></code-class-counter>
      <button onClick={() => count.value++}>+1</button>
    </>
  );
}

render(<App />, document.getElementById("app")!);

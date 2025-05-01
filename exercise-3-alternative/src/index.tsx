import "./style.css";

import { signal } from "@preact/signals";
import { render } from "preact";
import { count, increment } from './count.ts'

export function App() {
  return (
    <>
      App count: {count}
      <code-class-counter>
        <p>You’ve clicked the button <span data-count>0</span> <span data-times>times</span></p>
        <button disabled>Increment</button>
      </code-class-counter>
    </>
  );
}

render(<App />, document.getElementById("app")!);

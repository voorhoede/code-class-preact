---
layout: image
image: /logo-preact.svg
backgroundSize: 20rem
---

---

# From React to Preact

Vite preset with one component.

#### React
```shell
✓ 32 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-9_sxcfan.js   188.05 kB │ gzip: 59.21 kB
✓ built in 668ms
```

<div class="mb-4"></div>

#### Preact
```shell
vite v6.3.4 building for production...
✓ 9 modules transformed.
dist/index.html                  0.31 kB │ gzip: 0.22 kB
dist/assets/index-VsLeWRfs.js   20.04 kB │ gzip: 7.84 kB
✓ built in 187ms
```

<!--
- Smaller bundle
- Small virtual DOM abstraction
- `preact/compat` allows use of React components
- Started off as a smaller version of React, since Preact 10 not so much anymore
-->

---

# Different direction
- Different focus & features
- Native events
- Native attributes
  - 🎉 no more `className`
  - Copy-and-paste SVG in JSX (don't do this)

<!--
- The reason Preact does not attempt to include every single feature of React is in order to remain small and focused.
- Preact does not implement a synthetic event system, instead uses native events: `addEventListener`
- Standard attributes: `class`, also means you can copy-and-paste raw SVG in JSX
- Not "JSX-first", getting started shows alternatives
-->

---

## Components & state

### Class

```tsx {|2-4,6-8,13-14}
class Counter extends Component {
  state = {
    count: 0
  };

  increment = () => {
    this.setState(prev => ({ count: prev.count +1 }));
  };

  render(props, state) {
    return (
      <div>
        <p>Counter: {state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

---

## Hooks to Signals
````md magic-move

```tsx {|2,4-6,10-11}
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

```tsx {2,4-6,10-11}
function Counter() {
  const count = useSignal(0);

  const increment = () => {
    count.value++;
  }

  return (
    <div>
      <p>Counter: {count.value}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

```tsx {2,4-6,10-11}
function Counter() {
  const count = useSignal(0);

  const increment = () => {
    count.value++;
  }

  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

````

<!--
- Hooks allow you to compose state and side effects
- Reuse stateful logic between components
- Avoid `this` and its unintuitive pitfalls
- Signals gets you automatic updates
    - No setter
    - Similar to Vue, in fact Vue & Preact devs worked together to improve performance using the same underlying abstractions
- Signals take away the most common state management footguns
- Text updates bypass the virtual DOM and bind signal changes directly to DOM mutations, pass the signal reference to the DOM instead of .value
-->

---
layout: image
image: /signals-update.png
backgroundSize: 50rem
---
<!--
- Virtual DOM based frameworks, which must update the entire tree affected by a state invalidation, so performance is a function of your component tree
- That is why we have `useMemo`, skip parts of the tree
- The main idea behind signals is that instead of passing a value directly through the component tree, we pass a signal object
- As a result, signals can be updated without re-rendering the components they've been passed through
- State tree is generally shallower than the component tree
-->
---

# Signals key principles

- **Lazy by default**: Only signals that are currently used somewhere are observed and updated - disconnected signals don't affect performance.
- **Optimal updates**: If a signal's value hasn't changed, components and effects that use that signal's value won't be updated, even if the signal's dependencies have changed.
- **Optimal dependency tracking**: The framework tracks which signals everything depends on for you - no dependency arrays like with hooks.
- **Direct access**: Accessing a signal's value in a component automatically subscribes to updates, without the need for selectors or hooks.

---

# Exercise One

- Add UI
  - List todos
  - Input & button to add todos
- Add `removeTodo`

<!--
- Think about when to use .value
- Use of `onInput` instead of `onChange` which in Preact is the standard DOM change event, React converts basically converts this to `onInput`
-->

---

# Exercise Two

We have completion state now!

- Show amount of completed todos
- Move todos state up
  - Create context `AppState` in `index.tsx`
  - Consume context in `TodoList`
  - `useSignal`
- Show amount of completed todos in `TodoList`
- Console log on changes to the text input

<!--
- Use of local signals
- Akward imports: preact, preact/hooks, @preact/signals
- Mix of hooks & signals: `useSignalEffect`
-->

---

# Exercise Three

Preact 💜 Web components

- Get the decrease button working

<!--
- Signal value gets unpacked through an attribute
- Callback/event to get state back
-->

---

# Fin

- `preact-custom-element`
- Fresh

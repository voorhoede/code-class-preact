import { computed } from '@preact/signals'
import { count, increment } from './count.ts'

const times = computed(() => {
  return count.value === 1 ? 'time' : 'times'
})

class Counter extends HTMLElement {
  static define(name = 'counter-app') {
    customElements.define(name, this)
  }

  constructor() {
    super()
    this.style.display = 'contents'
    this.disposes = new Set()
  }

  handleEvent(e) {
    if (e.type === 'click' && e.target.tagName === 'BUTTON') {
      increment()
    }
  }

  connectedCallback() {
    this.addEventListener('click', this)

    const countEl = this.querySelector('[data-count]')
    const timesEl = this.querySelector('[data-times]')

    this.disposes.add(count.subscribe(c => {
      countEl.innerText = c
    }))

    this.disposes.add(times.subscribe(t => {
      timesEl.innerText = t
    }))

    const button = this.querySelector('button')
    button.disabled = false
  }

  disconnectedCallback() {
    this.removeEventListener('click', this)
    this.disposes.forEach(cb => cb())
  }
}

customElements.define("code-class-counter", Counter);

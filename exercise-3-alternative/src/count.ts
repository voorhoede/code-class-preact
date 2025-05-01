import { signal } from '@preact/signals'

export const count = signal(0)

export function increment() {
  count.value += 1
}

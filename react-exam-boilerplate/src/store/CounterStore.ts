import { makeAutoObservable } from 'mobx'

class CounterStore {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  get doubled() {
    return this.count * 2
  }

  get isPositive() {
    return this.count > 0
  }

  inc() {
    this.count++
  }

  dec() {
    this.count--
  }

  reset() {
    this.count = 0
  }
}

export const store = new CounterStore()

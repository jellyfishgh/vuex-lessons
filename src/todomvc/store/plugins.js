import {STORAGE_KEY} from './mutations'

export default [store => {
  store.subscribe((mutation, {todos}) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  })
}]

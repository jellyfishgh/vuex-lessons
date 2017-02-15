import Vue from 'vue'
import store from './store'

import {mapMutations} from 'vuex'

Vue.component('todo', {
  template: `
    <li class="todo" :class="{ completed: todo.done, editing: editing }">
      <div class="view">
        <input class="toggle" type="checkbox" :checked="todo.done" @change="toggleTodo({ todo: todo })">
        <label v-text="todo.text" @dblclick="editing = true"></label>
        <button class="destroy" @click="deleteTodo({ todo: todo })"></button>
      </div>
      <input class="edit" v-show="editing" v-focus="editing" :value="todo.text" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" @blur="doneEdit">
    </li>
  `,
  props: ['todo'],
  data () {
    return {
      editing: false
    }
  },
  // 自定义指令
  directives: {
    focus (el, {
      value
    }, {
      context
    }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  methods: {
    ...mapMutations([
      'editTodo',
      'toggleTodo',
      'deleteTodo'
    ]),
    doneEdit (e) {
      const value = e.target.value.trim()
      const {
        todo
      } = this
      if (!value) {
        this.deleteTodo({
          todo
        })
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    },
    cancelEdit (e) {
      e.target.value = this.todo.text
      this.editing = false
    }
  }
})

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

const app = new Vue({
  data: {
    visibility: 'all',
    filters: filters
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    addTodo (e) {
      const text = e.target.value
      if (text.trim()) {
        this.$store.commit('addTodo', {
          text
        })
      }
      e.target.value = ''
    },
    ...mapMutations([
      'toggleAll',
      'clearCompleted'
    ])
  },
  filters: {
    pluralize: (n, w) => n === 1 ? w : (w + 's'),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  store
})

app.$mount('#app')

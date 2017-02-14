import Vue from 'vue'

import store from './store'

var app = new Vue({
  el: '#app',
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    }
  }
})

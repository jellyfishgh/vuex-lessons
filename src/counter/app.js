import Vue from 'vue'

import store from './store'

import { mapGetters, mapActions } from 'vuex'

const app = new Vue({
  store,
  computed: mapGetters([
    'evenOrOdd'
  ]),
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
})

app.$mount('#app')

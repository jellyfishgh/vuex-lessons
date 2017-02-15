import Vue from 'vue'

import store from './store'

import { mapGetters, mapActions } from 'vuex'

const app = new Vue({
  store,
  computed: mapGetters([
    'count',
    'recentHistory'
  ]),
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
})

app.$mount('#app')

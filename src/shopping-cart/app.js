import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex'
import store from './store'

import {currency} from './currency'

Vue.filter('currency', currency)

Vue.component('product-list', {
  template: `
    <ul>
      <li v-for="p in products">
        {{ p.title }} - {{ p.price | currency }}
        <br>
        <button :disabled="!p.inventory" @click="addToCart(p)">Add to cart</button>
      </li>
    </ul>
  `,
  computed: mapGetters({
    products: 'allProducts'
  }),
  methods: mapActions([
    'addToCart'
  ]),
  created () {
    this.$store.dispatch('getAllProducts')
  }
})

Vue.component('cart', {
  template: `
    <div class="cart">
      <h2>Your Cart</h2>
      <p v-show="!products.length"><i>Please add some products to cart.</i></p>
      <ul>
        <li v-for="p in products">
          {{ p.title }} - {{ p.price | currency }} x {{ p.quantity }}
        </li>
      </ul>
      <p>Total: {{ total | currency }}</p>
      <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
      <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
    </div>
  `,
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      checkoutStatus: 'checkoutStatus'
    }),
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
    checkout (products) {
      this.$store.dispatch('checkout', products)
    }
  }
})

const app = new Vue({
  store
})

app.$mount('#app')

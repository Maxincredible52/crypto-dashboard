<template>
  <div>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 v-if="$apolloData.loading" class="title">Loading...</h1>
          <h1 v-else class="title">
            <img class="currency-symbol" v-if="coinData.id" v-bind:src="imgUrl">
            {{coinData.name}} ({{coinData.symbol}})
          </h1>
        </div>
      </div>
    </section>
    <section v-if="!$apolloData.loading" class="section" id="details-section">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Circulating supply</p>
            <p class="title">{{circulatingSupply}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Total supply</p>
            <p class="title">{{totalSupply}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Price BTC</p>
            <p class="title">{{priceBTC}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Price USD</p>
            <p class="title">{{priceUSD}}</p>
          </div>
        </div>
      </nav>
    </section>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import { Format } from '../lib/format'

  export default {

    name: 'CoinDetails',

    apollo: {
      $loadingKey: 'loading',
      ticker: {
        query: gql`
          query($id: Int!) {
            ticker(id: $id) {
              symbol
              name
              id
              circulatingSupply
              totalSupply
              priceUSD
              priceBTC
            }
          }
        `,
        variables() {
          return { id: this.$attrs.coinId }
        },
        result(res) {
          this.updateCoinData(res.data.ticker)
        },
      },
    },

    data() {
      return { coinData: {} }
    },

    computed: {
      imgUrl: function () {
        return `https://s2.coinmarketcap.com/static/img/coins/32x32/${this.coinData.id}.png`
      },
      circulatingSupply: function() {
        return `${Format.currencyFormat(this.coinData.circulatingSupply)} ${this.coinData.symbol}`
      },
      totalSupply: function() {
        return `${Format.currencyFormat(this.coinData.totalSupply)} ${this.coinData.symbol}`
      },
      priceBTC: function() {
        return `${Format.currencyFormat(this.coinData.priceBTC)} BTC`
      },
      priceUSD: function() {
        return `${Format.currencyFormat(this.coinData.priceUSD)} USD`
      }
    },

    methods: {
      updateCoinData(data) {
        this.coinData = data
      },
    },
  }
</script>

<style scoped>
  .currency-symbol {
    height: 1.5rem;
    background: white;
    border-radius: 50px;
    border: 1px solid white;
  }
</style>

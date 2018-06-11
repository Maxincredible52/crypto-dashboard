<template>
  <section>
    <b-table
      :data="data"
      :loading="loading"
      :default-sort-direction="defaultSortOrder"
      :default-sort="[sortField, sortOrder]"
      paginated
      backend-pagination
      :total="total"
      :per-page="perPage"
      @page-change="onPageChange"
      v-on:click="testMethod"
      :hoverable=true
    >

      <template slot-scope="props">
        <b-table-column field="rank" label="#" sortable>
          {{ props.row.rank }}
        </b-table-column>

        <b-table-column field="name" label="Name" sortable>
          <div class="has-text-weight-semibold">
            {{ props.row.name }}
          </div>
          <div>
            <small class="has-text-grey is-size-7">{{ props.row.symbol }}</small>
          </div>
        </b-table-column>

        <b-table-column field="priceUSD" label="Preis [$]" numeric sortable>
          $ {{ formatCurrency(props.row.priceUSD) }}
        </b-table-column>

        <b-table-column field="priceBTC" label="Preis [BTC]" numeric sortable>
          {{ formatCurrency(props.row.priceBTC) }}
        </b-table-column>

        <b-table-column field="marketCapUSD" label="Marketcap [$]" numeric sortable>
          $ {{ formatCurrency(props.row.marketCapUSD) }}
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
  import gql from 'graphql-tag'

  var f = require('d3-format')

  export default {

    name: 'TableView',

    apollo: {
      $loadingKey: 'loading',
      tickers() {
        return {
          query: gql`query ($limit: Int!, $start: Int!) {
                         tickers(limit: $limit, start: $start) {
                             name
                             symbol
                             rank
                             priceUSD
                             priceBTC
                             dailyVolumeUSD
                             marketCapUSD
                             availableSupply
                             totalSupply
                             percentChange1h
                             percentChange24h
                             percentChange7d
                             lastUpdated
                         },
                         global {
                             activeCurrencies
                             activeAssets
                         }
                    }`,
          variables() {
            return {
              limit: this.perPage,
              start: this.page * this.perPage,
            }
          },
          fetchPolicy: 'cache-and-network',
          result(result) {
            console.log(result)
            this.data = []
            if (result.data && result.data.tickers) {
              result.data.tickers.forEach((item) => {
                this.data.push(item)
              })
            }
            if (result.data && result.data.global) {
              this.total = result.data.global.activeCurrencies + result.data.global.activeAssets
              console.log(this.total)
            }
          },
        }
      },
    },

    data() {
      return {
        data: [],
        total: 0,
        loading: false,
        sortField: 'marketCapUSD',
        sortOrder: 'desc',
        defaultSortOrder: 'desc',
        page: 0,
        perPage: 10,
      }
    },

    methods: {

      formatCurrency(value) {
        return f.format('.2s')(value)
      },

      onPageChange(page) {
        this.page = page - 1
      },

      testMethod(data) {
        console.log('test', data)
        this.$router.push(`${data.symbol}`)
      },
    },
  }
</script>

<style>
  .table td {
    vertical-align: inherit;
    cursor: pointer;
  }
</style>
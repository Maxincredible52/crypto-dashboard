<template>
  <div class="container">
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
      v-on:click="routeToSymbol"
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
        <b-table-column field="percentChange24h" label="Change [24h]" numeric sortable>
          <span :class="getClass(props.row.percentChange24h)">% {{ props.row.percentChange24h }}</span>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import { format } from 'd3-format'

  export default {

    name: 'TableView',

    apollo: {
      $loadingKey: 'loading',
      tickers: {
        query: gql`
          query ($limit: Int!, $start: Int!) {
            tickers(limit: $limit, start: $start) {
              name
              id
              symbol
              rank
              priceUSD
              priceBTC
              marketCapUSD
              percentChange24h
            }
            global {
              activeCryptocurrencies
            }
          }
        `,
        variables() {
          return {
            limit: this.perPage,
            start: this.page * this.perPage,
          }
        },
        fetchPolicy: 'cache-and-network',
        result(result) {
          this.data = []
          if (result.data && result.data.tickers) {
            result.data.tickers.forEach((item) => {
              this.data.push(item)
            })
          }
          if (result.data && result.data.global) {
            this.total = result.data.global.activeCryptocurrencies
          }
        },
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
        return format('.2s')(value)
      },
      getClass(value) {
        return value >= 0 ? 'positive-change' : 'negative-change'
      },
      onPageChange(page) {
        this.page = page - 1
      },

      routeToSymbol(data) {
        this.$router.push(`${data.id}`)
      },
    },
  }
</script>

<style>
  .table td {
    vertical-align: inherit;
    cursor: pointer;
  }
  .container {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .positive-change {
    color: green;
  }

  .negative-change {
    color: red;
  }
</style>

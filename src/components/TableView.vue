<template>
    <section>
        <b-table
                :data="data"
                :loading="loading"

                :default-sort-direction="defaultSortOrder"
                :default-sort="[sortField, sortOrder]">

            <template slot-scope="props">
                <b-table-column field="symbol" label="Symbol" sortable>
                    {{ props.row.symbol }}
                </b-table-column>

                <b-table-column field="name" label="Name" sortable>
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="priceUSD" label="priceUSD" numeric sortable>
                    {{ props.row.priceUSD }}
                </b-table-column>

                <b-table-column field="priceBTC" label="priceBTC" numeric sortable>
                    {{ props.row.priceBTC }}
                </b-table-column>

                <b-table-column field="marketCapUSD" label="marketCapUSD" numeric sortable>
                    {{ props.row.marketCapUSD }}
                </b-table-column>
            </template>
        </b-table>
    </section>
</template>

<script>
    import gql from 'graphql-tag';

    export default {
        name: 'TableView',
        apollo: {
            $loadingKey: 'loading',
            tickers() {
                return {
                    query: gql`query {
                         tickers {
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
                         }
                    }`,
                    fetchPolicy: 'cache-and-network',
                    result(result) {
                        console.log(result);
                        this.data = []
                        if (result.data) {
                            let currentTotal = result.data.tickers.length
                            if (currentTotal / this.perPage > 100) {
                                currentTotal = this.perPage * 100
                            }
                            this.total = currentTotal;
                            result.data.tickers.forEach((item) => {
                                this.data.push(item)
                            })
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
                page: 1,
                perPage: 20
            }
        },
        methods: {
            /*
             * Handle page-change event
             */
            // onPageChange(page) {
            //     this.page = page
            //     this.loadAsyncData()
            // },
            // /*
            //  * Handle sort event
            //  */
            // onSort(field, order) {
            //     this.sortField = field;
            //     this.sortOrder = order;
            //     this.loadAsyncData()
            // },
            // /*
            //  * Type style in relation to the value
            //  */
            // type(value) {
            //     const number = parseFloat(value)
            //     if (number < 6) {
            //         return 'is-danger'
            //     } else if (number >= 6 && number < 8) {
            //         return 'is-warning'
            //     } else if (number >= 8) {
            //         return 'is-success'
            //     }
            // }
        }
    }
</script>
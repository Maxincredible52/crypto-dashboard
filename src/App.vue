<template>
    <div id="app" class="has-navbar-fixed-top">
        <Navbar></Navbar>
        <div id="main" class="container">
            <TableView></TableView>
        </div>
    </div>
</template>

<script>
    import TableView from './components/TableView.vue'
    import Navbar from "./components/Navbar";

    export default {
        name: 'app',
        components: {
            Navbar,
            TableView
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

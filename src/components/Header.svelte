<script>
    import Header from './thead.js'
    import Table from './table.js'
    import { onMount, tick } from 'svelte'
    export let options
    onMount( async () => {
        await tick()
        const header = document.querySelector('header.datatable-thead')
        const myTable = new Table( document.querySelector('table'), header, options )
        myTable.set()
    })
</script>

<header class="datatable-thead" class:sortable={options.sortable === true}>

</header>

<style>
    header{position:sticky;top:0;left:0;}
</style>
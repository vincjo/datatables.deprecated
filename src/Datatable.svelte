<script>
    import { options } from './store.js'
    import Datatable from './Datatable.js'
    import Search from './components/Search.svelte'
    import Pagination from './components/Pagination.svelte'
    import Header from './components/Header.svelte'
    import { onMount } from 'svelte'
    export let data = []
    export let settings = {}
    const datatable = new Datatable
    datatable.setOptions(settings)
    $: { datatable.setRows(data) }
    onMount( () => {
        datatable.resize()
        datatable.addEventScrollX()
        new ResizeObserver( mutations => {
            mutations.forEach( mutation => datatable.resize() )
        }).observe( document.querySelector('main.datatable').parentElement )
    })
</script>

<main class="datatable">
    {#if $options.blocks.searchInput === true}
        <Search/>
    {/if}
    <section class="dt-table">
        <Header/>
        <table>
            <slot></slot>
        </table>
    </section>
    {#if $options.blocks.paginationRowCount === true || $options.blocks.paginationButtons === true}
        <Pagination/>
    {/if}
</main>


<style>
    main{position:relative;} 
    section{position:relative;overflow:auto;width:100%;}
    table{width:100%;border-collapse:collapse;overflow:hidden;}
</style>
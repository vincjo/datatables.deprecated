<script>
    import { options } from './stores/options.js'
    import { datatable } from './datatable.js'
    import Search from './components/Search.svelte'
    import Pagination from './components/Pagination.svelte'
    import Header from './components/Header.svelte'
    import { onMount } from 'svelte'
    export let data = []
    export let settings = {}
    options.update(settings)
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
    main{position:relative;background:inherit;} 
    section{position:relative;overflow:auto;width:100%;background:inherit;border-bottom:1px solid #e0e0e0;}
    section::-webkit-scrollbar {width: 10px;height:10px;}
    section::-webkit-scrollbar-track {background:#f5f5f5;}
    section::-webkit-scrollbar-thumb {background:#e0e0e0;}
    section::-webkit-scrollbar-thumb:hover {background: #bdbdbd;}
    section::-webkit-scrollbar-track-piece:start {top:40px;}
    table{width:100%;border-collapse:collapse;overflow:hidden;}
</style>
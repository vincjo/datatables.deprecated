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
    datatable.init(data, settings)
    onMount( () => {
        datatable.resize()
    })
    window.addEventListener('resize', () => {
        datatable.resize()
    })
</script>

<main class="datatable">
    {#if $options.search === true}
        <Search/>
    {/if}
    <section class="dt-table">
        <Header/>
        <table>
            <slot></slot>
        </table>
    </section>
    {#if $options.rowCount === true || $options.pagination === true}
        <Pagination/>
    {/if}
</main>


<style>
    main{position:relative;background:#fff;} 
    section{overflow:auto;}
    table{width:100%;border-collapse: collapse;}
</style>
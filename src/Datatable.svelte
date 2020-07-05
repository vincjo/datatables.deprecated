<script>
    import { options } from './store.js'
    import Datatable from './Datatable.js'
    import Search from './components/Search.svelte'
    import Pagination from './components/Pagination.svelte'
    import Header from './components/Header.svelte'
    import { onMount } from 'svelte'
    export let data = []
    export let settings = {}
    const datatable = new Datatable(data, settings)
    onMount( () => {
        const elem = document.querySelector('main.datatable')
        const table = document.querySelector('main.datatable table')
        const dims = elem.parentNode.getBoundingClientRect()
        elem.style.width = dims.width + 'px'
        elem.style.height = dims.height + 'px'
    })
</script>

<main class="datatable">
    {#if $options.search === true}
        <Search/>
    {/if}
    <section>
        <Header options={$options}/>
        <table>
            <slot></slot>
        </table>
    </section>
    {#if $options.rowCount === true || $options.pagination === true}
        <Pagination/>
    {/if}
</main>


<style>
    main{position:relative;}
    section{height:100%;overflow:auto;border-bottom:1px solid #eee;}
    table{width:100%;border-collapse: collapse;}
    section::-webkit-scrollbar {width: 10px;height:10px;}
    section::-webkit-scrollbar-track {background:#fafafa;}
    section::-webkit-scrollbar-thumb {background:#eee;}
    section::-webkit-scrollbar-thumb:hover {background: #e0e0e0;}
    section::-webkit-scrollbar-track-piece:start {top:40px;}
</style>
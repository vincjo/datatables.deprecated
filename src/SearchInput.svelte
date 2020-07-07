<script>
    import { filters, state, options } from './store.js'
    import Header from './components/header.js'
    const header = new Header
    const search = (value) => {
        state.setPage(1)
        filters.setGlobal(value)
        state.updateRowCount()
        header.redraw()
    }
</script>

<div class="dt-search-input">
    <input type="text" placeholder="{$options.labels.search}" on:input={(e) => search(e.target.value)}/>
</div>

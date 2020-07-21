<script>
    import { filters, state, options, columns } from './store.js'
    const search = (value) => {
        state.setPage(1)
        filters.setGlobal(value)
        state.updateRowCount()
        columns.redraw()
    }
</script>

<div class="dt-search-input">
    <input type="text" placeholder="{$options.labels.search}" on:input={(e) => search(e.target.value)} class="browser-default"/>
</div>

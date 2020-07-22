<script>
    import { filters, state, options, columns } from './store.js'
    export let ref = ''
    export let classList = ''
    const search = (value) => {
        state.setPage(1)
        filters.setGlobal(value)
        state.updateRowCount()
        columns.redraw()
    }
</script>

<input 
    class="dt-search-input {classList}" 
    type="text" 
    placeholder="{$options.labels.search}" 
    on:input={(e) => search(e.target.value)} 
    {ref}
/>


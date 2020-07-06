<script>
    import { filters, state, labels } from './store.js'
    import Header from './components/header.js'
    const header = new Header
    const search = (value) => {
        state.setPage(1)
        filters.setGlobal(value)
        state.updateRowCount()
        header.redraw()
    }
</script>

<input type="text" placeholder="{$labels.search}" on:input={(e) => search(e.target.value)}/>

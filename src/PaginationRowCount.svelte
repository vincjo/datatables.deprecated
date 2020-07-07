<script>
    import {state, options} from './store.js'
    state.updateRowCount()
    $: start = $state.pageNumber * $options.rowPerPage - $options.rowPerPage + 1
    $: end = Math.min($state.pageNumber * $options.rowPerPage, $state.rowCount)
    $: rows = $state.rowCount
    $: info = $options.labels.info.replace('{start}', start).replace('{end}', end).replace('{rows}', rows)
</script>


<aside class="dt-pagination-rowcount">
    {#if rows > 0}
        {@html info}
    {:else}
        {@html $options.labels.noRows}
    {/if}
</aside>
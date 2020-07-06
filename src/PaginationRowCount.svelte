<script>
    import {state, options, labels} from './store.js'
    state.updateRowCount()
    $: start = $state.pageNumber * $options.rowPerPage - $options.rowPerPage + 1
    $: end = Math.min($state.pageNumber * $options.rowPerPage, $state.rowCount)
    $: rows = $state.rowCount
    $: info = $labels.info.replace('{start}', start).replace('{end}', end).replace('{rows}', rows)
</script>


<aside class="dt-rowcount">
    {#if rows > 0}
        {@html info}
    {:else}
        {@html $labels.noRows}
    {/if}
</aside>
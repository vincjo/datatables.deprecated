<script>
    import {state, options, labels} from './store.js'
    $: start = $state.pageNumber * $options.rowPerPage - $options.rowPerPage + 1
    $: end = Math.min($state.pageNumber * $options.rowPerPage, $state.rowCount)
    $: rows = $state.rowCount
    $: info = $labels.info.replace('{start}', start).replace('{end}', end).replace('{rows}', rows)
</script>


<aside>
    {#if rows > 0}
        {@html info}
    {:else}
        {@html $labels.noRows}
    {/if}
</aside>

<style>
    aside{line-height:30px;font-size:14px;}
</style>
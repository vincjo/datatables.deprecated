<script>
    import { options } from './stores/options.js'
    import { pageNumber, rowCount } from './stores/state.js'
    $: start = $pageNumber * $options.rowPerPage - $options.rowPerPage + 1
    $: end = Math.min($pageNumber * $options.rowPerPage, $rowCount)
    $: rows = $rowCount
    $: info = $options.labels.info.replace('{start}', start).replace('{end}', end).replace('{rows}', rows)
</script>


<aside class="dt-pagination-rowcount">
    {#if rows > 0}
        {@html info}
    {:else}
        {@html $options.labels.noRows}
    {/if}
</aside>

<style>
    aside{margin-left:8px;font-size:14px;line-height:32px;}
</style>
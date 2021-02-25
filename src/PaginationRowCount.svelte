<script>
    import { options } from './stores/options.js'
    import { pageNumber, rowCount, datatableWidth } from './stores/state.js'
    $: start = $pageNumber * $options.rowsPerPage - $options.rowsPerPage + 1
    $: end = Math.min($pageNumber * $options.rowsPerPage, $rowCount)
    $: rows = $rowCount
    $: info = $options.labels.info.replace('{start}', `<b>${start}</b>`).replace('{end}', `<b>${end}</b>`).replace('{rows}', `<b>${rows}</b>`)
</script>



<aside class="dt-pagination-rowcount" class:css={$options.css}>
    {#if $datatableWidth > 778}
        {#if rows > 0}
            {@html info}
        {:else}
            {@html $options.labels.noRows}
        {/if}
    {:else}
        {@html `<b>${start}</b>-<b>${end}</b>/<b>${rows}</b>` }
    {/if}
</aside>

<style>
    .css{color:#616161;line-height:32px;margin-left:16px;font-size:14px;}
</style>
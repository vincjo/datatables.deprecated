<script>
    import { columns } from '../store.js'
</script>

<colgroup>
    {#each $columns as column}
        <col class:selected={column.selected}>
    {/each}
</colgroup>

<style>
    col.selected{background:bisque;}
</style>
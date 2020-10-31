<script>
    import PaginationRowCount from '../PaginationRowCount.svelte'
    import PaginationButtons from '../PaginationButtons.svelte'
    import { options } from '../stores/options.js'
</script>

{#if $options.pagination && ($options.blocks.paginationRowCount || $options.blocks.paginationButtons)}
<section class="dt-pagination">
    {#if $options.blocks.paginationRowCount}
        <PaginationRowCount/>
    {:else}
        <div></div>
    {/if}
    {#if $options.blocks.paginationButtons}
        <PaginationButtons/>
    {/if}
</section>
{/if}

<style>
    section{display:flex;flex-direction:row;height:35px;padding-top:5px;justify-content:space-between;}
</style>
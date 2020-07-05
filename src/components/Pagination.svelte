<script>
    import PaginationRowCount from '../PaginationRowCount.svelte'
    import PaginationButtons from '../PaginationButtons.svelte'
    import {options} from '../store.js'

</script>

<section>
    {#if $options.rowCount === true}
        <PaginationRowCount/>
    {/if}
    {#if $options.pagination === true}
        <PaginationButtons/>
    {/if}
</section>

<style>
    section{display:flex;flex-direction:row;height:32px;margin-top:5px;justify-content: space-between;}
</style>
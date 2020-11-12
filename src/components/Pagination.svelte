<script>
  import PaginationRowCount from "../PaginationRowCount.svelte"
  import PaginationButtons from "../PaginationButtons.svelte"
  import { options } from "../stores/options.js"
</script>

{#if $options.pagination && ($options.blocks.paginationRowCount || $options.blocks.paginationButtons)}
  <section class="dt-pagination">
    {#if $options.blocks.paginationRowCount}
      <PaginationRowCount />
    {:else}
      <div />
    {/if}
    {#if $options.blocks.paginationButtons}
      <PaginationButtons />
    {/if}
  </section>
{/if}

<style>
  section {
    display: flex;
    flex-direction: row;
    height: 40px;
    padding-top: 8px;
    justify-content: space-between;
    background: #fff;
  }
</style>

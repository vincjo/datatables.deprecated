<script>
    import PaginationRowCount from "../PaginationRowCount.svelte"
    import PaginationButtons from "../PaginationButtons.svelte"
    import { options } from "../stores/options.js"
    import { datatableWidth } from "../stores/state.js"
</script>

{#if $options.pagination && ($options.blocks.paginationRowCount || $options.blocks.paginationButtons)}
	<section class="dt-pagination" class:css={$options.css}>
		{#if $options.blocks.paginationRowCount}
			{#if $datatableWidth > 778}
				<PaginationRowCount />
			{/if}
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
        justify-content: space-between;
        height: 40px;
        padding-top: 8px;
    }
    .css{
        background: #fff;
    }
</style>

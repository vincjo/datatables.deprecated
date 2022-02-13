<script>
	import PaginationRowCount from '../PaginationRowCount.svelte'
	import PaginationButtons from '../PaginationButtons.svelte'

	export let id
	export let options
</script>

{#if $options.pagination && ($options.blocks.paginationRowCount || $options.blocks.paginationButtons)}
	<section class="dt-pagination" class:css={$options.css}>
		{#if $options.blocks.paginationRowCount}
			<PaginationRowCount {id} />
		{:else}
			<div />
		{/if}
		{#if $options.blocks.paginationButtons}
			<PaginationButtons {id}/>
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
		align-items: center;
	}
	.css {
		background: #fff;
	}
</style>

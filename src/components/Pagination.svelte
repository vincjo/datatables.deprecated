<script>
	//import { options } from '../stores/options.js'
	import PaginationRowCount from '../PaginationRowCount.svelte'
	import PaginationButtons from '../PaginationButtons.svelte'
	import { key } from '../key.js'
	import { getContext } from 'svelte'
	export let name = 'svelte-simple-datatable'

	const { options } = getContext(key)
</script>

{#if $options.pagination && ($options.blocks.paginationRowCount || $options.blocks.paginationButtons)}
	<section class="dt-pagination" class:css={$options.css}>
		{#if $options.blocks.paginationRowCount}
			<PaginationRowCount {name} />
		{:else}
			<div />
		{/if}
		{#if $options.blocks.paginationButtons}
			<PaginationButtons {name} />
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

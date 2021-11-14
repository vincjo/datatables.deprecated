<script>
	import Search from './components/Search.svelte'
	import Pagination from './components/Pagination.svelte'
	import StickyHeader from './components/StickyHeader.svelte'
	import { onMount, onDestroy } from 'svelte'
	import { setContext, getContext } from 'svelte'
	import { key } from './key.js'
	import { initContext } from './createContext.js'
	import { getDataTable } from './datatable.js'

	export let data = []
	export let settings = {}
	export let classList = ''

	//Initialize context for all stores.
	setContext(key, {})
	initContext()

	const { rows } = getContext(key)
	export const dataRows = rows

	const datatable = getDataTable()
	const { id, options } = getContext(key)

	
	$: {
		datatable.setRows(data)
		options.update(settings)
	}

	onMount(() => datatable.init())
	onDestroy(() => datatable.reset())
</script>

<section
	id={$id}
	class="datatable {classList}"
	class:scroll-y={$options.scrollY}
	class:css={$options.css}
>
	{#if $options.blocks.searchInput === true}
		<Search/>
	{/if}
	<article class="dt-table">
		{#if $options.scrollY}
			<StickyHeader/>
		{/if}
		<table>
			<slot />
		</table>
	</article>
	{#if $options.blocks.paginationRowCount === true || $options.blocks.paginationButtons === true}
		<Pagination/>
	{/if}
</section>


<style>
	.datatable {
		position: relative;
	}
	.css.datatable {
		background: #fff;
	}
	.datatable.scroll-y {
		height: 160px;
	}
	.datatable * {
		box-sizing: border-box;
	}
	article {
		position: relative;
		overflow-y: auto;
		overflow-x: hidden;
		width: 100%;
		background: inherit;
	}
	.css article {
		border-bottom: 1px solid #e0e0e0;
		scrollbar-width: thin;
	}
	.css article::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}
	.css article::-webkit-scrollbar-track {
		background: #f5f5f5;
	}
	.css article::-webkit-scrollbar-thumb {
		background: #c2c2c2;
	}
	.css article::-webkit-scrollbar-thumb:hover {
		background: #9e9e9e;
	}
	.css article::-webkit-scrollbar-track-piece:start {
		top: 40px;
	}
	.css table {
		width: 100%;
		border-collapse: collapse;
		overflow: hidden;
		margin-bottom: 6px;
	}
</style>

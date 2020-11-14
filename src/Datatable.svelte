<script>
	import { options } from './stores/options.js'
	import { datatable } from './datatable.js'
	import Search from './components/Search.svelte'
	import Pagination from './components/Pagination.svelte'
	import StickyHeader from './components/StickyHeader.svelte'
	import { onMount, onDestroy } from 'svelte'
	export let data = []
	export let settings = {}
	$: {
		datatable.setRows(data)
		options.update(settings)
	}
	onMount(() => datatable.init() )
	onDestroy(() => datatable.reset())
</script>

<section class="datatable" class:scroll-y={$options.scrollY}>
	{#if $options.blocks.searchInput === true}
		<Search />
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
		<Pagination />
	{/if}
</section>

<style>
	.datatable {
		position: relative;
		background: #fff;
	}
	.datatable.scroll-y{
		height:160px;
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
		border-bottom: 1px solid #e0e0e0;
		scrollbar-width: thin;
	}
	article::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}
	article::-webkit-scrollbar-track {
		background: #f5f5f5;
	}
	article::-webkit-scrollbar-thumb {
		background: #c2c2c2;
	}
	article::-webkit-scrollbar-thumb:hover {
		background: #9e9e9e;
	}
	article::-webkit-scrollbar-track-piece:start {
		top: 40px;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		overflow: hidden;
		margin-bottom: 6px;
	}
</style>

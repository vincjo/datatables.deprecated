<script>
	import Search from './components/Search.svelte'
	import Pagination from './components/Pagination.svelte'
	import StickyHeader from './components/StickyHeader.svelte'
	import { onMount, onDestroy } from 'svelte'
	import Datatable from './app/Datatable.js'
	import Component from './app/Component.js'

	export let data = []
	export let settings = {}
	export let classList = ''
	export let id = 'svelte-simple-datatable'


	//Initialize context for all stores.
	const datatable = new Datatable(id)
	datatable.create()
	const options = datatable.getOptions()

	const component = new Component(id)
	
	const rows = datatable.getRows()
	export const dataRows = rows

	$: {
		component.setRows(data)
		options.set( options.parse(settings) )
	}

	onMount(() => component.init())
	onDestroy(() => component.reset())
</script>

<section
	id={id}
	class="datatable {classList}"
	class:scroll-y={$options.scrollY}
	class:css={$options.css}
>
	{#if $options.blocks.searchInput === true}
		<Search {options} {id}/>
	{/if}
	<article class="dt-table">
		{#if $options.scrollY}
			<StickyHeader {id} {options} columns={datatable.getColumns()}/>
		{/if}
		<table>
			<slot rows={datatable.getRows()}/>
		</table>
	</article>
	{#if $options.blocks.paginationRowCount === true || $options.blocks.paginationButtons === true}
		<Pagination {options} {id}/>
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

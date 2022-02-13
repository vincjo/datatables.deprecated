<script>
	export let context

	export let ref = ''
	export let classList = ''
	
	const rowsCount = context.getRowsCount()
	const options = context.getOptions()
	const pageNumber = context.getPageNumber()
	const datatableWidth = context.getDatatableWidth()
	$: pageCount = Array.from(
		Array(Math.ceil($rowsCount / $options.rowsPerPage)).keys()
	)
	const slice = (arr, page) => {
		if (page < 5) {
			return arr.slice(0, 5)
		} else if (page > arr.length - 4) {
			return arr.slice(arr.length - 5, arr.length)
		}
		return arr.slice(page - 2, page + 1)
	}
	$: buttons = slice(pageCount, $pageNumber)
	const setPage = (number) => {
		pageNumber.set(number)
		context.getColumns().redraw()
	}
</script>

{#if $datatableWidth > 600}
	<section
		class="dt-pagination-buttons {classList}"
		{ref}
		class:css={$options.css}
	>
		<button
			class="text"
			class:disabled={$pageNumber === 1}
			on:click={() => setPage($pageNumber - 1)}
		>
			{@html $options.labels.previous}
		</button>
		<button class:active={$pageNumber === 1} on:click={() => setPage(1)}>
			1
		</button>
		{#if pageCount.length > 6 && $pageNumber >= 5}
			<button class="ellipse">...</button>
		{/if}

		{#each buttons as n}
			{#if n > 0 && n < pageCount.length - 1}
				<button
					class:active={$pageNumber === n + 1}
					on:click={() => setPage(n + 1)}
				>
					{n + 1}
				</button>
			{/if}
		{/each}

		{#if pageCount.length > 6 && $pageNumber <= pageCount.length - 3}
			<button class="ellipse">...</button>
		{/if}

		{#if pageCount.length > 1}
			<button
				class:active={$pageNumber === pageCount.length}
				on:click={() => setPage(pageCount.length)}
			>
				{pageCount.length}
			</button>
		{/if}

		<button
			class="text"
			class:disabled={$pageNumber === pageCount.length}
			on:click={() => setPage($pageNumber + 1)}
		>
			{@html $options.labels.next}
		</button>
	</section>
{:else}
	<section
		class="dt-pagination-buttons mobile {classList}"
		class:css={$options.css}
	>
		<button class:disabled={$pageNumber === 1} on:click={() => setPage(1)}
			>&#10092;&#10092;</button
		>
		<button
			class:disabled={$pageNumber === 1}
			on:click={() => setPage($pageNumber - 1)}>&#10094;</button
		>
		<button
			class:disabled={$pageNumber === pageCount.length}
			on:click={() => setPage($pageNumber + 1)}>&#10095;</button
		>
		<button
			class:disabled={$pageNumber === pageCount.length}
			on:click={() => setPage(pageCount.length)}>&#10093;&#10093;</button
		>
	</section>
{/if}

<style>
	section {
		display: flex;
		flex-direction: row;
	}
	.css {
		height: 32px;
		margin-right: 16px;
	}
	.css button {
		background: inherit;
		height: 32px;
		width: 32px;
		color: #616161;
		font-size: 13px;
		margin: 0;
		padding: 0;
		transition: all, 0.2s;
		line-height: 32px;
		border: 1px solid #e0e0e0;
		border-right: none;
		outline: none;
	}
	.css button:first-child {
		border-radius: 4px 0 0 4px;
	}
	.css button:last-child {
		border-right: 1px solid #e0e0e0;
		border-radius: 0 4px 4px 0;
	}
	.css button:not(.active):hover {
		background: #eee;
		cursor: pointer;
	}
	.css button.text {
		width: auto;
		min-width: 70px;
		cursor: pointer;
	}
	.css button.ellipse:hover {
		background: inherit;
		cursor: default;
	}
	.css button.active {
		background: #eee;
		font-weight: bold;
	}
	.css button.disabled:hover {
		background: inherit;
		cursor: default;
	}
	.css.mobile button.disabled {
		color: #bdbdbd;
	}
	.css.mobile button {
		font-weight: bold;
	}
</style>

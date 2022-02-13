<script>
	import { header } from './header.js'
	import { onMount } from 'svelte'

	export let id = 'svelte-simple-datatable'
	export let options
	export let columns

	let theadClassList
	onMount(() => {
		columns.draw()
		header.removeOriginalThead(id)
		theadClassList = header.getOrginalTHeadClassList(id)
	})
</script>

<section
	class="dt-header"
	class:sortable={$options.sortable === true}
	class:css={$options.css}
>
	<thead class={theadClassList}>
		<tr>
			{#each $columns as th}
				<th
					nowrap
					style="min-width:{th.minWidth}px" 
					on:click={(e) => columns.sort(e.target, th.key)}
					class={th.classList}
					class:sortable={th.key && $options.sortable === true}
				>
					{@html th.html}<span />
				</th>
			{/each}
		</tr>
		{#if $options.columnFilter === true}
			<tr>
				{#each $columns as th}
					<th class="filter" style="width:{th.width};height:25px;">
						{#if th.key}
							<input
								type="text"
								placeholder={$options.labels.filter}
								class="browser-default"
								on:input={(e) => columns.filter(th.key, e.target.value)}
							/>
						{/if}
					</th>
				{/each}
			</tr>
		{/if}
	</thead>
</section>

<style>
	section {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 6;
		background: inherit;
	}
	.css th {
		padding: 8px 0px 8px 16px;
		text-align: center;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
	.css th.sortable {
		cursor: pointer;
	}
	.css th.sortable span {
		padding-right: 16px;
		position: relative;
	}
	.css th.sortable span:before,
	.css th.sortable span:after {
		border: 4px solid transparent;
		content: '';
		display: block;
		height: 0;
		right: 0;
		top: 50%;
		position: absolute;
		width: 0;
	}
	.css th.sortable span:before {
		border-bottom-color: #e0e0e0;
		margin-top: -9px;
	}
	.css th.sortable span:after {
		border-top-color: #e0e0e0;
		margin-top: 1px;
	}
	.css th.sortable.asc span:before {
		border-bottom-color: #9e9e9e;
	}
	.css th.sortable.desc span:after {
		border-top-color: #9e9e9e;
	}
	.css th.filter {
		padding: 0;
		margin: 0;
		background-image: none;
		border: 1px solid #fafafa;
	}
	th.filter input {
		margin: 0;
		padding: 0;
		width: 100%;
	}
	.css th.filter input {
		background: #fff;
		height: 24px;
		border: none;
		border-bottom: 1px solid #eee;
		text-align: center;
		outline: none;
		border-radius: 0;
		font-size: 14px;
	}
	.css th.filter input::placeholder {
		color: #bdbdbd;
		font-style: italic;
		font-size: 13px;
	}
</style>

<script>
	import SearchInput from '../SearchInput.svelte'
	//import { options } from "../stores/options.js"
	import { key } from '../key.js'
	import { getContext } from 'svelte'

	export let name = 'svelte-simple-datatable'

	const { options } = getContext(key)
</script>

<section class="dt-search" class:css={options.css}>
	<SearchInput {name} />
</section>

<style>
	section {
		height: 32px;
	}
	.css {
		margin-left: 16px;
	}
</style>

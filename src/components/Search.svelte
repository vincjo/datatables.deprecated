<script>
	import SearchInput from '../SearchInput.svelte'
	export let id
	export let options

</script>

<section class="dt-search" class:css={$options.css}>
	<SearchInput {id}/>
</section>

<style>
	section {
		height: 32px;
	}
	.css {
		margin-left: 16px;
	}
</style>

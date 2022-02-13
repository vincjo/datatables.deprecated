<script>
	import PaginationButtonsHTML from './components/PaginationButtonsHTML.svelte'
	import { context as store } from './app/context.js'

	export let ref = ''
	export let classList = ''
	export let id = 'svelte-simple-datatable'
	let context = null
	let loop = 0
	const interval = setInterval( () => {
		loop++
		if (store.get(id)) {
			context = store.get(id)
			clearInterval(interval)
		}
		else if ( loop === 24) {
			clearInterval(interval)
		}
	}, 50)
	
</script>

{#if context}
	<PaginationButtonsHTML {context} {ref} {classList}/>
{/if}
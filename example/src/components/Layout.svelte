<script>
	import Nav from './Nav.svelte'
</script>



<main>
	<Nav/>
	<slot></slot>
</main>


<style>
	main {position:relative;width:96%;max-width:880px;background-color: white; padding:0;margin:0 auto;box-sizing:border-box;padding-bottom:80px;} 
</style>
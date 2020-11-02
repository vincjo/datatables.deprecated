<script>
	import { routes } from './routes.js'
	import Layout from 'components/Layout.svelte'
	import Router from 'svelte-spa-router'
</script>

<Layout>
	<Router {routes}/>
</Layout>
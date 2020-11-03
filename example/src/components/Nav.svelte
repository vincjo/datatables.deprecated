<script>
	import { location } from 'svelte-spa-router'
	let demo = $location.indexOf('demo')  > 0 ? `#${$location}` : '#/demo'
	let test = $location.indexOf('test')  > 0 ? `#${$location}` : '#/test'
</script>

<header>
	<ul>
		<li><a class:active={$location === '/'} href="#/">home</a></li>
		<li><a class:active={$location.indexOf('demo')  > 0 ? true : false} href="{demo}">demo</a></li>
		<li><a class:active={$location === '/settings'} href="#/settings">settings</a></li>
		<li><a class:active={$location.indexOf('test')  > 0 ? true : false} href="{test}">test</a></li>
		<li class="github"><a href="https://github.com/vincjo/svelte-simple-datatables#readme">
			<img alt="github logo" src="github.svg"/><span>&#10149; Github</span>
		</a></li>
	</ul>
</header>

{#if $location.indexOf('demo')  > 0}
	<ul class="demo">
		<li class:active={demo === `#/demo`} 				on:click={() => demo = "#/demo"}				><a href="#/demo">Basic</a></li>
		<li class:active={demo === `#/demo/pagination`} 	on:click={() => demo = "#/demo/pagination"}		><a href="#/demo/pagination">Pagination</a></li>
		<li class:active={demo === `#/demo/column-filter`} 	on:click={() => demo = "#/demo/column-filter"}	><a href="#/demo/column-filter">Column filter</a></li>
		<li class:active={demo === `#/demo/i18n`} 			on:click={() => demo = "#/demo/i18n"}			><a href="#/demo/i18n">i18n</a></li>
		<li class:active={demo === `#/demo/blocks`} 		on:click={() => demo = "#/demo/blocks"}			><a href="#/demo/blocks">Blocks</a></li>
		<li class:active={demo === `#/demo/expression`} 	on:click={() => demo = "#/demo/expression"}		><a href="#/demo/expression">JS Expression</a></li>
		<li class:active={demo === `#/demo/scroll-x`} 		on:click={() => demo = "#/demo/scroll-x"}		><a href="#/demo/scroll-x">Scroll X</a></li>
		<li class:active={demo === `#/demo/responsive`} 	on:click={() => demo = "#/demo/responsive"}		><a href="#/demo/responsive">Responsive</a></li>
	</ul>
{/if}

{#if $location.indexOf('test')  > 0}
	<ul class="demo">
		<li class:active={test === `#/test`} 				on:click={() => test = "#/test"}				><a href="#/test">Grid layout</a></li>
	</ul>
{/if}

<style>
	header {font-weight:300;padding:0;height:56px;}  
	header ul {margin:0;padding:0;}
	header ul::after {content: '';display: block;clear: both;}
	header li {display: block;float: left;margin-right:24px}
	header a.active{border-bottom:2px solid #ff3e00;}
	header a {text-decoration: none;padding:0;display: block;font-size:16px;line-height:56px;}
	header li.github{display:flex;margin-right:0;float:right;}
	header li.github img{float:right;padding:16px 8px;width:40px;}

	ul.demo{margin:24px 0 0 0;display:flex;flex-wrap:wrap;padding:0;list-style-type:none;}
    ul.demo li{display:block;margin:8px;border:1px solid #eee;border-radius:8px;}
    ul.demo li:first-child{margin-left:0;}
    ul.demo li.active{font-weight:bold;color:#40b3ff;border:2px solid #40b3ff;}
    ul.demo a{display:block;text-decoration:none;color:inherit;padding:8px 16px;}
</style>
<script>
	import Datatable from '../../../src/Datatable.svelte'
	import { data } from 'app/data.js'
	import { code } from 'code/home.js'
	import { Highlight } from 'svelte-highlight'
	import { apache as language } from 'svelte-highlight/languages'
	import Demo from '../components/Demo.svelte'
	const settings = {
		rowsPerPage: 50,
		columnFilter: true,
        blocks: {
            searchInput: true, 
        }

	}
	let rows
</script>

<svelte:head>
	<title>svelte-simple-datatables</title>
</svelte:head>

<aside>
	<img src="./logo-grey.svg" alt="logo"/>
	<div>
		<h1>svelte-simple-datatables</h1>
		<p>A Datatable component for Svelte</p>
		<div>
			<img src="https://img.shields.io/npm/dt/svelte-simple-datatables?color=%23bdbdbd" alt="npm downloads"/>
			<img src="https://img.shields.io/npm/v/svelte-simple-datatables?color=%23bdbdbd" alt="npm version"/>
		</div>
	</div>
</aside>

<h2> </h2>
<p>This package has been replaced by a new, more mature lib.</p>

<h1>Link to the new site:</h1>

<a href="https://vincjo.fr/datatables">
	<article>
		<img src="./new.svg" alt="new" class="new"/>
		<img src="./new-logo.svg" alt="logo"/>
		<div>
			<h1>svelte simple datatables</h1>
			<p>A toolkit for creating datatable components with Svelte</p>
			<div>
				<img
					src="https://img.shields.io/npm/dt/@vincjo/datatables?color=%23C2185B"
					alt="npm downloads"
				/>
				<img
					src="https://img.shields.io/npm/v/@vincjo/datatables?color=%23C2185B"
					alt="npm version"
				/>
			</div>
		</div>
	</article>
</a>

<style>
	aside{display:flex;justify-content:start;margin-top:32px;}
	aside h1 {font-size:32px;line-height:32px; text-align: left; font-weight:400; margin: 0; }
	aside img {width: 88px;max-width: 400px;margin: 0 16px 0 0;}
	aside p {margin:0;color:#676778;padding:0;line-height:32px;font-size:16px;}
	aside div img{width:96px;}
	h1{font-size:32px;color:#676778;font-weight:400;margin:40px 0 8px 0;}
	h2{font-size:24px;color:#676778;font-weight:400;margin:24px 0 8px 0;}
	/* 40b3ff     ff3e00    676778*/



	article {
		position: relative;
		display: inline-block;
		border: 4px solid #f48fb1;
		padding: 24px;
		border-radius: 8px;
        display: flex;
        justify-content: start;
        margin-top: 32px;
		max-width: 584px;
		transition: border, 0.2s;
    }
	article:hover {
		border: 4px dashed #c2185b;
	}
    article h1 {
        font-size: 32px;
        line-height: 32px;
        text-align: left;
        font-weight: 400;
        margin: 0;
    }
    article img {
        width: 88px;
        max-width: 400px;
        margin: 0 16px 0 0;
    }
    article p {
        margin: 0;
        color: #676778;
        padding: 0;
        line-height: 16px;
        font-size: 16px;
        margin: 8px;
    }
    article div img {
        width: 96px;
    }
	a {
		text-decoration: none;
	}
	img.new {
		position: absolute;
		width: 80px;
		height: 80px;
		top: -48px;
		right: -64px;
		transform: rotate(24deg);
	}
</style>
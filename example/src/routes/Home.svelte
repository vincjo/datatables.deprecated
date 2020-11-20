<script>
	import Datatable from '../../../src/Datatable.svelte'
	import { rows } from '../../../src/stores/data.js'
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
</script>

<svelte:head>
	<title>svelte-simple-datatables</title>
</svelte:head>

<aside>
	<img src="./logo.svg" alt="logo"/>
	<div>
		<h1>svelte-simple-datatables</h1>
		<p>A Datatable component for Svelte</p>
		<div>
			<img src="https://img.shields.io/npm/dt/svelte-simple-datatables?color=%23b71540" alt="npm downloads"/>
			<img src="https://img.shields.io/npm/v/svelte-simple-datatables?color=%23b71540" alt="npm version"/>
		</div>
	</div>
</aside>

<h2>Installation</h2>
<div class="code">
	<Highlight {language} code={`npm i -D svelte-simple-datatables`} />
</div>

<h2>Example</h2>
<section>
<Demo {code} data={data}>
	<Datatable {settings} data={JSON.parse(data)}>
		<thead>
			<th data-key="first_name">First Name</th>
			<th data-key="last_name">Last Name</th>
			<th data-key="email">Email</th>
		</thead>
		<tbody>
		{#each $rows as row}
			<tr>
				<td>{row.first_name}</td>
				<td>{row.last_name}</td>
				<td>{row.email}</td>
			</tr>
		{/each}
		</tbody>
	</Datatable>
</Demo>
</section>

<style>
	aside{display:flex;justify-content:start;margin-top:32px;}
	h1 {font-size:32px;line-height:32px; text-align: left; font-weight:400; margin: 0; }
	img {width: 88px;max-width: 400px;margin: 0 16px 0 0;}
	p {margin:0;color:#676778;padding:0;line-height:32px;font-size:16px;}
	div img{width:96px;}
	h2{font-size:24px;color:#676778;font-weight:400;margin:24px 0 8px 0;}
	/* 40b3ff     ff3e00    676778*/
	div.code{background:var(--hljs);border-radius:8px;padding:4px;max-width:440px;}

	td{text-align:center;padding:4px 0}
</style>
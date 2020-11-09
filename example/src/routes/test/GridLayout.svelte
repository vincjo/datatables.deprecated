<script>
    import { fade } from 'svelte/transition'
    import { data } from 'app/data.js'
	import Datatable from '../../../../src/Datatable.svelte'
    import { rows } from '../../../../src/stores/data.js'
    import { HighlightSvelte } from 'svelte-highlight'
</script>

<h2>Behaviour in CSS Grid</h2>
<div class="wrapper" in:fade>
    <div class="one"></div>
    <div class="two"></div>
    <div class="three">
        <Datatable data={JSON.parse(data)}>
            <thead>
                <th data-key="id">ID</th>
                <th data-key="first_name">First Name</th>
                <th data-key="last_name">Last Name</th>
                <th data-key="email">Email</th>
            </thead>
            <tbody>
                {#each $rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.email}</td>
                </tr>
                {/each}
            </tbody>
        </Datatable>
    </div>
    <div class="four"></div>
    <div class="five"></div>
    <div class="six"></div>
</div>


<h2>Code :</h2>
<div class="code">
<HighlightSvelte code={`
<script>
    import { data } from './data.example.js'
    import { Datatables, rows } from 'svelte-simple-datatables'
</script>

<div class="wrapper">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three">
        <Datatable {data}>
            <thead>
                <th data-key="id">ID</th>
                <th data-key="first_name">First Name</th>
                <th data-key="last_name">Last Name</th>
                <th data-key="email">Email</th>
            </thead>
            <tbody>
                {#each $rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.email}</td>
                </tr>
                {/each}
            </tbody>
        </Datatable>
    </div>
    <div class="four"></div>
    <div class="five"></div>
    <div class="six"></div>
</div>

<style>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
        background:rgba(255, 62, 0, 0.1);
        padding:8px
    }
    div{border-radius:8px;}
    .one     {background:rgba(255, 62, 0, 0.2);grid-column: 1 / 2;grid-row: 1;}
    .two     {background:rgba(255, 62, 0, 0.2);grid-column: 2 / 4;grid-row: 1 / 3;}
    .three   {background:#ffffff;padding:8px 0;grid-column: 1;grid-row: 2 / 5;}
    .four    {background:rgba(255, 62, 0, 0.2);grid-column: 3;grid-row: 3;}
    .five    {background:rgba(255, 62, 0, 0.2);grid-column: 2;grid-row: 4;}
    .six     {background:rgba(255, 62, 0, 0.2);grid-column: 3;grid-row: 4;}
    td{text-align:center;padding:4px;}
</style>
`}/>
</div>

<style>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 8px;
        grid-auto-rows: minmax(100px, auto);
        background:rgba(56, 173, 169, 0.1);
        padding:8px
    }
    div{border-radius:8px;}
    .three   {background:#fff;grid-column: 1;grid-row: 2 / 5;padding:8px 0;}
    .one     {background:rgba(56, 173, 169, 0.2);grid-column: 1 / 2;grid-row: 1;}
    .two     {background:rgba(56, 173, 169, 0.2);grid-column: 2 / 4;grid-row: 1 / 3;}
    .four    {background:rgba(56, 173, 169, 0.2);grid-column: 3;grid-row: 3;}
    .five    {background:rgba(56, 173, 169, 0.2);grid-column: 2;grid-row: 4;}
    .six     {background:rgba(56, 173, 169, 0.2);grid-column: 3;grid-row: 4;}
    td{text-align:center;padding:4px;}

    
    div.code{background:var(--hljs);border-radius:8px;padding:4px;}
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
</style>

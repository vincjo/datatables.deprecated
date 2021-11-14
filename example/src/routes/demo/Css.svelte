<script>
    import Demo from 'components/Demo.svelte'
    import { code } from 'code/demo.css.js'
    import { data } from 'app/data.js'
    import { Radio } from 'svelte-mui/src'
	import Datatable from '../../../../src/Datatable.svelte'
    let group = 'enabled' 
    let background = '#fff'
    $: css = group === 'enabled' ? true : false
    $: settings = { columnFilter: true, css: css }
    let rows
</script>


<h2>CSS</h2>
<aside>
    <div>
        <b>Option</b>
        <Radio bind:group color={'var(--primary'} on:click={() => background = '#fff'} value='enabled'><span>Enabled</span></Radio>
        <Radio bind:group color={'var(--primary'} on:click={() => background = '#fff'} value='disabled'><span>Disabled</span></Radio>
    </div>
    <div>
        <b>Custom examples</b>
        <Radio bind:group color={'var(--primary'} on:click={() => background = '#263238'} value='dark'>
            <span>Dark</span>
        </Radio>
        <Radio bind:group color={'var(--primary'} on:click={() => background = '#fff'} value='custom'>
            <span>Custom</span>
        </Radio>
    </div>
    <div>
        <b>External default</b>
        <Radio bind:group color={'var(--primary'} on:click={() => background = '#fff'} value='default'>
            <span>Default </span>
        </Radio>
    </div>
    <div>
        <b>Raw CSS links</b>
        <ul>
            <li><a href="https://github.com/vincjo/svelte-simple-datatables/blob/master/example/public/datatable.default.css">&#10143; Default</a></li>
            <li><a href="https://github.com/vincjo/svelte-simple-datatables/blob/master/example/public/datatable.dark.css">&#10143; Dark</a></li>
            <li><a href="https://github.com/vincjo/svelte-simple-datatables/blob/master/example/public/datatable.custom.css">&#10143; Custom</a></li>
        </ul>
    </div>
</aside>
<br>


<Demo code={code(css)} {data} {background}>
    <Datatable {settings} data={JSON.parse(data)} classList={group} bind:dataRows={rows}>
        <thead>
            <th data-key="id">ID</th>
            <th data-key="first_name">First Name</th>
            <th data-key="last_name">Last Name</th>
            <th data-key="email">Email</th>
        </thead>
        <tbody>
            {#if rows}
            {#each $rows as row}
            <tr>
                <td>{row.id}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
            </tr>
            {/each}
            {/if}
        </tbody>
    </Datatable>
</Demo>

<style>
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
    aside{display:flex;flex-direction:row;justify-content:start;flex-wrap:wrap;}
    aside div{margin-right:24px;border-right:1px solid #eee;padding-right:48px;}
    b{color:var(--label, #38ada9);font-weight:500;padding-left:8px;}
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0}
    a{text-decoration:none;color:#6a89cc;font-weight:500;transition:all,0.3s}
    a:hover{color:#4a69bd;}
    ul{margin:0;padding:0;padding-left:8px;list-style-type:none;}
</style>
<script>
    import Demo from '../../components/Demo.svelte'
    import { code } from 'code/demo.expression.js'
    import { data } from 'app/data.js'
    import { Checkbox } from 'svelte-mui/src';
	import Datatable from '../../../../src/Datatable.svelte'
    let merged = true
    const settings={ columnFilter: true }
    let rows
</script>

<h2>JS Expression</h2>
<Checkbox bind:checked={merged}>Merge <strong>First Name</strong> and <strong>Last Name</strong> columns</Checkbox>

<Demo code={code(merged)} {data}>
    {#if merged}
        <Datatable {settings} data={JSON.parse(data)} bind:dataRows={rows}>
            <thead>
                <th data-key="id">ID</th>
                <th data-key="(x) => x.first_name + ' ' + x.last_name">Firstname + Lastname</th>
                <th data-key="email">Email</th>
            </thead>
            <tbody>
                {#if rows}
                {#each $rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td>{row.first_name} {row.last_name}</td>
                    <td>{row.email}</td>
                </tr>
                {/each}
                {/if}
            </tbody>
        </Datatable>
    {:else}
        <Datatable {settings} data={JSON.parse(data)} bind:dataRows={rows}>
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
    {/if}
</Demo>

<style>
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
    strong{color:#676778}
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0}
</style>
<script>
    import Demo from 'components/Demo.svelte'
    import { code } from 'code/demo.pagination.js'
    import { data } from 'app/data.75.js'
    import { Checkbox } from 'svelte-mui/src';
	import Datatable from '../../../../src/Datatable.svelte'
    let pagination = true
    $: settings = { pagination: pagination }
    let rows
</script>

<h2>Pagination</h2>
<Checkbox bind:checked={pagination}>Set pagination</Checkbox>

<Demo code={code(pagination)} {data}>
    {#if pagination}
    <Datatable {settings} data={JSON.parse(data)} bind:dataRows={rows}>
        <thead>
            <th data-key="ID">ID</th>
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
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0}
</style>
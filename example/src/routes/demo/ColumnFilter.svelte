<script>
    import Demo from 'components/Demo.svelte'
    import { code } from 'code/demo.column-filter.js'
    import { data } from 'app/data.js'
    import { Checkbox } from 'svelte-mui/src';
	import Datatable from '../../../../src/Datatable.svelte'
    import { rows } from '../../../../src/stores/data.js'
    let columnFilter = true
    $: settings = { columnFilter: columnFilter }
</script>


<Checkbox bind:checked={columnFilter}>Set column filter inputs</Checkbox>

<Demo code={code(columnFilter)} {data}>
    {#if columnFilter}
    <Datatable {settings} data={JSON.parse(data)}>
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
    {:else}
    <Datatable {settings} data={JSON.parse(data)}>
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
    {/if}
</Demo>

<style>
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0}
</style>
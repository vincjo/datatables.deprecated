<script>
    import Demo from 'components/Demo.svelte'
    import { code } from 'code/demo.blocks.js'
    import { data } from 'app/data.js'
    import { Checkbox } from 'svelte-mui/src';
	import Datatable from '../../../../src/Datatable.svelte'
    import { rows } from '../../../../src/stores/data.js'
    let searchInput = true
    let paginationButtons = true
    let paginationRowCount = true
    $: settings = {
        blocks: {
            searchInput: searchInput, 
            paginationButtons: paginationButtons,
            paginationRowCount: paginationRowCount,
        }
    }
    $: blocks = `${!searchInput ? ', SearchInput' : ''}${!paginationButtons ? ', PaginationButtons' : ''}${!paginationRowCount ? ', PaginationRowCount' : ''}`
</script>

<section>
<h2>Optionnal blocks</h2>
<Checkbox bind:checked={searchInput}>Set <strong>searchInput</strong> block</Checkbox>
<Checkbox bind:checked={paginationButtons}>Set <strong>paginationButtons</strong> block</Checkbox>
<Checkbox bind:checked={paginationRowCount}>Set <strong>paginationRowCount</strong> block</Checkbox>
Disabling blocks does'nt change datatable's config. The aim is to import them separately to place them elsewhere.

<Demo code={code(searchInput, paginationButtons, paginationRowCount, blocks)} {data}>
    {#if searchInput && paginationButtons || searchInput && paginationRowCount}
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
    {:else if !searchInput && paginationButtons || !searchInput && paginationRowCount}
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
    {:else if searchInput && !paginationButtons && !paginationRowCount}
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
    {:else if !searchInput && !paginationButtons && !paginationRowCount}
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
</section>

<style>
    /* 40b3ff     ff3e00    676778*/
    strong{color:#676778}
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0}
</style>
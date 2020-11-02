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

<section>
<h2>Column filter</h2>
<Checkbox bind:checked={columnFilter}>Set column filter inputs</Checkbox>

<Demo code={code(columnFilter)} {data}>
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
	/* 40b3ff     ff3e00    676778*/
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
    td{text-align:center;padding:4px 16px 4px 0}
</style>
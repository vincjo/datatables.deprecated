<script>
    import Demo from 'components/Demo.svelte'
    import { code } from 'code/demo.js'
    import { data } from 'app/data.js'
	import Datatable from '../../../src/Datatable.svelte'
	import { rows } from '../../../src/stores/data.js'
</script>

<h2>No settings</h2>
<Demo {code} {data}>
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
</Demo>

<style>
	/* 40b3ff     ff3e00    676778*/
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
    td:first-child{min-width:64px;}
    td{text-align:center;padding:4px 16px 4px 0}
</style>
<script>
    import Demo from 'components/Demo.svelte'
    import { code } from 'code/demo.responsive.js'
    import { data } from 'app/data.js'
    import { Radio } from 'svelte-mui/src'
	import Datatable from '../../../../src/Datatable.svelte'
    let group = 'Desktop' 
    const settings = { columnFilter: true }
    let rows
</script>

<h2>Responsive</h2>
<Radio bind:group color={'var(--primary'} value='Desktop'><span>Desktop</span></Radio>
<Radio bind:group color={'var(--primary'} value='Mobile'><span>Mobile</span></Radio>

<Demo code={code()} {data} tableWidth={group === 'Desktop' ? 'auto' : '320px'}>
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
</Demo>

<style>
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
    span{font-weight:bold;color:#676778}
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0}
</style>
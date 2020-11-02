export const code = `
<script>
    import { data } from './data.example.js'  
    import { Datatable, rows } from 'svelte-simple-datatables'

    const settings = { columnFilter: true }
</script>

<Datatable settings={settings} data={data}>
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

<style>
    td{text-align:center;padding:4px 16px 4px 0}
</style>


`
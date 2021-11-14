export const code = () => {
    return `
<script>
    import { data } from './data.example.js'  
    import { Datatable } from 'svelte-simple-datatables'
    const settings = { columnFilter: true }
    let rows
</script>

<Datatable {settings} {data} bind:dataRows={rows}>
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

<style>
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0} 
</style>


`
}
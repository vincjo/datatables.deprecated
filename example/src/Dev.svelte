<script>
    import { data } from './data.example.js' 
    import Datatable from '../../src/Datatable.svelte'
    import { rows } from '../../src/store.js'

    const settings = {
        sortable: true,
        pagination: true,
        rowPerPage: 50,
        rowCount: true,
        search: true,
        columnFilter: true,
    }
</script>

<section>
    <Datatable settings={settings} data={data}>
        <thead>
            <th data-key="id">ID</th>
            <th data-key="first_name">First Name</th>
            <th data-key="last_name">Last Name</th>
            <th data-key="email">Email</th>
            <th data-key="ip_address">IP Adress</th>
        </thead>
        <tbody>
        {#each $rows as row}
            <tr>
                <td>{row.id}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
                <td>{row.ip_address}</td>
            </tr>
        {/each}
        </tbody>
    </Datatable>
</section>

<style>
    section{width:75%;margin:30px auto;height:70%;}
    tbody td{text-align:center;}
</style>
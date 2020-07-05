# Simple-DataTables for Svelte
Development in progress

Inspired by [fiduswriter/Simple-DataTables](https://github.com/fiduswriter/Simple-DataTables)
and [jQuery DataTables](https://datatables.net/)

See demo [here](https://geoflux.io/vincjo/svelte-simple-datatables)

# Install
````apache
npm install svelte-simple-datatables
````

# Sample code
If filtering options are chosen,
 you must indicate the key of each column in the `<th>` tag
````html
<script>
    import { data } from './data.example.js'  
    import { Datatable, rows } from 'svelte-simple-datatables'

    const settings = {
        sortable: true,
        pagination: true,
        rowPerPage: 50,
        rowCount: true,
        search: true,
        columnFilter: true,
    }
</script>

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
````
See result [here](https://geoflux.io/vincjo/svelte-simple-datatables) 

The Datatable includes 3 optional components
- PaginationButtons
- PaginationRowCount
- SearchInput

These can be imported separately and placed anywhere



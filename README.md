# Simple-DataTables for Svelte
Development in progress...<br>
Inspired by [fiduswriter/Simple-DataTables](https://github.com/fiduswriter/Simple-DataTables)
and [DataTables](https://datatables.net/)
<br><br>
See demo [here](https://geoflux.io/vincjo/svelte-simple-datatables)
<br><br>
`svelte-simple-datatables` component behavior :
- Fits in its container
- Inherit background-color
- The table has fixed header
- Scrolls vertically and horizontally



# Install
````apache
npm install svelte-simple-datatables
````

# Sample code
 To enable the filter and sort functions, you have to specify the *`data-key`* in the `<th>` tag. 
 You can set [an expression in plain javascript](#expression).<br>
 Settings definition is optionnal.
````html
<script>
    import { data } from './data.example.js'  
    import { Datatable, rows } from 'svelte-simple-datatables'

    const settings = {
        sortable: true,
        pagination: true,
        rowPerPage: 50,
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

# i18n
Labels can be defined in the settings :
````js
const settings = {
    labels: {
        search: 'Search...',    // search input placeholer
        filter: 'Filter',       // filter inputs placeholder
        noRows: 'No entries to found',
        info: 'Showing {start} to {end} of {rows} entries',
        previous: 'Previous',
        next: 'Next',       
    }
}
````

# Optional blocks
The Datatable includes 3 optional blocks
- PaginationButtons
- PaginationRowCount
- SearchInput

These can be disabled in the settings, imported as components and placed anywhere :
````html
<script>
    import { data } from './data.example.js' 
    import { SearchInput, PaginationButtons, PaginationRowCount, Datatable, rows } from 'svelte-simple-datatables'

    const settings = {
        blocks: {
            searchInput: false, 
            paginationButtons: false,
            paginationRowCount: false,
        }
    }
</script>

<SearchInput/>
<PaginationButtons/>
<PaginationRowCount/>

<Datatable {settings} {data}>...</Datatable>
````

# <a name="expression"></a> Use of expressions in `key` dataset
````svelte
<script>
    import { data } from './data.example.js'  
    import { Datatable, rows } from 'svelte-simple-datatables'

</script>

<Datatable {data}>
    <thead>
        <th data-key="id">ID</th>
        <!-- Expression that will be used for sorting and filtering -->
        <th data-key="{x => x.first_name + ' ' + x.last_name}">User</th>
        <!-- -->
        <th data-key="email">Email</th>
        <th data-key="ip_address">IP Adress</th>
    </thead>
    <tbody>
    {#each $rows as row}
        <tr>
            <td>{row.id}</td>
            <!-- This allows for example to concatenate values -->
            <td>{row.first_name} {row.last_name}</td>
            <!-- -->
            <td>{row.email}</td>
            <td>{row.ip_address}</td>
        </tr>
    {/each}
    </tbody>
</Datatable>
````

# Style
If need to override the CSS of the component : 
[datatable.css](./example/public/datatable.css)

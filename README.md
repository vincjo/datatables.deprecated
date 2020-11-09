<div align="center">
	<img align="center" src="./example/public/logo.svg" alt="logo" width="172"/>
	<p align="center">
		<h1 align="center" style="font-size:32px;margin:0;border:none;">svelte-simple-datatables</h1>
		<img src="https://img.shields.io/npm/v/svelte-simple-datatables?color=%23b71540" alt="npm version"/>
		<img src="https://img.shields.io/github/license/vincjo/svelte-simple-datatables?color=b71540" alt="last commit"/>
	</p>
</div>

# Presentation

`Datatable` component behavior :
- Fits in its container
- The table has fixed header
- Scrolls vertically and horizontally
- Responsive design

:point_right: **[Live Demo](https://vincjo.fr/svelte-simple-datatables)**

Todos : 
- Sort columns programmatically
- SSR support

<br>


# Install
:warning: No SSR support : to work properly with Sapper, the component is installed in DevDependencies 
````apache
npm i -D svelte-simple-datatables
````


# Sample code
 To enable the filter and sort functions, you have to specify the *`data-key`* in the `<th>` tag. 
 You can set [an expression in plain javascript](#expression).<br>
 Settings definition is optionnal.
````svelte
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
See demo [here](https://vincjo.fr/svelte-simple-datatables/#/demo/column-filter) 

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
See demo [here](https://vincjo.fr/svelte-simple-datatables/#/demo/i18n) 

# Optional blocks
The Datatable includes 3 optional blocks
- PaginationButtons
- PaginationRowCount
- SearchInput

These can be disabled in the settings, imported as components and placed anywhere :
````svelte
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

<Datatable {settings} {data}>
    (...)
</Datatable>

````
See demo [here](https://vincjo.fr/svelte-simple-datatables/#/demo/blocks) 

# <a name="expression"></a> Use of expressions in `key` dataset
````svelte
<script>
    import { data } from './data.example.js'  
    import { Datatable, rows } from 'svelte-simple-datatables'
</script>

<Datatable {data}>
    <thead>
        <th data-key="id">ID</th>

        <!-- Function that will be used for sorting and filtering -->
        <th data-key="(row) => row.first_name + ' ' + row.last_name">User</th>

        <th data-key="email">Email</th>
        <th data-key="ip_address">IP Adress</th>
    </thead>
    <tbody>
    {#each $rows as row}
        <tr>
            <td>{row.id}</td>

            <!-- This allows for example to concatenate values -->
            <td>{row.first_name} {row.last_name}</td>

            <td>{row.email}</td>
            <td>{row.ip_address}</td>
        </tr>
    {/each}
    </tbody>
</Datatable>
````
See demo [here](https://vincjo.fr/svelte-simple-datatables/#/demo/expression) 
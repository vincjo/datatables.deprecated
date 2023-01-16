<div align="center">
	<img align="center" src="./example/public/logo.svg" alt="logo" width="172"/>
	<p align="center">
		<h1 align="center" style="font-size:32px;margin:0;border:none;">svelte-simple-datatables</h1>
		<img src="https://img.shields.io/npm/v/svelte-simple-datatables?color=%23b71540" alt="npm version"/>
		<img src="https://img.shields.io/github/license/vincjo/svelte-simple-datatables?color=b71540" alt="last commit"/>
	</p>
</div>



## New version ([new repo](https://github.com/vincjo/datatables))

A new, more mature and controllable version is available here :

**[https://github.com/vincjo/datatables](https://github.com/vincjo/datatables)**

It has typescript support, headless UI, SSR, and provides a data handler.

It is a complete rewrite involving a few breaking changes but the concept is the same.


This package is still maintained, but it is better to use the [new one](https://github.com/vincjo/datatables) for more support.

<br>

# Presentation
`Datatable` component default behavior :
- Fits in its container
- The table has fixed header
- Scrolls vertically and horizontally
- Responsive design

:point_right: **[Live Demo](https://vincjo.fr/svelte-simple-datatables)**


<br>


# Install
:white_check_mark: Install as a dev dependency to avoid a SSR errors.
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
    import { Datatable } from 'svelte-simple-datatables'

    const settings = {
        sortable: true,
        pagination: true,
        rowsPerPage: 50,
        columnFilter: true,
    }
    let rows
</script>

<Datatable settings={settings} data={data} bind:dataRows={rows}>
    <thead>
        <th data-key="id">ID</th>
        <th data-key="first_name">First Name</th>
        <th data-key="last_name">Last Name</th>
        <th data-key="email">Email</th>
        <th data-key="ip_address">IP Adress</th>
    </thead>
    <tbody>
    {#if rows}
        {#each $rows as row}
            <tr>
                <td>{row.id}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
                <td>{row.ip_address}</td>
            </tr>
        {/each}
    {/if}
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
    import { SearchInput, PaginationButtons, PaginationRowCount, Datatable } from 'svelte-simple-datatables'

    const settings = {
        blocks: {
            searchInput: false, 
            paginationButtons: false,
            paginationRowCount: false,
        }
    }
    let rows
</script>

<SearchInput id={"my-datatable"}/>
<PaginationButtons id={"my-datatable"}/>
<PaginationRowCount id={"my-datatable"}/>

<Datatable {settings} {data} bind:dataRows={rows} id={"my-datatable"}>
    (...)
</Datatable>

````
See demo [here](https://vincjo.fr/svelte-simple-datatables/#/demo/blocks) 

# <a name="expression"></a> Use of expressions in `key` dataset
````svelte
<script>
    import { data } from './data.example.js'  
    import { Datatable } from 'svelte-simple-datatables'
    let rows
</script>

<Datatable {data} bind:dataRows={rows}>
    <thead>
        <th data-key="id">ID</th>

        <!-- Function that will be used for sorting and filtering -->
        <th data-key="(row) => row.first_name + ' ' + row.last_name">User</th>

        <th data-key="email">Email</th>
        <th data-key="ip_address">IP Adress</th>
    </thead>
    <tbody>
    {#if rows}
        {#each $rows as row}
            <tr>
                <td>{row.id}</td>

                <!-- This allows for example to concatenate values -->
                <td>{row.first_name} {row.last_name}</td>

                <td>{row.email}</td>
                <td>{row.ip_address}</td>
            </tr>
        {/each}
    {/if}
    </tbody>
</Datatable>
````
See demo [here](https://vincjo.fr/svelte-simple-datatables/#/demo/expression) 

# Breaking changes
<br>

## 2022-02-13 / v0.2.3 - Nested stores :
You can now set an `id` prop to the datatables :
````svelte
    <Datatable {settings} bind:dataRows={rows} id={'my-datatable'}>
````
This is **required** for using multiple datatables on the same page.<br>
 **[Code example](https://vincjo.fr/svelte-simple-datatables/#/test/multiple-dt)** <br>

The Context API has been removed for the benefit of `nested stores`, in particular to allow the use of remote components such as `<PaginationRowCount/>`, `<SearchInupt/>`<br>
**[Code example](https://vincjo.fr/svelte-simple-datatables/#/test/optional-blocks)** 
<br><br><br>

## 2021-11-14 / v0.1.27 - Multiple datatables

```svelte-simple-datatables``` now supports **multiple instances** on the same page.<br>
This brought some breaking changes in the way of mounting the component :
- ```$rows``` store is no longer exported but requires a declaration ``let rows`` in your code   
- The data are binded to a new prop : ``dataRows``
- To retreive the ``$rows`` store, we need to add a ``{#if}`` block before the loop
- Something else :
  - ``rowPerPage`` option becomes ``rowsPerPage`` (row<u>**s**</u>)

Special thanks to [@pangweisan](https://github.com/pangweisan) for his help
<script>
    import Demo from 'components/Demo.svelte'
    import { code } from 'code/demo.i18n.js'
    import { data } from 'app/data.js'
    import { Textfield } from 'svelte-mui/src';
	import Datatable from '../../../../src/Datatable.svelte'
    let search   = 'Search...'
    let filter   = 'Filter'
    let noRows   = 'No entries to found'
    let info     = 'Showing {start} to {end} of {rows} entries'
    let previous = 'Previous'
    let next     = 'Next'
    $: settings = {
        columnFilter: true,
        labels: {
            search:   search,    // search input placeholer
            filter:   filter,   // filter inputs placeholder
            noRows:   noRows,   
            info:     info,     
            previous: previous, 
            next:     next       
        }
    }
    let rows
</script>

<h2>Internationalization</h2>
<aside class="i18n-form">
    <Textfield bind:value={noRows}   class="i18n tall"  label="No rows"                     spellcheck="false"/>
    <Textfield bind:value={search}   class="i18n small" label="Search input placeholder"    spellcheck="false"/>
    <Textfield bind:value={filter}   class="i18n small" label="Filter inputs placeholder"   spellcheck="false"/>
    <Textfield bind:value={info}     class="i18n tall"  label="Row count"                   spellcheck="false"/>
    <Textfield bind:value={previous} class="i18n small" label="Previous button"             spellcheck="false"/>
    <Textfield bind:value={next}     class="i18n small" label="Next button"                  spellcheck="false"/>
</aside>


<Demo code={code(search, filter, noRows, info, previous, next)} {data}>
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
	/* 40b3ff     ff3e00    676778*/
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
    aside{display:flex;flex-wrap: wrap;}
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0}
</style>
<script>
    import { data } from 'app/data.js'
    import { HighlightSvelte } from 'svelte-highlight'
	import Datatable from '../../../../src/Datatable.svelte'
    import SearchInput from '../../../../src/SearchInput.svelte'
    import PaginationButtons from '../../../../src/PaginationButtons.svelte'
    import PaginationRowCount from '../../../../src/PaginationRowCount.svelte'

    const settings = { 
        columnFilter: true, 
        rowsPerPage: 25,
        blocks: {
            searchInput: false, 
            paginationButtons: false,
            paginationRowCount: false,
        }
    }
    let rows
</script>

<h2>Optional blocks</h2>
<section>
    <aside class="z-depth-2">
        {#if $rows}
            <SearchInput id={'my-table'}/>
        {/if}
    </aside>
    <div class="z-depth-2">
        <Datatable {settings} data={JSON.parse(data)} bind:dataRows={rows} id={'my-table'}>
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
    </div>
    
    <aside class="z-depth-2">
        {#if $rows}
            <PaginationButtons id={'my-table'}/>
            <PaginationRowCount id={'my-table'}/>
        {/if}
    </aside>
</section>

<h2>Code :</h2>
<div class="code">
<HighlightSvelte code={`
<script>
    import { data } from './data.example.js'
    import { Datatable, SearchInput, PaginationButtons, PaginationRowCount } from 'svelte-simple-datatables'

    const settings = { 
        columnFilter: true, 
        rowsPerPage: 25,
        blocks: {
            searchInput: false, 
            paginationButtons: false,
            paginationRowCount: false,
        }
    }
    let rows
</script>

<section>
    <aside>
        {#if $rows}
            <SearchInput id={'my-table'}/>
        {/if}
    </aside>

    <div>
        <Datatable {settings} data={JSON.parse(data)} bind:dataRows={rows} id={'my-table'}>
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
    </div>
    
    <aside>
        {#if $rows}
            <PaginationButtons id={'my-table'}/>
            <PaginationRowCount id={'my-table'}/>
        {/if}
    </aside>
</section>

<style>
    section{padding:24px 48px;background:#eee;border-radius:8px;}
    aside{display:flex;justify-content:space-between;padding:8px 16px;background:#fff;border-radius:8px;margin:8px 0;}
    div{padding:8px 0;height:400px;background:#fff;border-radius:8px;}
    td{text-align:center;padding:4px 8px;white-space:nowrap;}
</style>
`}/>
</div>


<style>
    section{padding:24px 48px;background:#eee;border-radius:8px;}
    aside{display:flex;justify-content:space-between;padding:8px 16px;background:#fff;border-radius:8px;margin:8px 0;}
    div{padding:8px 0;height:400px;background:#fff;border-radius:8px;}
    td{text-align:center;padding:4px 8px;white-space:nowrap;}
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}

    
    div.code{background:var(--hljs);border-radius:8px;padding:4px;}
</style>
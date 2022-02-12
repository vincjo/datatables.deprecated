<script>
    import { data } from 'app/data.js'
	import Datatable from '../../../../src/Datatable.svelte'
    import SearchInput from '../../../../src/SearchInput.svelte'
    const settings = { 
        columnFilter: true, 
        rowsPerPage: 50,
        blocks: {
            searchInput: false, 
            paginationButtons: true,
            paginationRowCount: true,
        }
    }
    let rows
</script>

<h2>Optional blocks</h2>
<section>
    <aside class="z-depth-2">
        {#if $rows}
        <SearchInput/>
        {/if}
    </aside>
    <div class="z-depth-2">
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
    </div>
</section>
<style>
    section{padding:24px 48px;background:#eee;border-radius:8px;}
    aside{padding:8px 0;height:540px;background:#fff;border-radius:8px;}
    div{padding:8px 0;height:540px;background:#fff;border-radius:8px;}
    td{text-align:center;padding:4px 8px;white-space:nowrap;}
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
</style>
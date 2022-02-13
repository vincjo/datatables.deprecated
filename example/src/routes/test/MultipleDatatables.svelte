<script>
    import { data, data2 } from 'app/data.js'
    import { HighlightSvelte } from 'svelte-highlight'
	import Datatable from '../../../../src/Datatable.svelte'

    const settings1 = { columnFilter: true }

    const settings2 = {
        labels: {
            search: 'Rechercher...',    // search input placeholer
            filter: 'Filtrer',       // filter inputs placeholder
            noRows: 'Aucune donnée',
            info: '{start} à {end} sur {rows} lignes',
            previous: 'Précédent',
            next: 'Suivant',        
        }
    }
    let rowset1 
    let rowset2
</script>

<h2>Multiple Datatables on the same page</h2>
<section>
    <aside>
    <Datatable settings={settings1} data={JSON.parse(data)} bind:dataRows={rowset1} id={'table-1'}>
        <thead>
            <th data-key="id">ID</th>
            <th data-key="first_name">First Name</th>
            <th data-key="last_name">Last Name</th>
            <th data-key="email">Email</th>
        </thead>
        <tbody>
            {#if rowset1}
            {#each $rowset1 as row}
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
    </aside>

    <aside>
    <Datatable settings={settings2} data={JSON.parse(data2)} bind:dataRows={rowset2} id={'table-2'}>
        <thead>
            <th data-key="id">ID</th>
            <th data-key="first_name">First Name</th>
            <th data-key="last_name">Last Name</th>
            <th data-key="email">Email</th>
        </thead>
        <tbody>
            {#if rowset2}
            {#each $rowset2 as row}
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
    </aside>
</section>

<h2>Code :</h2>
<div class="code">
<HighlightSvelte code={`
<script>
    import { data } from './data.example.js'
    import { Datatable } from 'svelte-simple-datatables'

    const settings1 = { columnFilter: true }

    const settings2 = {
        labels: {
            search: 'Rechercher...',    // search input placeholer
            filter: 'Filtrer',       // filter inputs placeholder
            noRows: 'Aucune donnée',
            info: '{start} à {end} sur {rows} lignes',
            previous: 'Précédent',
            next: 'Suivant',        
        }
    }
        
    let rows1 
    let rows2
</script>

<h2>Multiple Datatables on the same page</h2>
<section>
    <aside>
    <Datatable settings={settings1} data={JSON.parse(data)} bind:dataRows={rows1} id={'table-1'}>
        <thead>
            <th data-key="id">ID</th>
            <th data-key="first_name">First Name</th>
            <th data-key="last_name">Last Name</th>
            <th data-key="email">Email</th>
        </thead>
        <tbody>
        {#if rows1}
            {#each $rows1 as row}
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
    </aside>

    <aside>
    <Datatable settings={settings2} data={JSON.parse(data2)} bind:dataRows={rows2} id={'table-2'}>
        <thead>
            <th data-key="id">ID</th>
            <th data-key="first_name">First Name</th>
            <th data-key="last_name">Last Name</th>
            <th data-key="email">Email</th>
        </thead>
        <tbody>
        {#if rows2}
            {#each $rows2 as row}
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
    </aside>
</section>

<style>
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0}
    section{display:flex;flex-direction:row;background:#eee;border-radius:16px;padding:32px;justify-content:center;}
    aside{width:400px;height:400px;margin:0 12px;padding:8px 0;border-radius:8px;background:#fff;}
</style>
`}/>
</div>


<style>
	/* 40b3ff     ff3e00    676778*/
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0}
    section{display:flex;flex-direction:row;background:#eee;border-radius:16px;padding:32px;justify-content:center;}
    aside{width:400px;height:400px;margin:0 12px;padding:8px 0;border-radius:8px;background:#fff;}
</style>
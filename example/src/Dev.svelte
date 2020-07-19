<script>
    import { data } from './data.example.js' 
    import Datatable from '../../src/Datatable.svelte'
    import { rows } from '../../src/store.js'

    const settings = {
        sortable: true,
        pagination: true,
        rowPerPage: 50,
        columnFilter: true,
        blocks: {
            searchInput: true, 
            paginationButtons: true,
            paginationRowCount: true,
        }
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
    section{position:absolute;top:64px;left:10%;width:80%;bottom:10%;padding:20px;background:#fff;border-radius:4px;
    -webkit-box-shadow: 0 4px 5px 0 rgba(189,189,189, 0.14), 0 1px 10px 0 rgba(189,189,189, 0.12), 0 2px 4px -1px rgba(189,189,189, 0.3);box-shadow: 0 4px 5px 0 rgba(189,189,189, 0.14), 0 1px 10px 0 rgba(189,189,189, 0.12), 0 2px 4px -1px rgba(189,189,189, 0.3);}
    /* section{width:80%;height:70%;margin:30px auto 0 auto;padding:20px;border-radius:4px;background:#fff;-webkit-box-shadow: 0 4px 5px 0 rgba(189,189,189, 0.14), 0 1px 10px 0 rgba(189,189,189, 0.12), 0 2px 4px -1px rgba(189,189,189, 0.3);box-shadow: 0 4px 5px 0 rgba(189,189,189, 0.14), 0 1px 10px 0 rgba(189,189,189, 0.12), 0 2px 4px -1px rgba(189,189,189, 0.3);} */
    tbody td{text-align:center;}
</style>
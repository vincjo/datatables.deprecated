<script>
    import { data, data2 } from 'app/data.js'
	import Datatable from '../../../../src/Datatable.svelte'
    import { rows } from '../../../../src/stores/data.js'
</script>

<h2>Multiple Datatables on the same page</h2>
    <section>
        <aside>
        <Datatable data={JSON.parse(data)}>
            <thead>
                <th data-key="id">ID</th>
                <th data-key="first_name">First Name</th>
                <th data-key="last_name">Last Name</th>
                <th data-key="email">Email</th>
            </thead>
            <tbody>
                {#each $rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.email}</td>
                </tr>
                {/each}
            </tbody>
        </Datatable>
        </aside>
        <aside>
        <Datatable data={JSON.parse(data2)}>
            <thead>
                <th data-key="id">ID</th>
                <th data-key="first_name">First Name</th>
                <th data-key="last_name">Last Name</th>
                <th data-key="email">Email</th>
            </thead>
            <tbody>
                {#each $rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.email}</td>
                </tr>
                {/each}
            </tbody>
        </Datatable>
        </aside>
    </section>


<style>
	/* 40b3ff     ff3e00    676778*/
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0}
    section{display:flex;flex-direction:row;background:#eee;border-radius:16px;padding:32px;justify-content:center;}
    aside{width:400px;height:400px;margin:0 12px;padding:8px 0;border-radius:8px;background:#fff;}
</style>
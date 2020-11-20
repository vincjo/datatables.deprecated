<script>
    import { data } from 'app/data.11000.js'
	import Datatable from '../../../../src/Datatable.svelte'
    import { rows } from '../../../../src/stores/data.js'
    const settings = { columnFilter: true, rowsPerPage: 100 }
</script>

<h2>11000 rows</h2>
<section>
    <div class="z-depth-2">
        <Datatable {settings} data={JSON.parse(data)}>
            <thead>
                <th data-key="first_name">First Name</th>
                <th data-key="last_name">Last Name</th>
                <th data-key="job_title">Job Title</th>
                <th data-key="email">Email</th>
                <th data-key="city">City</th>
                <th data-key="country">Country</th>
                <th data-key="id">GUID</th>
            </thead>
            <tbody>
                {#each $rows as row}
                <tr>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.job_title}</td>
                    <td>{row.email}</td>
                    <td>{row.city}</td>
                    <td>{row.country}</td>
                    <td>{row.id}</td>
                </tr>
                {/each}
            </tbody>
        </Datatable>
    </div>
</section>
<style>
    section{padding:24px 48px;background:#eee;border-radius:8px;}
    div{padding:8px 0;height:540px;background:#fff;border-radius:8px;}
    td{text-align:center;padding:4px 8px;white-space:nowrap;}
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
</style>
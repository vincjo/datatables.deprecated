<script>
    import Demo from 'components/Demo.svelte'
    import { code } from 'code/demo.scroll-x.js'
    import { data } from 'app/data.large.js'
	import Datatable from '../../../../src/Datatable.svelte'
    import { rows } from '../../../../src/stores/data.js'
    const settings = { columnFilter: true }
</script>

<p>This example shows a large dataset in a small table container</p>
<Demo code={code()} {data}>
    <Datatable {settings} data={JSON.parse(data)}>
        <thead>
            <th data-key="id">ID</th>
            <th data-key="first_name">First Name</th>
            <th data-key="last_name">Last Name</th>
            <th data-key="email">Email</th>
            <th data-key="company">Company</th>
            <th data-key="department">Department</th>
            <th data-key="job_title">Job title</th>
            <th data-key="address">Address</th>
            <th data-key="city">City</th>
            <th data-key="country_code">Country code</th>
            <th data-key="ip_address">ID Address</th>
            <th data-key="guid">GUID</th>
        </thead>
        <tbody>
            {#each $rows as row}
            <tr>
                <td>{row.id}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
                <td>{row.company}</td>
                <td>{row.department}   </td>
                <td>{row.job_title}</td>
                <td>{row.address}</td>
                <td>{row.city}</td>
                <td>{row.country_code}</td>
                <td>{row.ip_address}</td>
                <td>{row.guid}</td>
            </tr>
            {/each}
        </tbody>
    </Datatable>
</Demo>

<style>
    th:first-child{width:56px;}
    td{text-align:center;padding:4px 8px;white-space:nowrap}
</style>
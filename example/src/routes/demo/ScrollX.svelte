<script>
    import Demo from 'components/Demo.svelte'
    import { code } from 'code/demo.column-filter.js'
    import { data } from 'app/data.large.js'
	import Datatable from '../../../../src/Datatable.svelte'
    import { rows } from '../../../../src/stores/data.js'
    let columnFilter = true
    $: settings = { columnFilter: columnFilter }
</script>

<Demo code={code(columnFilter)} {data}>
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
    td:first-child{min-width:64px;}
    td{text-align:center;padding:4px 16px 4px 0;white-space:nowrap;}
</style>
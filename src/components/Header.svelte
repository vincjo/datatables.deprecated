<script>
    import { data, state, options, filters } from '../store.js'
    import Header from './Header.js'
    import { onMount } from 'svelte'
    $: columns = []
    let header
    onMount( () => {
        header = new Header
        columns = header.getColumns()
        header.removeOriginalThead($options.columnFilter)
    })
    const sort = (th) => {
        if($options.sortable !== true || typeof th.dataset.key === 'undefined') {
            return
        }
        if (th.className === 'sortable' || th.className === 'sortable asc') {
            Array.from(th.parentNode.children).forEach(item => item.dataset.key ? item.className = 'sortable' : item.className = '')
            th.className = 'sortable desc'
            data.sortDesc(th.dataset.key)
            state.setPage(1)
        } else {
            Array.from(th.parentNode.children).forEach(item => item.dataset.key ? item.className = 'sortable' : item.className = '')
            th.className = 'sortable asc'
            data.sortAsc(th.dataset.key)
            state.setPage(1)
        }
        header.redraw()
    }

    const filter = (e) => {
        state.setPage(1)
        filters.setColumnFilter(e.target.dataset.key, e.target.value)
        state.updateRowCount()
        header.redraw()
    }
</script>

<header class="datatable-thead" class:sortable={$options.sortable === true}>
    <thead>
        <tr>
        {#each columns as th}
            <th 
                style="width:{th.width}" 
                on:click={(e) => sort(e.target)}
                data-key={th.key}
                class:sortable={th.key && $options.sortable === true}
            >{@html th.html}</th>
        {/each}        
        </tr>
        {#if $options.columnFilter === true}
        <tr>
        {#each columns as th}
            <th class="filter" style="width:{th.width};height:25px;">
                <input 
                    type="text" 
                    placeholder="{$options.labels.filter}" 
                    class="browser-default"
                    data-key={th.key}
                    on:input={(e) => filter(e)}
                />
            </th>
        {/each}
        </tr>
        {/if}
    </thead>
</header>

<style>
    header{position:-webkit-sticky;position:sticky;top:0;left:0;}
</style>
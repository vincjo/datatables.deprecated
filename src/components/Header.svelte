<script>
    import { data, state, options, labels, filters } from '../store.js'
    import Header from './header.js'
    import { onMount } from 'svelte'
    $: columns = []
    let height = '40px'
    let header
    onMount( () => {
        header = new Header
        columns = header.getColumns()
        header.removeOriginalThead($options.columnFilter)
        height = header.height
    })
    const sort = (th) => {
        if (th.className.length === 0 || th.className === 'asc') {
            Array.from(th.parentNode.children).forEach(item => item.className = '')
            th.className = 'desc'
            data.sortDesc(th.dataset.key)
            state.setPage(1)
        } else {
            Array.from(th.parentNode.children).forEach(item => item.className = '')
            th.className = 'asc'
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

<header class="datatable-thead" class:sortable={$options.sortable === true} style="height:{height}px">
    <thead>
        <tr>
        {#each columns as th}
            <th 
                style="width:{th.width}" 
                on:click={(e) => sort(e.target)}
                data-key={th.key}
            >{@html th.html}</th>
        {/each}        
        </tr>
        {#if $options.columnFilter === true}
        <tr>
        {#each columns as th}
            <th class="filter" style="width:{th.width};height:25px;">
                <input 
                    type="text" 
                    placeholder="{$labels.filter}" 
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
    header{position:sticky;top:0;left:0;}
</style>
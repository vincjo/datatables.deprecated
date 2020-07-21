<script>
    import { data, state, options, filters, columns } from '../store.js'
    import Header from './Header.js'
    import { onMount } from 'svelte'
    onMount( () => {
        const header = new Header
        header.getColumns()
        header.removeOriginalThead($options.columnFilter)
    })
    const sort = (th) => {
        if($options.sortable !== true || typeof th.dataset.key === 'undefined') {
            return
        }
        if ( th.classList.contains('sortable') && th.classList.contains('asc') ) {
            Array.from(th.parentNode.children).forEach(item => item.classList.remove('asc'))
            th.classList.add('desc')
            data.sortDesc(th.dataset.key)
            state.setPage(1)
        } else {
            Array.from(th.parentNode.children).forEach(item => item.classList.remove('desc'))
            th.classList.add('asc')
            data.sortAsc(th.dataset.key)
            state.setPage(1)
        }
        columns.redraw()
    }

    const filter = (e) => {
        state.setPage(1)
        filters.setColumnFilter(e.target.dataset.key, e.target.value)
        state.updateRowCount()
        columns.redraw()
    }
</script>

<header class="datatable-thead" class:sortable={$options.sortable === true}>
    <thead>
        <tr>
        {#each $columns as th}
            <th 
                style="width:{th.width}" 
                on:click={(e) => sort(e.target)}
                data-key={th.key}
                class={th.classList}
                class:hidden={!th.visible}
                class:sortable={th.key && $options.sortable === true}
            >{@html th.html}</th>
        {/each}        
        </tr>
        {#if $options.columnFilter === true}
        <tr>
        {#each $columns as th}
            <th class="filter" style="width:{th.width};height:25px;" class:hidden={!th.visible}>
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
    header{position:-webkit-sticky;position:sticky;top:0;left:0;z-index:6;}
    th.hidden{display:none;}
</style>
import { writable, derived } from 'svelte/store'

export default class Data 
{
    create(states, filters, options)
    {
        const data = this.createData()
        const filtered = this.createFiltered(data, states.rowsCount, filters.globalFilter, filters.localFilters)
        const rows = this.createRows(filtered, options, states.pageNumber)
        return {
            data: data,
            filtered: filtered,
            rows: rows
        }
    }

    createData()
    {
        const { subscribe, set, update } = writable([])
        return {
            subscribe, set,
            sortAsc: (key) => update(store => {
                try {
                    store.sort( (a, b) => {
                        if ( typeof( key(b) ) === "boolean" ) {
                            return key(a) ? 1 : -1
                        } else {
                            return key(b).localeCompare(key(a)) 
                        }									
                    })
    
                    return store
                } catch (e) {
                    return store.sort( (a, b) => parseFloat(key(b)) - parseFloat(key(a)))
                }
                //return store.sort( (a, b) => key(b).localeCompare(key(a)) )
                
            }),
            sortDesc: (key) => update(store => {
                try {
                    store.sort( (a, b) => {
                        if ( typeof(key(b) ) === "boolean" ) {
                            return key(a) ? -1 : 1
                        } else {
                            return key(a).localeCompare(key(b)) 
                        }									
                    })
    
                    return store					
                } catch (e) {
                    return store.sort( (a, b) => parseFloat(key(a)) - parseFloat(key(b)))
                }
                //return store.sort( (a, b) => key(a).localeCompare(key(b)) )
            }),
        }
    }

    createFiltered(data, rowsCount, globalFilter, localFilters) 
    {
        return derived(
            [data, globalFilter, localFilters],
            ([$data, $globalFilter, $localFilters]) => {
                if ($globalFilter) {
                    $data = $data.filter( item => {
                        return Object.keys(item).some( k => {
                            return item[k].toString().toLowerCase().indexOf($globalFilter.toString().toLowerCase()) > -1
                        })
                    })
                }
                if ($localFilters.length > 0) {
                    $localFilters.forEach(filter => {
                        return $data = $data.filter( item => filter.key(item).toString().toLowerCase().indexOf(filter.value.toString().toLowerCase()) > -1)
                    })
                }
                rowsCount.set($data.length)
                return $data
            } 	
        )
    }

    createRows(filtered, options, pageNumber)
    {
        return derived(
            [filtered, options, pageNumber],
            ([$filtered, $options, $pageNumber]) => {
                if (!$options.pagination) {
                    return $filtered
                }
                return $filtered.slice( ($pageNumber - 1) * $options.rowsPerPage, $pageNumber * $options.rowsPerPage) 
            }
        ) 
    }
}


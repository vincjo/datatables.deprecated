import {data, options, labels} from './store.js'

export default class Datatable {
    constructor(data, options = {}) {
        this.setRows(data)
        this.setOptions(options)
    }

    setRows(arr) {
        arr.forEach( (item) => {
            Object.keys(item).forEach( (k) => {
                if (item[k] === null) {
                    item[k] = ''
                }
            })
        })
        data.set(arr)
        return
    }

    setOptions(opt) {
        options.set({
            sortable:     typeof opt.sortable     === 'boolean' ? opt.sortable     : true,
            pagination:   typeof opt.pagination   === 'boolean' ? opt.pagination   : true,
            rowCount:     typeof opt.rowCount     === 'boolean' ? opt.rowCount     : true,
            search:       typeof opt.search       === 'boolean' ? opt.search       : true,
            rowPerPage:   typeof opt.rowPerPage   === 'number'  ? opt.rowPerPage   : 50,
            columnFilter: typeof opt.columnFilter === 'boolean' ? opt.columnFilter : false, 
        })
        if (opt.labels) {
            labels.set({
                search:   typeof opt.labels.search   === 'string' ? opt.labels.search   : 'Search...',
                filter:   typeof opt.labels.filter   === 'string' ? opt.labels.filter   : 'Filter',
                noRows:   typeof opt.labels.noRows   === 'string' ? opt.labels.noRows   : 'No entries to found',
                info:     typeof opt.labels.info     === 'string' ? opt.labels.info     : 'Showing {start} to {end} of {rows} entries',
                previous: typeof opt.labels.previous === 'string' ? opt.labels.previous : 'Previous',
                next:     typeof opt.labels.next     === 'string' ? opt.labels.next     : 'Next',                
            })     
        }
    }
}
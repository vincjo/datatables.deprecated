import {data, options, columns} from './store.js'

export default class Datatable {

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
        opt.labels = opt.labels ? opt.labels : {}
        const labels = {
            search:   typeof opt.labels.search   === 'string' ? opt.labels.search   : 'Search...',
            filter:   typeof opt.labels.filter   === 'string' ? opt.labels.filter   : 'Filter',
            noRows:   typeof opt.labels.noRows   === 'string' ? opt.labels.noRows   : 'No entries to found',
            info:     typeof opt.labels.info     === 'string' ? opt.labels.info     : 'Showing {start} to {end} of {rows} entries',
            previous: typeof opt.labels.previous === 'string' ? opt.labels.previous : 'Previous',
            next:     typeof opt.labels.next     === 'string' ? opt.labels.next     : 'Next',                
        }   
        opt.blocks = opt.blocks ? opt.blocks : {}
        const blocks = {
            searchInput:        typeof opt.blocks.searchInput        === 'boolean' ? opt.blocks.searchInput        : true, 
            paginationButtons:  typeof opt.blocks.paginationButtons  === 'boolean' ? opt.blocks.paginationButtons  : true,
            paginationRowCount: typeof opt.blocks.paginationRowCount === 'boolean' ? opt.blocks.paginationRowCount : true,
        }
        this.options = {
            sortable:     typeof opt.sortable     === 'boolean' ? opt.sortable     : true,
            pagination:   typeof opt.pagination   === 'boolean' ? opt.pagination   : true,
            rowPerPage:   typeof opt.rowPerPage   === 'number'  ? opt.rowPerPage   : 50,
            columnFilter: typeof opt.columnFilter === 'boolean' ? opt.columnFilter : false, 
            labels: labels,
            blocks: blocks
        }
        options.set(this.options)
    }

    getSize() {
        const parent = document.querySelector('main.datatable').parentNode
        const style = getComputedStyle(parent)
        const rect = parent.getBoundingClientRect()
        const getInt = (pxValue) => { return parseFloat(pxValue.replace('px', ''))  } 
        return {
            parentWidth: rect.width,
            parentHeight: rect.height,
            width: (rect.width - getInt(style.paddingLeft) - getInt(style.paddingRight)) / rect.width,
            height: (rect.height - getInt(style.paddingTop) - getInt(style.paddingBottom)) / rect.height,
            top: style.paddingTop,
            right: style.paddingRight,
            bottom: style.paddingBottom,
            left: style.paddingLeft
        }
    }

    resize() {
        if (!document.querySelector('main.datatable')) {
            return
        }
        const size = this.getSize()
        const tableContainer = document.querySelector('main.datatable .dt-table')
        tableContainer.style.height = this.getTableContainerHeight(size.parentHeight * size.height) + 'px'
        columns.redraw()
    }

    getTableContainerHeight(height) {
        let paginationBlock
        if (this.options.pagination && (this.options.blocks.paginationButtons || this.options.blocks.paginationRowCount)) {
            paginationBlock = true
        }
        const calc = [
            (this.options.blocks.searchInput) ? document.querySelector('.datatable .dt-search').getBoundingClientRect().height : 0,
            (paginationBlock) ? document.querySelector('.datatable .dt-pagination').getBoundingClientRect().height : 0
        ]
        const sum = (a, b) => a + b
        document.querySelector('main.datatable .dt-table').style.height = height - calc.reduce(sum) + 'px'
    }

    addEventScrollX() {
        document.querySelector('main.datatable .dt-table').addEventListener('scroll', (e) => {
            document.querySelector('.datatable-thead').style.left = (-1 * e.target.scrollLeft ) + 'px'
        })
    }
}
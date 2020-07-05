import Thead from './thead.js'
import { data, filters, state, labels } from '../store.js'

export default class Table {
    constructor(table, header, options) {
        this.table = table
        this.header = header
        this.options = options
        this.thead = table.querySelector('thead')
        this.tbody = table.querySelector('tbody')
    }

    set() {
        this.setHeader()
        if (this.options.sortable === true) {
            this.setSortable()
        }
    }

    setHeader() {
        const thead = new Thead(this.thead, this.header)
        this.header = thead.createStickyHeader()
        this.columns = this.setColumns()
        if (this.options.columnFilter === true) {
            this.setColumnFilter()
        }
    }

    setSortable() {
        Array.from(this.header.children[0].children).forEach(th => {
            th.addEventListener('click', (e) => {
                Array.from(this.header.children[0].children).forEach(el => {
                    el.className = ''
                })
                const column = this.columns.find(item => item.key === th.dataset.key)
                if (!column.sort || column.sort === 'asc') {
                    th.className = 'desc'
                    column.sort = 'desc'
                    column.class = 'desc'
                    data.sortDesc(column.key)
                    state.setPage(1)
                }
                else {
                    th.className = 'asc'
                    column.sort = 'asc'
                    column.class = 'asc'
                    data.sortAsc(column.key)
                    state.setPage(1)
                }
            })
        })       
    }

    setColumnFilter() {
        const height = parseFloat(this.header.style.height.replace('px', ''))
        this.header.style.height = height + 25 + 'px'
        const thead = this.header.children[0].cloneNode(true)
        thead.style.height = '25px'  
        Array.from(thead.children).forEach(th => {
            const input = document.createElement('input')
            input.type = 'text'
            input.dataset.key = th.dataset.key
            input.style.width = th.style.width 
            let $labels 
            labels.subscribe(store => $labels = store)
            input.placeholder = $labels.filter
            th.className = 'filter'
            th.innerText = ''
            input.addEventListener('input', (e) => {
                state.setPage(1)
                filters.setColumnFilter(input.dataset.key, e.target.value)
                state.updateRowCount()
            })
            th.append(input)
        })
        this.header.append(thead)   
    }

    setColumns() {
        const columns = []
        Array.from(this.thead.children).forEach(el => {
            columns.push({
                key: el.dataset.key,
                sort: null,
                class: 'no-sorting'
            })
        })
        return columns
    }
}
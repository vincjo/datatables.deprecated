import Thead from './thead.js'
import { data, filters, state, labels } from '../store.js'

export default class Header {

    getColumns() {
        const columns = []
        document.querySelectorAll('.datatable table thead th').forEach(th => {
            columns.push({
                html: th.innerHTML,
                key: th.dataset.key,
                sort: null,
                className: '',
                width: th.getBoundingClientRect().width + 'px'
            })
        })
        return columns       
    }

    removeOriginalThead(columnFilter = false) {
        const elem = document.querySelector('.datatable table thead')
        const originHeight = elem.getBoundingClientRect().height
        if (columnFilter) {
            this.height = originHeight + 25
        } else {
            this.height = originHeight
        }
        elem.parentNode.style.marginTop = '-' + originHeight + 'px'
        elem.style.visibility = 'hidden'
    }

    setHeader() {
        const thead = new Thead(this.thead, this.header)
        thead.createStickyHeader()
        this.columns = this.setColumns()
        if (this.options.columnFilter === true) {
            this.setColumnFilter()
        }
    }

    filter(e) {
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

    redraw() {
        setTimeout(() => {
            const tbody = document.querySelector('.datatable table tbody tr')
            if (tbody === null) {
                return
            }
            const thead = document.querySelectorAll('.datatable header thead tr')
            thead.forEach(tr => {
                let i = 0
                Array.from(tbody.children).forEach(td => {
                    tr.children[i].style.width = td.getBoundingClientRect().width + 'px' 
                    i++
                })
            })

        }, 15)
    }
}